import express from "express";
import gStudent from "../controllers/google/gstudent.js";
import gTeacher from "../controllers/google/gTeacher.js";
const googleRoute = express.Router()
googleRoute.post("/student-query", gStudent)
googleRoute.post("/teacher-query", gTeacher)
export default googleRoute