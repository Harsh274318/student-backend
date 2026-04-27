import express from "express";
import { authUser } from "../middleware/authUser.js";
import postSuggestion from "../controllers/aiControllers/postSuggetion.js";

const aiRoute = express.Router()
aiRoute.post("/suggest",authUser,postSuggestion)
export default aiRoute