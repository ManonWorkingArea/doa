import User from "./user";
import Course from "./course";
import Player from "./player";

const routes: { [index: string]: any } = {
  "": User,
  "/course": Course,
  "/course/player": Player,
};

export default routes;
