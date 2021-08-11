
import {Router, Request, Response} from "express";
import BusBoy = require("busboy");
import path = require("path");
import os = require("os");
import fs = require("fs");

import {db, storage} from "../firebaseHelpers";
import {firebaseConfig} from "../__secure";


const router: Router = Router();

router.get("/",
  (request, response) => {
    console.log("GET CHARACTERS:: Started");
    db.collection("characters").get()
      .then((data) => {
        const characters: any = [];
        data.forEach((doc) => {
          characters.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("GET CHARACTERS:: Complete");
        return response.json(characters);
      })
      .catch(console.error);
  });

router.post("/",
  (request: Request, response: Response) => {
    console.log("CREATE CHARACTER:: Started");
    const character = {
      ...request.body,
      createdAt: new Date().toISOString(),
      owner: (request as any).user.userId,
    };
    db.collection("characters").add(character)
      .then((char) => {
        console.log("CREATE CHARACTER:: Completed");
        return response
          .status(201)
          .json({message: `Document: ${char.id} created`});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.get("/:id",
  (request, response) => {
    console.log("GET CHARACTER:: Started");
    const characterId = request.params.id;
    db.collection("characters").doc(characterId).get()
      .then((res) => {
        const character = res.data();
        if (character) {
          console.log("GET CHARACTER:: Completed");
          return response.json(character);
        } else {
          return response.status(404).json({message: "character not found"});
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.put("/:id",
  (request, response) => {
    console.log("UPDATE CHARACTER:: Started");
    const characterId = request.params.id;
    const character = {
      ...request.body,
      lastUpdate: new Date().toISOString(),
    };
    db.doc(`/characters/${characterId}`).update(character)
      .then(() => {
        console.log("UPDATE CHARACTER:: Completed");
        return response
          .status(200)
          .json({message: `Document: ${characterId} updated`});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.delete("/:id",
  (request, response) => {
    console.log("DELETE CHARACTER:: Started");
    const characterId = request.params.id;
    db.collection("characters").doc(characterId).delete()
      .then(() => {
        console.log("DELETE CHARACTER:: Completed");
        return response
          .status(200)
          .json({message: `Document: ${characterId} deleted`});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

// Upload character image
router.post("/image/:id", (request, response) => {
  let imgToBeUploaded = {
    filePath: "",
    mimeType: "",
    fileName: "",
  };
  let limitReached = false;
  const characterId = request.params.id;
  const busboy = new BusBoy({
    headers: request.headers,
    limits: {
      // max fileSize in bytes (3MB)
      fileSize: (3 * 1024 * 1024),
    },
  });

  busboy.on("file", (_, file, fileName, __, mimeType) => {
    if (!mimeType.startsWith("image")) {
      response.status(400).json({error: "wrong file type submited"});
    } else {
      const imgExt = fileName.split(".").pop();
      const imgFileName = `${request.params.id}.${imgExt}`;
      const filePath = path.join(os.tmpdir(), imgFileName);
      imgToBeUploaded = {
        filePath,
        mimeType,
        fileName: imgFileName,
      };
      file.pipe(fs.createWriteStream(filePath));

      // If the file is larger than the set limit
      // delete partially uploaded file
      file.on("limit", function() {
        fs.unlink(filePath, function() {
          limitReached = true;
          response.status(455).json({error: "File to big, Limit: 3MB"});
        });
      });
    }
  });

  busboy.on("finish", () => {
    const {
      fileName,
      filePath,
      mimeType,
    } = imgToBeUploaded;
    if (!limitReached) {
      storage.bucket().deleteFiles({prefix: request.params.id, force: true})
        .then(() => {
          storage.bucket().upload(filePath, {
            resumable: false,
            metadata: {
              metadata: {
                contentType: mimeType,
              },
            },
          });
        })
        .then(() => {
          const imgUrl = `https://firebasestorage.googleapis.com/v0/b.${firebaseConfig.storageBucket}/o/${fileName}?alt=media`;
          return db.doc(`/characters/${characterId}`).update({imgUrl});
        })
        .then(() => {
          return response.json({message: "Image uploaded successfully"});
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({error: err.code});
        });
    }
  });
  busboy.end((request as any).rawBody);
});
export default router;
