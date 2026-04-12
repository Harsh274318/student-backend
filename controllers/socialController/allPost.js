import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";




async function allPost(req, res) {
    const allPost = await Posts.find();
    if (allPost.lenght === 0) return customRes(res, 400, false, "", "no post found", "");
    return customRes(res, 200, true, "all post", "", allPost)

}
export default allPost