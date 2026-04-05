import e from "express";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { getTeacher } from "../controllers/getuser/getTeacher.js";
import { getstudents } from "../controllers/getuser/getstudents.js";
import getHomework from "../controllers/otherGetControllers/gethomework.js";
import getAttendance from "../controllers/otherGetControllers/getAttendance.js"
const getUserRoute = e.Router();
getUserRoute.get("/teachers", authUser, roleCheck("Principal"), getTeacher);
getUserRoute.get("/students", authUser, roleCheck("Teacher"), getstudents);
getUserRoute.get("/homework",authUser,getHomework);
getUserRoute.get("/attendance/:id",authUser,getAttendance);
export default getUserRoute;
