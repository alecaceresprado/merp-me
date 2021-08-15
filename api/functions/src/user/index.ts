
import {Router} from "express";
import firebase from "firebase";

import {db} from "../firebaseHelpers";
import {authMiddleware} from "../middlewares";
import {loginDetails, signupDetails, userDBObject} from "./types";
import {validateLoginData, validateSignupData} from "./validations";

const router: Router = Router();

// Get user details
router.get("/", authMiddleware, (request, response) => {
  const userId = (request as any).user.userId;
  console.log("GET USER:: Started");
  db.doc(`/users/${userId}`).get()
    .then((res) => {
      const user = res.data();
      if (user) {
        console.log("GET USER:: Completed");
        return response.json(user);
      } else {
        return response.status(404).json({message: "user not found"});
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({error: "Something went wrong"});
    });
});

// Signup new user
router.post("/", (request, response) => {
  console.log("CREATE USER:: Started");
  const newUser: signupDetails = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    userName: request.body.userName,
  };
  let createdUser: firebase.User | null;
  let user: userDBObject;

  const {valid, errors} = validateSignupData(newUser);

  if (!valid) return response.status(400).json(errors);

  return firebase.auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      createdUser = data.user;
      user = {
        userName: request.body.userName,
        email: request.body.email,
        userId: createdUser?.uid || "",
        createdAt: new Date().toISOString(),
      };

      return db
        .doc(`/users/${createdUser?.uid}`)
        .set(user);
    })
    .then(() => {
      return createdUser?.getIdToken();
    })
    .then((token) => {
      console.log("CREATE USER:: Completed");
      return response
        .status(201)
        .json({user, token});
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return response
          .status(400)
          .json({email: `Email ${newUser.email} already in use`});
      } else {
        return response.status(500).json({error: err.code});
      }
    });
});

// Login user
router.post("/login", (request, response) => {
  console.log("LOGIN USER:: Started");
  let userId: string | undefined;
  let token: string | undefined;
  const user: loginDetails = {
    email: request.body.email,
    password: request.body.password,
  };

  const {valid, errors} = validateLoginData(user);

  if (!valid) return response.status(400).json(errors);

  return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      userId = data.user?.uid;
      return data.user?.getIdToken();
    })
    .then((userToken) => {
      token = userToken;
      return db.doc(`/users/${userId}`).get();
    })
    .then((userResponse) => {
      const user = userResponse.data();
      console.log("LOGIN USER:: Completed");
      return response.status(200).json({token, user});
    })
    .catch((err) => {
      console.error(err);
      let message = {};
      switch (err.code) {
      case "auth/wrong-password":
        message = {password: "Wrong password!"};
        break;
      case "auth/user-not-found":
        message = {email: "This email is not registered"};
        break;
      default:
        message = {general: "Something went wrong, please retry"};
      }
      return response
        .status(403)
        .json(message);
    });
});


export default router;
