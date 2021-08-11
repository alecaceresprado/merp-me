import {Request, Response} from "express";
import {auth, db} from "../firebaseHelpers";

export const authMiddleware =
  (req: Request, res: Response, next: () => void) => {
    let idToken: string;
    let userId: string;
    const authHeader = req.headers.authorization;
    console.log("authMiddleware:: Started");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      idToken = authHeader.split("Bearer ")[1];
      auth.verifyIdToken(idToken)
        .then((decodedToken) => {
          userId = decodedToken.uid;
          return db.doc(`/users/${userId}`).get();
        })
        .then((user) => {
          console.log("authMiddleware:: Finished");
          (req as any).user = user.data();
          return next();
        }).catch((err) => {
          console.error(err);
          return res.status(403).json(err);
        });
    } else {
      console.error("No auth token found");
      res.status(403).json({error: "Unauthorised"});
    }
  };
