import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";



const deleteComment = async (req, res) => {
    try {
        // getting user details from authUser middlewere
        const { email, id } = req.user;
        // getting post and comment details from query
        const { postId, commentId } = req.query;
        // confirming each value properly attached
        if (!email || !id) return customRes(res, 400, false, "", "something is wrong try again after login", "");
        if (!postId || !commentId) return customRes(res, 400, false, "", "Something is wrong with post or comment", "");
        // finding valid post in db
        const isPost = await Posts.findById(postId);
        // is post or not  
        if (!isPost) return customRes(res, 404, false, "", "Post not found", "");
        // finding valid comment in post
        const lengthbefore = isPost.comments.length
        isPost.comments = isPost.comments.filter(com => !(com._id.toString() === commentId && com.userId.toString() === id)
        );
        await isPost.save()
        const lengthAfter = isPost.comments.length
        if (lengthbefore === lengthAfter) return customRes(res, 400, false, "", "Comment not deleted", "");
        return customRes(res, 200, true, "post deleted", "", isPost.comments)
    }
    catch (err) {
        console.log("delete post says::", err.message);
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default deleteComment