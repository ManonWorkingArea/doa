import Helpers from "../helpers";


const Agenda = {
  required: ["school", "course", "agenda"],
  optional: [],
  query: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    return await firestore
        .collection("schools")
        .doc(params.school)
        .collection("courses")
        .doc(params.course)
        .collection("agendas")
        .doc(params.agenda);
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
  checkTime: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>,
  ) {
    const data = await this.getInfo(firestore, params);
    const date: number | null = Number(params.date);
    if (date === null || typeof date === "undefined") {
      return false;
    }
    const startDate = Number(data.start);
    if (
      (data.start != null && typeof data.start != "undefined") &&
      startDate > date
    ) return false;
    const endDate = Number(data.end);
    if (
      (data.end != null && typeof data.end != "undefined") &&
        endDate < date
    ) return false;
    return true;
  },
};

export default Agenda;
