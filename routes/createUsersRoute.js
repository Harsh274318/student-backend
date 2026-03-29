import express from "express";
import { principal } from "../controllers/createUsers/principalController.js";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { createTeacher } from "../controllers/createUsers/createTeacher.js";
import { createStudent } from "../controllers/createUsers/createStudent.js";
import { upload } from "../middleware/upload.js";
import uploadImage from "../middleware/cloudinaryUploads.js";
const newUserRouter = express.Router();
newUserRouter.post("/create-principal", upload.single("image"), uploadImage, principal);
newUserRouter.post("/create-teacher", authUser, roleCheck("principal"), upload.single("image"), uploadImage, createTeacher,);
newUserRouter.post("/create-student", authUser, roleCheck("teacher"), upload.single("image"), uploadImage, createStudent,);

export default newUserRouter;
