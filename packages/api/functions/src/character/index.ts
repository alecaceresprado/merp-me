
import {Router, Request, Response} from "express";
import {db} from "../firebaseHelpers";


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

export default router;
