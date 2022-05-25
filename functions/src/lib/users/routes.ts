import User from "./user";
import Course from "./course";
import Player from "./player";
import Score from "./score";
import Bill from "./bill";

const routes: { [index: string]: any } = {
  "": User,
  "/course": Course,
  "/course/player": Player,
  "/course/score": Score,
  "/bill": Bill,
};

export default routes;
