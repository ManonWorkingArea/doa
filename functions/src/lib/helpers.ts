import * as functions from "firebase-functions";

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

function MissingRequiredField(message: string) {
  const error: ErrnoException = new Error(message);
  error.code = "REQUIRED_FIELDS_MISSING";
  return error;
}
MissingRequiredField.prototype = Object.create(Error.prototype);


const Helpers = {
  exists: async function(query: any) {
    const collections = await query.listCollections();
    const snap = await query.get();
    if ((collections.length > 0) || snap.exists) return true;
    return false;
  },
  getInfo: async function(query: any) {
    const snap = await query.get();
    if (!snap.exists) return {};
    else return snap.data();
  },
  checkInfoRequired: async function(
      data: Record<string, any>,
      required: any[]
  ) {
    const infoData = data.info;
    const missingKeys = [];
    for (const key in required) {
      const v = infoData[key];
      if (v === null || typeof v === "undefined") {
        missingKeys.push(key);
      }
    }
    if (missingKeys.length > 0) {
      // eslint-disable-next-line new-cap
      throw MissingRequiredField(`Missing required field: ${missingKeys}.`);
    }
  },
  setInfo: async function(query: any, data: any) {
    try {
      await query.set(data);
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteInfo: async function(query: any) {
    try {
      await query.delete();
      return true;
    } catch (error) {
      return false;
    }
  },
  getQuery: function(
      request: functions.Request,
      response: functions.Response<any>,
      required: string[]
  ) {
    const query: Record<string, string> = {};
    for (const q of required) {
      const v = request.query[q];
      if (v === null || typeof v === "undefined") {
        response.status(400).send({
          success: false,
          error: `Missing ${q} parameter.`,
        });
        return null;
      }
      if (typeof v !== "string") {
        response.status(400).send({
          success: false,
          error: `Invalid ${q} parameters, ${q} should be string.`,
        });
        return null;
      }
      query[q] = v;
    }
    return query;
  },
  getBody: function(
      request: functions.Request,
      response: functions.Response<any>,
      required: string[]
  ) {
    const query: Record<string, string> = {};
    for (const q of required) {
      const v = request.body[q];
      if (v === null || typeof v === "undefined") {
        response.status(400).send({
          success: false,
          error: `Missing ${q} parameter.`,
        });
        return null;
      }
      if (typeof v !== "string") {
        response.status(400).send({
          success: false,
          error: `Invalid ${q} parameters, ${q} should be string.`,
        });
        return null;
      }
      query[q] = v;
    }
    const data = request.body.data;
    if (data === null || typeof data === "undefined") {
      response.status(400).send({
        success: false,
        error: "Missing data.",
      });
      return null;
    }
    query.data = data;
    return query;
  },
};

export default Helpers;
