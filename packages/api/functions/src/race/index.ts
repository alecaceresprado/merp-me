
import {Router, Request, Response} from "express";
import {db} from "../firebaseHelpers";


const router: Router = Router();

router.get("/",
  (request, response) => {
    console.log("GET RACES:: Started");
    db.collection("races").get()
      .then((data) => {
        const races: any = [];
        data.forEach((doc) => {
          races.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("GET RACES:: Complete");
        return response.json(races);
      })
      .catch(console.error);
  });


router.post("/",
  (request: Request, response: Response) => {
    let racesArr = [];
    const raceIds: string[] = [];
    if (Array.isArray(request.body)) {
      racesArr = request.body.map((raceObj) => (
        {
          ...raceObj,
          createdAt: new Date().toISOString(),
          createdBy: (request as any).user.userId,
        }
      ));
    } else {
      racesArr.push(
        {
          ...request.body,
          createdAt: new Date().toISOString(),
          createdBy: (request as any).user.userId,
        }
      );
    }
    console.log("CREATE RACE:: Started");
    const batch = db.batch();
    racesArr.forEach((raceObj) => {
      const docRef = db.collection("races").doc();
      raceIds.push(docRef.id);
      batch.set(docRef, raceObj);
    });
    batch.commit()
      .then(() => {
        console.log("CREATE RACE:: Completed");
        return response
          .status(201)
          .json({message: "Document/s created", docRefs: raceIds});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.get("/:id",
  (request, response) => {
    console.log("GET RACE:: Started");
    const raceId = request.params.id;
    db.collection("races").doc(raceId).get()
      .then((res) => {
        const raceObj = res.data();
        if (raceObj) {
          console.log("GET RACE:: Completed");
          return response.json(raceObj);
        } else {
          return response.status(404).json({message: "Race not found"});
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.put("/:id",
  (request, response) => {
    console.log("UPDATE RACE:: Started");
    const raceId = request.params.id;
    const raceObj = {
      ...request.body,
      lastUpdate: new Date().toISOString(),
    };
    db.doc(`/races/${raceId}`).update(raceObj)
      .then(() => {
        console.log("UPDATE RACE:: Completed");
        return response
          .status(200)
          .json({message: `Document: ${raceId} updated`});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.delete("/:id",
  (request, response) => {
    console.log("DELETE RACE:: Started");
    const raceId = request.params.id;
    db.collection("races").doc(raceId).delete()
      .then(() => {
        console.log("DELETE RACE:: Completed");
        return response
          .status(200)
          .json({message: `Document: ${raceId} deleted`});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

export default router;
