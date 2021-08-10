import * as functions from "firebase-functions";
import firebase from "firebase";
import * as express from "express";

import character from "./character";
import classRoutes from "./class";
import user from "./user";

import {firebaseConfig} from "./__secure";
import {authMiddleware} from "./middlewares";

firebase.initializeApp(firebaseConfig);
const app = express();

app.use("/character", authMiddleware, character);
app.use("/class", authMiddleware, classRoutes);
app.use("/user", user);

export const api = functions.region("europe-west1").https.onRequest(app);
