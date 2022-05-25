import * as functions from "firebase-functions";
import Helpers from "./helpers";

async function runGet(
    req: functions.Request,
    res: functions.Response<any>,
    firestore: FirebaseFirestore.Firestore,
    obj: any
) {
  const query = Helpers.getQuery(
      req,
      res,
      obj.required || [],
      obj.optional || []
  );
  if (query === null) {
    res.status(400).send({
      success: false,
      error: "Invalid Parameters.",
    });
    return;
  }
  const exists = await obj.exists(firestore, query);
  if (!exists) {
    res.status(400).send({
      success: false,
      error: "Not found.",
    });
    return;
  }
  const data = await obj.get(firestore, query);
  res.status(200).send({
    success: true,
    data: data,
  });
  return;
}

async function runPost(
    req: functions.Request,
    res: functions.Response<any>,
    firestore: FirebaseFirestore.Firestore,
    obj: any
) {
  const body = Helpers.getBody(
      req,
      res,
      obj.required || [],
      obj.optional || []
  );
  if (body === null) {
    res.status(400).send({
      success: false,
      error: "Invalid or Missing Parameters.",
    });
    return;
  }
  const success = await obj.set(
      firestore,
      body,
      body.data
  );
  res.status(200).send({success: success});
  return;
}

async function runPut(
    req: functions.Request,
    res: functions.Response<any>,
    firestore: FirebaseFirestore.Firestore,
    obj: any
) {
  const body = Helpers.getBody(
      req,
      res,
      obj.required || [],
      obj.optional || []
  );
  if (body === null) {
    res.status(400).send({
      success: false,
      error: "Invalid or Missing Parameters.",
    });
    return;
  }
  const success = await obj.updateInfo(
      firestore,
      body,
      body.data
  );
  res.status(200).send({success: success});
  return;
}

async function runDelete(
    req: functions.Request,
    res: functions.Response<any>,
    firestore: FirebaseFirestore.Firestore,
    obj: any
) {
  const query = Helpers.getQuery(
      req,
      res,
      obj.required || [],
      obj.optional || []
  );
  if (query === null) {
    res.status(400).send({
      success: false,
      error: "Invalid Parameters.",
    });
    return;
  }
  const exists = await obj.exists(firestore, query);
  if (!exists) {
    res.status(404).send({
      success: false,
      error: "Not found.",
    });
    return;
  }
  const success = await obj.delete(firestore, query);
  res.status(success?200:500).send({
    success: success,
  });
  return;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function runOptions(
    req: functions.Request,
    res: functions.Response<any>,
    firestore: FirebaseFirestore.Firestore,
    obj: any
) {
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  res.status(204).send("");
}

export default async function(
    req: functions.Request,
    res: functions.Response<any>,
    firestore: FirebaseFirestore.Firestore,
    obj: Record<string, any>
) {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "GET") {
    return await runGet(req, res, firestore, obj);
  } else if (req.method === "POST") {
    return await runPost(req, res, firestore, obj);
  } else if (req.method === "PUT") {
    return await runPut(req, res, firestore, obj);
  } else if (req.method === "DELETE") {
    return await runDelete(req, res, firestore, obj);
  } else if (req.method === "OPTIONS") {
    return await runOptions(req, res, firestore, obj);
  } else {
    res.status(405).send({
      success: false,
      error: "Method not allowed.",
    });
    return;
  }
}
