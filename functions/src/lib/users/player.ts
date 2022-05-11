import Helpers from "../helpers";


const Player = {
  required: ["user", "course", "player"],
  query: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    return await firestore
        .collection("users")
        .doc(params.user)
        .collection("courses")
        .doc(params.course)
        .collection("players")
        .doc(params.player);
  },
  exists: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    const query = await this.query(firestore, params);
    return await Helpers.exists(query);
  },
  getInfo: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    const query = await this.query(firestore, params);
    return await Helpers.getInfo(query);
  },
  setInfo: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>,
      data: any
  ) {
    const query = await this.query(firestore, params);
    return await Helpers.setInfo(query, data);
  },
  get: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    return await this.getInfo(firestore, params);
  },
  set: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>,
      data: any
  ) {
    let success = true;
    success = success && (await this.setInfo(
        firestore,
        params,
        data));
    return success;
  },
  delete: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    const query = await this.query(firestore, params);
    let success = true;
    success = success && (await Helpers.deleteInfo(query));
    return success;
  },
  updateTime: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>,
      deltaTime: number
  ) {
    const query = await this.query(firestore, params);
    const snap = await query.get();
    if (!snap.exists) {
      return {
        success: false,
        error: "Not found.",
      };
    }// Not found data to update
    const data = snap.data();
    if (data === null || typeof data === "undefined") {
      return {
        success: false,
        error: "Not found.",
      };
    }
    const play: number = data.play;
    let timer: number = data.timer;
    timer = timer - deltaTime;
    if(timer < 0)timer = 0;

    try {
      await query.update({
        play: play + deltaTime,
        timer: timer,
      });
      return {
        success: true,
        finish: (timer <= 0),
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  },
};

export default Player;
