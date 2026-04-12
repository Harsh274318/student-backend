import User from "../../models/newUsers/userSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import customRes from "../../utils/customRes.js";
export async function getTeacher(req, res) {
  try {
    const userId = req.user.id
    if (!userId) return customRes(res, 400, false, "", "user not found", "");
    const isPrincipal = await User.findOne({ _id: userId, role: "Principal" });
    if (!isPrincipal) return customRes(res, 404, false, "", "Principal not found", "");
    const teachers = await Teacher.find().populate("userId", "name email url public_id");
    if (teachers.length === 0) {
      return customRes(res, 404, false, "", "User not found", "");
    }
    return customRes(
      res,
      200,
      true,
      "All teacher of your School",
      "",
      teachers,
    );
  } catch (err) {
    return customRes(res, 500, false, "", err.message, "");
  }
}
export default getTeacher;
