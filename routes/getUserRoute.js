import e from "express";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { getTeacher } from "../controllers/getuser/getTeacher.js";
import { getstudents } from "../controllers/getuser/getstudents.js";

const getUserRoute = e.Router();
getUserRoute.get("/get-teacher", authUser, roleCheck("Principal"), getTeacher);
getUserRoute.get("/get-student", authUser, roleCheck("Teacher"), getstudents);
export default getUserRoute;
