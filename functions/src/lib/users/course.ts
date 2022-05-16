import Helpers from "../helpers";
import Player from "./player";
import Score from "./score";

const Course = {
  required: ["user", "course"],
  query: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    return await firestore
        .collection("users")
        .doc(params.user)
        .collection("courses")
        .doc(params.course);
  },
  exists: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>) {
    const query = await this.query(firestore, params);
    return await Helpers.exists(query);
  },
  getInfo: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>) {
    const query = await this.query(firestore, params);
    return await Helpers.getInfo(query);
  },
  setInfo: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>,
      data: any) {
    const query = await this.query(firestore, params);
    return await Helpers.setInfo(query, data);
  },
  get: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>) {
    const query = await this.query(firestore, params);
    const info = await Helpers.getInfo(query);
    // Custom loop get players
    const players = await query.collection("players");
    const playerDocs = await players.listDocuments();
    const data: Record<string, any> = {
      info: info,
      players: {},
      scores: {},
    };
    for (const doc of playerDocs) {
      const tmpParams = {...params, player: doc.id};
      data.players[doc.id] = await Player.getInfo(
          firestore,
          tmpParams);
    }
    const scores = await query.collection("scores");
    const scoreDocs = await scores.listDocuments();
    for (const doc of scoreDocs) {
      const tmpParams = {...params, score: doc.id};
      data.scores[doc.id] = await Score.getInfo(
          firestore,
          tmpParams);
    }
    return data;
  },
  set: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>,
      data: any) {
    const info = data.info;
    let success = true;
    if (info !== null && typeof info !== "undefined") {
      // Set info
      success = success && (await this.setInfo(firestore, params, info));
    }
    const players: Record<string, any> = data.players;
    if (players !== null && typeof players !== "undefined") {
      // eslint-disable-next-line guard-for-in
      for (const playerId in players) {
        const tmpParams = {...params, player: playerId};
        success = success && (await Player.setInfo(
            firestore,
            tmpParams,
            players[playerId]
        ));
      }
    }
    const scores: Record<string, any> = data.scores;
    if (scores !== null && typeof scores !== "undefined") {
      // eslint-disable-next-line guard-for-in
      for (const scoreId in scores) {
        const tmpParams = {...params, score: scoreId};
        success = success && (await Score.setInfo(
            firestore,
            tmpParams,
            scores[scoreId]
        ));
      }
    }
    return success;
  },
  delete: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    const query = await this.query(firestore, params);
    let success = true;
    success = success && (await Helpers.deleteInfo(query));
    const players = await query.collection("players");
    const docs = await players.listDocuments();
    for (const doc of docs) {
      const tmpParams = {...params, player: doc.id};
      success = success && (
        await Player.delete(firestore, tmpParams)
      );
    }
    return success;
  },
  isAllPlayerFinish: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    const query = await this.query(firestore, params);
    const players = await query.collection("players");
    const docs = await players.listDocuments();
    for (const doc of docs) {
      const tmpParams = {...params, player: doc.id};
      const pData = await Player.getInfo(
          firestore,
          tmpParams);
      if (pData.status != "finish") {
        return false;
      }
    }
    return true;
  },
  isPretest: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    // Check pretest in score collection exists


    const info = await this.getInfo(firestore, params);
    if (
      info.score == null ||
      typeof info.score == "undefined"
    ) {
      return false;
    }
    if (
      info.score.pretest == null ||
      typeof info.score.pretest == "undefined"
    ) {
      return false;
    }
    if (
      info.score.pretest.result == null ||
      typeof info.score.pretest.result == "undefined" ||
      info.score.pretest.result == ""
    ) {
      return false;
    }
    return true;
  },
};

export default Course;
