import Helpers from "../helpers";

const Bill = {
  required: ["user", "bill"],
  query: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    return await firestore
        .collection("users")
        .doc(params.user)
        .collection("bills")
        .doc(params.bill);
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
  updateInfo: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>,
      data: any
  ) {
    const query = await this.query(firestore, params);
    return await Helpers.updateInfo(query, data);
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

export default Bill;
