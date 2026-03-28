import express from "express";
import { principal } from "../controllers/createUsers/principalController.js";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { createTeacher } from "../controllers/createUsers/createTeacher.js";
import { createStudent } from "../controllers/createUsers/createStudent.js";
const newUserRouter = express.Router();
newUserRouter.post("/create-principal", principal);
newUserRouter.post("/create-teacher", authUser, roleCheck("principal"), createTeacher,);
newUserRouter.post("/create-student", authUser, roleCheck("teacher"), createStudent,);

export default newUserRouter;
