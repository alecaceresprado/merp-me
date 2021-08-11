import * as functions from "firebase-functions";
import firebase from "firebase";
import * as express from "express";

import characterRoutes from "./character";
import classRoutes from "./class";
import raceRoutes from "./race";
import userRoutes from "./user";

import {firebaseConfig} from "./__secure";
import {authMiddleware} from "./middlewares";

firebase.initializeApp(firebaseConfig);
const app = express();

app.use("/character", authMiddleware, characterRoutes);
app.use("/class", authMiddleware, classRoutes);
app.use("/race", authMiddleware, raceRoutes);
app.use("/user", userRoutes);

export const api = functions.region("europe-west1").https.onRequest(app);
