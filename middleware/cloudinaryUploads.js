import cloudinary from "../config/cloudinary.js";
import customRes from "../utils/customRes.js";
import fs from "fs"
const uploadImage = async function (req, res, next) {
    // console.log(req.file.path)
    try {
        if (!req.file || !req.file.path) return customRes(res, 404, false, "", "not found Image", "")
        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
        fs.unlinkSync(req.file.path);
        req.imageUrl = result.secure_url;
        next();


    }
    catch (err) {
        if (req.file?.path) {
            fs.unlinkSync(req.file.path);
        } customRes(res, 500, false, "", err.message, "")
        console.log("err in cloudinaryUploads", err.message)
    }
}
export default uploadImage