import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const id = req.user.id;
        if (!postId || !id) return customRes(res, 400, false, "", "Something is Wrong", "");
        const removePost = await Posts.findOneAndDelete({ _id: postId, userId: id });
        if (!removePost)
            return customRes(res, 404, false, "", "Post not found", "");
        return customRes(res, 200, true, "Post deleted successfully", "", removePost.title);
    } catch (err) {
        console.log("deletePost says::", err.message);
        return customRes(res, 500, false, "", err.message, "");
    }
};
export default deletePost