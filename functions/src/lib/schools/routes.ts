import School from "./school";
import Course from "./course";
import Exam from "./exam";
import Player from "./player";

const routes: { [index: string]: any } = {
  "": School,
  "/course": Course,
  "/course/exam": Exam,
  "/course/player": Player,
};

export default routes;
