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
newUserRouter.post("/create-teacher", uploadOnMulter.single("image"), authUser, otpCkecker, roleCheck("Principal"), cloudinaryUploads, createTeacher,);
newUserRouter.post("/create-student", uploadOnMulter.single("image"), authUser, otpCkecker, roleCheck("Teacher"), cloudinaryUploads, createStudent,);

export default newUserRouter;
