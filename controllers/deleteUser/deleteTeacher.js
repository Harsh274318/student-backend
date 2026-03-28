import User from "../../models/newUsers/userSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import customRes from "../../utils/customRes.js";

export async function deleteTeacher(req, res) {
  const { email } = req.body;
  try {
    if (!email) {
      return customRes(res, 400, false, "", "Email is missing!", "");
    }

    const deletedTeacher = await Teacher.findOneAndDelete({ email });
    if (!deletedTeacher) {
      return customRes(res, 400, false, "", "Teacher not found", "");
    }
    const deletedUser = await User.findOneAndDelete({ _id:deletedTeacher.userId });
    if (!deletedUser) {
      return customRes(res, 400, false, "", "User not found", "");
    }
    return customRes(res, 200, true, "Teacher Deleted successfully", "", {
      name: deletedUser.name,
      email: deletedUser.email,
    });
  } catch (err) {
    return customRes(res, 500, false, "", err.message, "");
  }
}
