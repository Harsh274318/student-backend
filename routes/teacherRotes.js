import express from "express"
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import promotStudent from "../controllers/createUsers/promotStudent.js";
import classHomeWork from "../controllers/otherPostControllers/classHomework.js";
import attendance from "../controllers/otherPostControllers/attendance.js";
import uptadeStudent from "../controllers/patch/updateStudent.js";
const teacherRoute = express.Router();
teacherRoute.post("/promot", authUser, roleCheck("Teacher"), promotStudent);
teacherRoute.post("/homework", authUser, roleCheck("Teacher"), classHomeWork);
teacherRoute.post("/attendance", authUser, roleCheck("Teacher"), attendance);
teacherRoute.patch("/update-student", authUser, roleCheck("Teacher"), uptadeStudent)
export default teacherRoute;