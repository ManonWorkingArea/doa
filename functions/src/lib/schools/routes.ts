import School from "./school";
import Course from "./course";
import Exam from "./exam";

const routes: { [index: string]: any } = {
  "": School,
  "/course": Course,
  "/course/exam": Exam,
};

export default routes;
