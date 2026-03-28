import express from "express";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { deleteTeacher } from "../controllers/deleteUser/deleteTeacher.js";
import { deleteStudent } from "../controllers/deleteUser/deleteStudent.js";

const deleteRoute = express.Router();
deleteRoute.delete("/delete-teacher", authUser, roleCheck("principal"), deleteTeacher,);
deleteRoute.delete("/deleteStudent", authUser, roleCheck("teacher"), deleteStudent,);
export default deleteRoute;
