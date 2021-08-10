import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import firebase from "firebase";
import * as express from "express";

import character from "./character";
import user from "./user";

import {firebaseConfig} from "./__secure";

admin.initializeApp();
firebase.initializeApp(firebaseConfig);
const app = express();

app.use("/character", character);
app.use("/user", user);

export const api = functions.region("europe-west1").https.onRequest(app);
