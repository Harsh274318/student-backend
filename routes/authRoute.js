import express from "express"
import { login } from "../controllers/auth/login.js"
import perMinute from "../middleware/perMinute.js";
import perDay from "../middleware/perDay.js";
const authRoute = express.Router();

authRoute.post("/login", perMinute,perDay,login)
export default authRoute