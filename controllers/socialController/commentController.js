import customRes from "../../utils/customRes.js";
import Posts from "../../models/post/postSchema.js";
import User from "../../models/newUsers/userSchema.js";


const comments = async (req, res) => {
    try {
        // getting post id
        const { postId } = req.params;
        // getting email and name of user
        const { email, name } = req.user;
        // getting message for comment
        const { message } = req.body;
        // checking user send details 
        if (!postId) return customRes(res, 400, false, "", "Something is missing......", "");
        // checking message should not empty
        if (!message || message.trim() === "") return customRes(res, 400, false, "", "Message is empty", "");
        // finding post 
        const post = await Posts.findById(postId);
        // checking is post or not
        if (!post) return customRes(res, 404, false, "", "Post not found!", "");
        // finding user for url
        const isUser = await User.findOne({ email, name });
        // checking is user or not
        if (!isUser) return customRes(res, 404, false, "", "User not found!", "");
        // if everything is okk 
        post.comments.push({
            message,
            user: name,
            userId: isUser._id.toString(),
            url: isUser.url
        })
        // saveing comment in post
        await post.save();
        // sendin details to user
        return customRes(res, 200, true, "Comment added successfully", "", post.comments)
    }
    catch (err) {
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default comments