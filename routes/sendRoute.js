import express from "express"
import { authUser } from "../middleware/authUser.js"
import { roleCheck } from "../middleware/roleCheck.js"
import otpSender from "../controllers/otp/otpSender.js"
import absentNotify from "../controllers/otherPostControllers/absentNotify.js"
const sendRoute = express.Router()
sendRoute.post("/send-otp", authUser, otpSender)
sendRoute.post("/absent-students", authUser, roleCheck("Teacher"), absentNotify);
export default sendRoute;

