import express from "express"
import { authUser } from "../middleware/authUser.js"
import otpSender from "../controllers/otp/otpSender.js"
const sendRoute = express.Router()
sendRoute.post("/send-otp", authUser, otpSender)
export default sendRoute;

