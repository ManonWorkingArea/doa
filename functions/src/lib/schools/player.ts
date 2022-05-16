import Helpers from "../helpers";


const Player = {
  required: ["school", "course", "player"],
  query: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    return await firestore
        .collection("schools")
        .doc(params.school)
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
};

export default Player;
