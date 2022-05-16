import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// const cors = require("cors")({origin: true});
import * as initCors from "cors";
import * as express from "express";
import Helpers from "./lib/helpers";
import request from "./lib/request";
import userRoutes from "./lib/users/routes";
import schoolRoutes from "./lib/schools/routes";
import Player from "./lib/users/player";
import Course from "./lib/users/course";

admin.initializeApp();
const firestore = admin.firestore();

const cors = initCors({
  origin: true,
  optionsSuccessStatus: 204,
  preflightContinue: false,
});
// const cors = initCors({
//   origin: [
//     "https://fti.academy",
//     /\.fti\.academy$/,
//   ],
//   methods: ["GET", "POST", "DELETE"],
// });
const app = express();

app.use(cors);
app.options("*", cors);


const routes: Record<string, {[index:string]: any}> = {
  "/user": userRoutes,
  "/school": schoolRoutes,
};
// Loop create all routes
Object.entries(routes).forEach(([rootPath, subRoutes]) => {
  Object.entries(subRoutes).forEach(([path, obj]) => {
    app.all(`${rootPath}${path}`, async (req, res) => {
      return await request(req, res, firestore, obj);
    });
  });
});

app.get("/user/course/checkPretestStatus", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const query = Helpers.getQuery(
      req,
      res,
      Course.required
  );
  if (query === null) {
    res.status(400).send({
      success: false,
      error: "Invalid or Missing Parameters.",
    });
    return;
  }
  const exists = await Course.exists(firestore, query);
  if (!exists) {
    res.status(404).send({
      success: false,
      error: "Not found.",
    });
    return;
  }
  const ret = await Course.isPretest(
      firestore,
      query
  );
  res.status(200).send({success: true, pretest: ret});
});

app.get("/user/course/checkPlayerStatus", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const query = Helpers.getQuery(
      req,
      res,
      Course.required
  );
  if (query === null) {
    res.status(400).send({
      success: false,
      error: "Invalid or Missing Parameters.",
    });
    return;
  }
  const exists = await Course.exists(firestore, query);
  if (!exists) {
    res.status(404).send({
      success: false,
      error: "Not found.",
    });
    return;
  }
  const ret = await Course.isAllPlayerFinish(
      firestore,
      query
  );
  res.status(200).send({success: true, finish: ret});
});

app.post("/user/course/player/updateTime", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = Helpers.getBody(
      req,
      res,
      Player.required
  );
  if (body === null) {
    res.status(400).send({
      success: false,
      error: "Invalid or Missing Parameters.",
    });
    return;
  }
  const exists = await Player.exists(firestore, body);
  if (!exists) {
    res.status(404).send({
      success: false,
      error: "Not found.",
    });
    return;
  }
  const ret: Record<string, any> = await Player.updateTime(
      firestore,
      body,
      Number(body.data)
  );
  res.status(ret.success?200:500).send(ret);
});

exports.api = functions.region("asia-southeast1")
    .https.onRequest(app);
