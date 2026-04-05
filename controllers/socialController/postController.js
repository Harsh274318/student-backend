import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";
import User from "../../models/newUsers/userSchema.js";


const createPost = async (req, res) => {
    const { name, title, description } = req.body
    const { id, role } = req.user
    const url = req.imageUrl || null
    let { category } = req.body
    try {
        if (!name || !title || !description || !category) return customRes(res, 400, false, "", "Something is missing check all filled", "");
        if (!id || !role) return customRes(res, 400, false, "", "error with token", "")
        if (role == "student") category = "student"

        const isUser = await User.findOne({ _id:id, role })
        if (!isUser) return customRes(res, 404, false, "", "user not found", "");
        const newPost = await Posts.create({
            userId:id, name, title, description, role, category, url
        })
        return customRes(res, 200, true, "Post created successfully", "", newPost)

    }
    catch (err) {
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default createPost