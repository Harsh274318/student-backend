import User from "../../models/newUsers/userSchema.js";
import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";


const likes = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        if (!postId) return customRes(res, 400, false, "", "Something is missing", "");
        const post = await Posts.findById(postId);
        if (!post) return customRes(res, 400, false, "", "Post not found", "");
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() != userId)
        } else {
            post.likes.push(userId)
        }
        await post.save();
        return customRes(res, 200, true, "like updated", "", post.likes)
    }
    catch (err) {
        return customRes(res, 500, false, "", err.message, "");

    }
}
export default likes