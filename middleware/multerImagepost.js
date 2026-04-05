import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const multerImagepost = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 3 }, // 3MB
    fileFilter: (req, file, cb) => {

        // role check
        if (!(req.user.role === "Teacher" || req.user.role === "Principal")) {
            return cb(new Error("Only Teacher or Principal can upload"), false);
        }

        // file type check
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed"), false);
        }

        cb(null, true);
    }
});





