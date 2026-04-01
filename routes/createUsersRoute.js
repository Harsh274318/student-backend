import express from "express";
import { principal } from "../controllers/createUsers/principalController.js";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { createTeacher } from "../controllers/createUsers/createTeacher.js";
import { createStudent } from "../controllers/createUsers/createStudent.js";
import cloudinaryUploads from "../middleware/cloudinaryUploads.js";
import { uploadOnMulter } from "../middleware/uploadOnMulter.js";
import otpCkecker from "../controllers/otp/otpCkecker.js";



const newUserRouter = express.Router();
newUserRouter.post("/create-principal", uploadOnMulter.single("image"), cloudinaryUploads, principal);
newUserRouter.post("/create-teacher", authUser, otpCkecker, roleCheck("Principal"), uploadOnMulter.single("image"), cloudinaryUploads, createTeacher,);

newUserRouter.post("/create-student", authUser, otpCkecker, roleCheck("Teacher"), uploadOnMulter.single("image"), cloudinaryUploads, createStudent,);

export default newUserRouter;
