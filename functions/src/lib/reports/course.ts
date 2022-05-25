import UCourse from "../users/course";

const Course = {
  getProgress: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    // Get users
    const users = await firestore.collection("users");
    const userDocs = await users.listDocuments();
    const counter: Record<number, number> = {};
    for (const doc of userDocs) {
      const tmpParams = {...params, user: doc.id};
      const count: number = await UCourse.getProgress(
          firestore,
          tmpParams
      );
      counter[count] = counter[count]?counter[count]+1:1;
    }
    return counter;
  },
  getScore: async function(
      firestore: FirebaseFirestore.Firestore,
      params: Record<string, any>
  ) {
    let minScore = params.minScore || -1;
    minScore = Number(minScore);
    let maxScore = params.maxScore || 999;
    maxScore = Number(maxScore);
    const users = await firestore.collection("users");
    const userDocs = await users.listDocuments();
    let counter = 0;
    for (const doc of userDocs) {
      const tmpParams = {...params, user: doc.id};
      const score = await Course.getScore(firestore, tmpParams);
      if (score >= minScore && score <= maxScore) {
        counter = counter + 1;
      }
    }
    return counter;
  },
};

export default Course;
