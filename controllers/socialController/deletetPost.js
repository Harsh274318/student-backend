import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { id, role } = req.user;
        if (!postId || !id) return customRes(res, 400, false, "", "Something is Wrong", "");
        let removePost = null;
        if (role === "Principal") {
            removePost = await Posts.findOneAndDelete({ _id: postId });

        } else {
            removePost = await Posts.findOneAndDelete({ _id: postId, userId: id });
        }

        if (!removePost) return customRes(res, 404, false, "", "Post not found", "");
        const restPost = await Posts.find()
        return customRes(res, 200, true, "Post deleted successfully", "", restPost);
    } catch (err) {
        console.log("deletePost says::", err.message);
        return customRes(res, 500, false, "", err.message, "");
    }
};
export default deletePost