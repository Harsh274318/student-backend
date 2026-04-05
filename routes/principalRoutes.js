import express from "express";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import addSession from "../controllers/principalControllers/addSession.js";
import studentById from "../controllers/principalControllers/getStudentById.js";
const principalRoute = express.Router();


principalRoute.patch("/session", authUser, roleCheck("Principal"), addSession);
principalRoute.get("/student/:id", authUser, roleCheck("Principal"), studentById)
export default principalRoute;