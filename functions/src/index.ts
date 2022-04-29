import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// const cors = require("cors")({origin: true});
import * as initCors from "cors";

admin.initializeApp();
const firestore = admin.firestore();
const cors = initCors({
  origin: [
    "https://fti.academy",
    /\.fti\.academy$/,
  ],
  methods: ["GET", "POST", "DELETE"],
});

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
      request: functions.https.Request,
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
      request: functions.https.Request,
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

const PlayerHelpers = {
  query: async function(
      user: string,
      course: string,
      player: string
  ) {
    return await firestore
        .collection("users")
        .doc(user)
        .collection("courses")
        .doc(course)
        .collection("players")
        .doc(player);
  },
  exists: async function(
      user: string,
      course: string,
      player: string
  ) {
    const query = await this.query(user, course, player);
    return await Helpers.exists(query);
  },
  getInfo: async function(
      user: string,
      course: string,
      player: string
  ) {
    const query = await this.query(user, course, player);
    return await Helpers.getInfo(query);
  },
  setInfo: async function(
      user: string,
      course: string,
      player: string,
      data: any
  ) {
    const query = await this.query(user, course, player);
    return await Helpers.setInfo(query, data);
  },
  get: async function(
      user: string,
      course: string,
      player: string
  ) {
    return await this.getInfo(user, course, player);
  },
  set: async function(
      user: string,
      course: string,
      player: string,
      data: any
  ) {
    let success = true;
    success = success && (await this.setInfo(user,
        course,
        player,
        data));
    return success;
  },
  delete: async function(
      user: string,
      course: string,
      player: string
  ) {
    const query = await this.query(user, course, player);
    let success = true;
    success = success && (await Helpers.deleteInfo(query));
    return success;
  },
};

const CourseHelpers = {
  query: async function(user: string, course: string) {
    return await firestore
        .collection("users")
        .doc(user)
        .collection("courses")
        .doc(course);
  },
  exists: async function(user: string, course: string) {
    const query = await this.query(user, course);
    return await Helpers.exists(query);
  },
  getInfo: async function(user: string, course: string) {
    const query = await this.query(user, course);
    return await Helpers.getInfo(query);
  },
  setInfo: async function(user: string, course: string, data: any) {
    const query = await this.query(user, course);
    return await Helpers.setInfo(query, data);
  },
  get: async function(user: string, course: string) {
    const query = await this.query(user, course);
    const info = await Helpers.getInfo(query);
    // Custom loop get players
    const players = await query.collection("players");
    const docs = await players.listDocuments();
    const data: Record<string, any> = {
      info: info,
      players: {},
    };
    for (const doc of docs) {
      data.players[doc.id] = await PlayerHelpers.getInfo(user, course, doc.id);
    }
    return data;
  },
  set: async function(user: string, course: string, data: any) {
    const info = data.info;
    let success = true;
    if (info !== null && typeof info !== "undefined") {
      // Set info
      success = success && (await this.setInfo(user, course, info));
    }
    const players: Record<string, any> = data.players;
    if (players !== null && typeof players !== "undefined") {
      // eslint-disable-next-line guard-for-in
      for (const playerId in players) {
        success = success && (await PlayerHelpers.setInfo(
            user,
            course,
            playerId,
            players[playerId]
        ));
      }
    }
    return success;
  },
  delete: async function(
      user: string,
      course: string
  ) {
    const query = await this.query(user, course);
    let success = true;
    success = success && (await Helpers.deleteInfo(query));
    const players = await query.collection("players");
    const docs = await players.listDocuments();
    for (const doc of docs) {
      success = success && (
        await PlayerHelpers.delete(user, course, doc.id)
      );
    }
    return success;
  },
};

const UserHelpers = {
  query: async function(user: string) {
    return await firestore.collection("users").doc(user);
  },
  exists: async function(user: string) {
    const query = await this.query(user);
    return await Helpers.exists(query);
  },
  getInfo: async function(user: string) {
    const query = await this.query(user);
    return await Helpers.getInfo(query);
  },
  setInfo: async function(user: string, data: any) {
    const query = await this.query(user);
    return await Helpers.setInfo(query, data);
  },
  get: async function(user: string) {
    const query = await this.query(user);
    const info = await Helpers.getInfo(query);
    // Custom loop get players
    const courses = await query.collection("courses");
    const docs = await courses.listDocuments();
    const data: Record<string, any> = {
      info: info,
      courses: {},
    };
    for (const doc of docs) {
      data.courses[doc.id] = await CourseHelpers.get(user, doc.id);
    }
    return data;
  },
  set: async function(user: string, data: any) {
    const info = data.info;
    let success = true;
    if (info !== null && typeof info !== "undefined") {
      // Set info
      success = success && (await this.setInfo(user, info));
    }
    const courses = data.courses;
    if (courses !== null && typeof courses !== "undefined") {
      // Set players by looping
      // eslint-disable-next-line guard-for-in
      for (const courseId in courses) {
        success = success && (await CourseHelpers.set(
            user,
            courseId,
            courses[courseId]
        ));
      }
    }
    return success;
  },
  delete: async function(
      user: string
  ) {
    const query = await this.query(user);
    let success = true;
    success = success && (await Helpers.deleteInfo(query));
    const courses = await query.collection("courses");
    const docs = await courses.listDocuments();
    for (const doc of docs) {
      success = success && (
        await CourseHelpers.delete(user, doc.id)
      );
    }
    return success;
  },
};

