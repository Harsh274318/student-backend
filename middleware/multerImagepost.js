import multer from "multer";
import path from "path"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
});
export const multerImagepost = multer({
    storage, limits: { fileSize: 1024 * 1024 * 3 }, fileFilter: (req, res, cb) => {
        if (req.user.role == "Teacher" || req.user.role == "Principal") {
            cb(null, true);
        } else {
            cb(null, false)
        }
    }
})


