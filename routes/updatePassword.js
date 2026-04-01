import e from "express";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { resetPassword } from "../controllers/patch/resetPassword.js";
import { updatePassword } from "../controllers/patch/updatePassword.js";
import { multerImagepost } from "../middleware/multerImagepost.js";
import uploadImage from "../middleware/cloudinaryUploads.js";
import updateProfile from "../controllers/patch/updateProfile.js";
const patchRoute = e.Router();
patchRoute.patch("/update-password", authUser, updatePassword);
patchRoute.patch("/reset-password", authUser, roleCheck("Principal"), resetPassword,);
patchRoute.patch("update-profile",authUser,multerImagepost.single("image"),uploadImage,updateProfile)
export default patchRoute;
