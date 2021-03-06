import Helpers from "../helpers";
import Bill from "./bill";
import Course from "./course";

const User = {
  required: ["user"],
  optional: ["school"],
  required_fields: [],
  unique_fields: [],
  query: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>) {
    return await firestore.collection("users").doc(params.user);
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
    await Helpers.checkInfoRequired(data, this.required_fields);
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
      params: Record<string, any>) {
    const query = await this.query(firestore, params);
    const info = await Helpers.getInfo(query);
    // Custom loop get players
    const courses = await query.collection("courses");
    const courseDocs = await courses.listDocuments();
    const data: Record<string, any> = {
      info: info,
      courses: {},
      bills: {},
    };
    for (const doc of courseDocs) {
      const tmpParams = {...params, course: doc.id};
      data.courses[doc.id] = await Course.get(
          firestore,
          tmpParams);
    }
    const bills = await query.collection("bills");
    const billDocs = await bills.listDocuments();
    for (const doc of billDocs) {
      const tmpParams = {...params, bill: doc.id};
      data.bills[doc.id] = await Bill.get(
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
      success = success && (await this.setInfo(
          firestore,
          params,
          info));
    }
    const courses = data.courses;
    if (courses !== null && typeof courses !== "undefined") {
      // Set players by looping
      // eslint-disable-next-line guard-for-in
      for (const courseId in courses) {
        const tmpParams = {...params, course: courseId};
        success = success && (await Course.set(
            firestore,
            tmpParams,
            courses[courseId]
        ));
      }
    }
    const bills = data.bills;
    if (bills !== null && typeof bills !== "undefined") {
      // Set players by looping
      // eslint-disable-next-line guard-for-in
      for (const billId in bills) {
        const tmpParams = {...params, bill: billId};
        success = success && (await Bill.set(
            firestore,
            tmpParams,
            bills[billId]
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
    const courses = await query.collection("courses");
    const courseDocs = await courses.listDocuments();
    for (const doc of courseDocs) {
      const tmpParams = {...params, course: doc.id};
      success = success && (
        await Course.delete(
            firestore,
            tmpParams)
      );
    }
    const bills = await query.collection("bills");
    const billDocs = await bills.listDocuments();
    for (const doc of billDocs) {
      const tmpParams = {...params, bill: doc.id};
      success = success && (
        await Bill.delete(
            firestore,
            tmpParams)
      );
    }
    return success;
  },
};

export default User;
