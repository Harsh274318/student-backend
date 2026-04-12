import e from "express";
import { authUser } from "../../middleware/authUser.js";
import createPost from "../../controllers/socialController/postController.js";
import { multerImagepost } from "../../middleware/multerImagepost.js";
import cloudinaryUploads from "../../middleware/cloudinaryUploads.js";
import likes from "../../controllers/socialController/likeController.js";
import comments from "../../controllers/socialController/commentController.js";
import deleteComment from "../../controllers/socialController/deletComment.js";
import deletePost from "../../controllers/socialController/deletetPost.js";
import allPost from "../../controllers/socialController/allPost.js";
const postRoute = e.Router();

postRoute.post("/student-post", authUser, createPost);
postRoute.post("/school-post", multerImagepost.single("image"), authUser, cloudinaryUploads, createPost);
postRoute.get("/posts", authUser, allPost)
postRoute.post("/post/:postId/comment", authUser, comments)
postRoute.patch("/post/:postId/like", authUser, likes);
postRoute.delete("/post/:postId/:commentId/comment", authUser, deleteComment);
postRoute.delete("/post/:postId", authUser, deletePost);
export default postRoute
