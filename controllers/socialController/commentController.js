import customRes from "../../utils/customRes.js";
import Posts from "../../models/post/postSchema.js";
import User from "../../models/newUsers/userSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import Student from "../../models/newUsers/studentSchema.js";

const comments = async (req, res) => {
    try {
        const { postId } = req.params;
        const { email, name } = req.user;
        const { message } = req.body;
        if (!postId || !message) return customRes(res, 400, false, "", "Something is missing......", "");
        const post = await Posts.findById(postId);
        if (!post) return customRes(res, 404, false, "", "Post not found!", "")
        const user = await User.findOne({ email });
        if (!user) return customRes(res, 404, false, "", "User not found!", "");
        post.comments.push({
            message,
            user: name,
            url: user.url
        })
        await post.save();
        return customRes(res, 200, true, "Comment added successfully", "", post.comments)
    }
    catch (err) {
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default comments