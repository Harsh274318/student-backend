import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";
import User from "../../models/newUsers/userSchema.js";


const createPost = async (req, res) => {
    const { name, title, description, userUrl } = req.body
    const { id, role } = req.user
    const url = req?.imageInfo?.url || null
    let { category } = req.body
    try {
        if (!name || !title || !description || !category) return customRes(res, 400, false, "", "Something is missing check all filled", "");
        if (!id || !role) return customRes(res, 400, false, "", "error with token", "")
        if (role == "student") category = "student"

        const isUser = await User.findOne({ _id: id, role })
        if (!isUser) return customRes(res, 404, false, "", "user not found", "");
        const newPost = await Posts.create({
            userId: id, name, title, description, role, category, imageurl: url, userUrl
        })
        const restPost = await Posts.find()
        if (restPost.length === 0) return customRes(res, 404, false, "", "Post not found", "");
        return customRes(res, 200, true, "Post created successfully", "", restPost)

    }
    catch (err) {
        console.log(err.message)
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default createPost