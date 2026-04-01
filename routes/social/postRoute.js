import e from "express";
import { authUser } from "../../middleware/authUser.js";
import createPost from "../../controllers/social/postController.js";

const postRoute = e.Router();

postRoute.post("post",authUser,createPost)