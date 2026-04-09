import cloudinary from "../config/cloudinary.js";
import customRes from "../utils/customRes.js";
import User from "../models/newUsers/userSchema.js";
import fs from "fs"
const cloudinaryUploads = async function (req, res, next) {
    // console.log(req.file.path)
    try {

        const { email } = req.body
        console.log(email)
        if (!email) return customRes(res, 400, false, "", "info missing", "");
        const isUser = await User.findOne({ email });
        if (isUser && isUser.public_id) { await cloudinary.uploader.destroy(isUser.public_id) }

        if (!req.file || !req.file.path) return customRes(res, 400, false, "", "not found Image", "")
        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
        fs.unlinkSync(req.file.path);
        req.imageInfo = {
            url: result.secure_url,
            public_id: result.public_id
        };
        console.log("everything is okk in cloud")
        next();


    }
    catch (err) {
        if (req.file?.path) {
            fs.unlinkSync(req.file.path);
        }
        console.log("err in cloudinaryUploads", err.message)
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default cloudinaryUploads