export const user = functions
    .region("asia-southeast1")
    .https
    .onRequest(async (request, response) => {
      cors(request, response, async () => {
        if (request.method === "GET") {
          const query = Helpers.getQuery(
              request,
              response,
              ["user"]
          );
          if (query === null) {
            response.status(400).send({
              success: false,
              error: "Invalid Parameters.",
            });
            return;
          }
          const exists = await UserHelpers.exists(query.user);
          if (!exists) {
            response.status(404).send({
              success: false,
              error: "Not found.",
            });
            return;
          }
          const data = await UserHelpers.get(query.user);
          response.status(200).send({
            success: true,
            data: data,
          });
          return;
        } else if (request.method === "POST") {
          const body = Helpers.getBody(
              request,
              response,
              ["user"]
          );
          if (body === null) return;
          const success = await UserHelpers.set(
              body.user,
              body.data
          );
          response.status(200).send({success: success});
          return;
        } else if (request.method === "DELETE") {
          const query = Helpers.getQuery(
              request,
              response,
              ["user"]
          );
          if (query === null) {
            response.status(400).send({
              success: false,
              error: "Invalid Parameters.",
            });
            return;
          }
          const exists = await UserHelpers.exists(query.user);
          if (!exists) {
            response.status(404).send({
              success: false,
              error: "Not found.",
            });
            return;
          }
          const success = await UserHelpers.delete(query.user);
          response.status(success?200:500).send({
            success: success,
          });
          return;
        } else {
          response.status(405).send({
            success: false,
            error: "Method not allowed.",
          });
          return;
        }
      });
    });

export const course = functions
    .region("asia-southeast1")
    .https
    .onRequest(async (request, response) => {
      cors(request, response, async () => {
        if (request.method === "GET") {
          const query = Helpers.getQuery(
              request,
              response,
              ["user", "course"]
          );
          if (query === null) {
            response.status(400).send({
              success: false,
              error: "Invalid Parameters.",
            });
            return;
          }
          const exists = await CourseHelpers.exists(
              query.user,
              query.course
          );
          if (!exists) {
            response.status(404).send({
              success: false,
              error: "Not found.",
            });
            return;
          }
          const data = await CourseHelpers.get(
              query.user,
              query.course
          );
          response.status(200).send({success: true, data: data});
          return;
        } else if (request.method === "POST") {
          const body = Helpers.getBody(
              request,
              response,
              ["user", "course"]
          );
          if (body === null) return;
          const success = await CourseHelpers.set(
              body.user,
              body.course,
              body.data
          );
          response.status(200).send({success: success});
          return;
        } else if (request.method === "DELETE") {
          const query = Helpers.getQuery(
              request,
              response,
              ["user", "course"]
          );
          if (query === null) {
            response.status(400).send({
              success: false,
              error: "Invalid Parameters.",
            });
            return;
          }
          const exists = await CourseHelpers.exists(
              query.user,
              query.course
          );
          if (!exists) {
            response.status(404).send({
              success: false,
              error: "Not found.",
            });
            return;
          }
          const success = await CourseHelpers.delete(
              query.user,
              query.course
          );
          response.status(success?200:500).send({success: success});
          return;
        } else {
          response.status(405).send({
            success: false,
            error: "Method not allowed.",
          });
          return;
        }
      });
    });

export const player = functions
    .region("asia-southeast1")
    .https
    .onRequest(async (request, response) => {
      cors(request, response, async () => {
        if (request.method === "GET") {
          const query = Helpers.getQuery(
              request,
              response,
              ["user", "course", "player"]
          );
          if (query === null) {
            response.status(400).send({
              success: false,
              error: "Invalid Parameters.",
            });
            return;
          }
          const exists = await PlayerHelpers.exists(
              query.user,
              query.course,
              query.player
          );
          if (!exists) {
            response.status(404).send({
              success: false,
              error: "Not found.",
            });
            return;
          }
          const data = await PlayerHelpers.get(
              query.user,
              query.course,
              query.player);
          response.status(200).send({
            success: true,
            data: data,
          });
          return;
        } else if (request.method === "POST") {
          const body = Helpers.getBody(
              request,
              response,
              ["user", "course", "player"]
          );
          if (body === null) return;
          const success = await PlayerHelpers.set(
              body.user,
              body.course,
              body.player,
              body.data
          );
          response.status(200).send({success: success});
          return;
        } else if (request.method === "DELETE") {
          const query = Helpers.getQuery(
              request,
              response,
              ["user", "course", "player"]
          );
          if (query === null) {
            response.status(400).send({
              success: false,
              error: "Invalid Parameters.",
            });
            return;
          }
          const exists = await PlayerHelpers.exists(
              query.user,
              query.course,
              query.player
          );
          if (!exists) {
            response.status(404).send({
              success: false,
              error: "Not found.",
            });
            return;
          }
          const success = await PlayerHelpers.delete(
              query.user,
              query.course,
              query.player
          );
          response.status(success?200:500).send({success: success});
          return;
        } else {
          response.status(405).send({
            success: false,
            error: "Method not allowed.",
          });
          return;
        }
      });
    });
