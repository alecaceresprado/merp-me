
import {Router, Request, Response} from "express";
import {db} from "../firebaseHelpers";


const router: Router = Router();

router.get("/",
  (request, response) => {
    console.log("GET CLASSES:: Started");
    db.collection("classes").get()
      .then((data) => {
        const classes: any = [];
        data.forEach((doc) => {
          classes.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("GET CLASSES:: Complete");
        return response.json(classes);
      })
      .catch(console.error);
  });


router.post("/",
  (request: Request, response: Response) => {
    let classArr = [];
    const classIds: string[] = [];
    if (Array.isArray(request.body)) {
      classArr = request.body.map((classObj) => (
        {
          ...classObj,
          createdAt: new Date().toISOString(),
          createdBy: (request as any).user.userId,
        }
      ));
    } else {
      classArr.push(
        {
          ...request.body,
          createdAt: new Date().toISOString(),
          createdBy: (request as any).user.userId,
        }
      );
    }
    console.log("CREATE CLASS:: Started");
    const batch = db.batch();
    classArr.forEach((classObj) => {
      const docRef = db.collection("classes").doc();
      classIds.push(docRef.id);
      batch.set(docRef, classObj);
    });
    batch.commit()
      .then(() => {
        console.log("CREATE CLASS:: Completed");
        return response
          .status(201)
          .json({message: "Document/s created", docRefs: classIds});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.get("/:id",
  (request, response) => {
    console.log("GET CLASS:: Started");
    const classId = request.params.id;
    db.collection("classes").doc(classId).get()
      .then((res) => {
        const classObj = res.data();
        if (classObj) {
          console.log("GET CLASS:: Completed");
          return response.json(classObj);
        } else {
          return response.status(404).json({message: "class not found"});
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.put("/:id",
  (request, response) => {
    console.log("UPDATE CLASS:: Started");
    const classId = request.params.id;
    const classObj = {
      ...request.body,
      lastUpdate: new Date().toISOString(),
    };
    db.doc(`/classes/${classId}`).update(classObj)
      .then(() => {
        console.log("UPDATE CLASS:: Completed");
        return response
          .status(200)
          .json({message: `Document: ${classId} updated`});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

router.delete("/:id",
  (request, response) => {
    console.log("DELETE CLASS:: Started");
    const classId = request.params.id;
    db.collection("classes").doc(classId).delete()
      .then(() => {
        console.log("DELETE CLASS:: Completed");
        return response
          .status(200)
          .json({message: `Document: ${classId} deleted`});
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json({error: "Something went wrong"});
      });
  });

export default router;
