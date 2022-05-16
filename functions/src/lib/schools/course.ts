import Helpers from "../helpers";
import Exam from "./exam";
import Player from "./player";

const Course = {
  required: ["school", "course"],
  query: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    return await firestore
        .collection("schools")
        .doc(params.school)
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
    const exams = await query.collection("exams");
    const examDocs = await exams.listDocuments();
    const data: Record<string, any> = {
      info: info,
      exams: {},
      players: {},
    };
    for (const doc of examDocs) {
      const tmpParams = {...params, exam: doc.id};
      data.exams[doc.id] = await Exam.getInfo(
          firestore,
          tmpParams);
    }
    const players = await query.collection("players");
    const playerDocs = await players.listDocuments();
    for (const doc of playerDocs) {
      const tmpParams = {...params, player: doc.id};
      data.players[doc.id] = await Player.getInfo(
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
    const exams: Record<string, any> = data.exams;
    if (exams !== null && typeof exams !== "undefined") {
      // eslint-disable-next-line guard-for-in
      for (const examId in exams) {
        const tmpParams = {...params, exam: examId};
        success = success && (await Exam.setInfo(
            firestore,
            tmpParams,
            exams[examId]
        ));
      }
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
    return success;
  },
  delete: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    const query = await this.query(firestore, params);
    let success = true;
    success = success && (await Helpers.deleteInfo(query));
    const exams = await query.collection("exams");
    const examDocs = await exams.listDocuments();
    for (const doc of examDocs) {
      const tmpParams = {...params, exam: doc.id};
      success = success && (
        await Exam.delete(firestore, tmpParams)
      );
    }
    const players = await query.collection("players");
    const playerDocs = await players.listDocuments();
    for (const doc of playerDocs) {
      const tmpParams = {...params, player: doc.id};
      success = success && (
        await Player.delete(firestore, tmpParams)
      );
    }
    return success;
  },
};

export default Course;
