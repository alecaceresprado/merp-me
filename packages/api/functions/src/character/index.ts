
import {Router, Request, Response} from "express";
import * as admin from "firebase-admin";


const router: Router = Router();

router.get("/",
  (request, response) => {
    console.log("authMiddleware:: Started");
    admin.firestore().collection("characters").get()
      .then((data) => {
        const characters: any = [];
        data.forEach((doc) => {
          characters.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return response.json(characters);
      })
      .catch(console.error);
  });


router.post("/",
  (request: Request, response: Response) => {
    const character = {
      ...request.body,
      createdAt: new Date().toISOString(),
      owner: (request as any).user.userId,
    };
    admin.firestore().collection("characters").add(character)
      .then((char) => {
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
    const characterId = request.params.id;
    admin.firestore().collection("characters").doc(characterId).get()
      .then((res) => {
        const character = res.data();
        if (character) {
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
    const characterId = request.params.id;
    const character = {
      ...request.body,
      lastUpdate: new Date().toISOString(),
    };
    admin.firestore().doc(`/characters/${characterId}`).update(character)
      .then(() => {
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
    const characterId = request.params.id;
    admin.firestore().collection("characters").doc(characterId).delete()
      .then(() => {
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
