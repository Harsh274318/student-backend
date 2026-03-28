import e from "express";
import { authUser } from "../middleware/authUser.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { resetPassword } from "../controllers/patch/resetPassword.js";
import { updatePassword } from "../controllers/patch/updatePassword.js";

const patchRoute = e.Router();
patchRoute.patch("/update-password", authUser, updatePassword);
patchRoute.patch("/reset-password", authUser, roleCheck("principal"), resetPassword,);
export default patchRoute;
