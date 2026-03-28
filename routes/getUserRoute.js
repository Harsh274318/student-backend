import e from "express";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { getTeacher } from "../controllers/getuser/getTeacher.js";
import { getstudents } from "../controllers/getuser/getstudents.js";

const getUserRoute = e.Router();
getUserRoute.get("/get-teacher", authUser, roleCheck("principal"), getTeacher);
getUserRoute.get("/get-student", authUser, roleCheck("teacher"), getstudents);
export default getUserRoute;
