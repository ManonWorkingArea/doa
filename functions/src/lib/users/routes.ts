import User from "./user";
import Course from "./course";
import Player from "./player";
import Score from "./score";

const routes: { [index: string]: any } = {
  "": User,
  "/course": Course,
  "/course/player": Player,
  "/course/score": Score,
};

export default routes;
