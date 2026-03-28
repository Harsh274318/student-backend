import User from "../../models/newUsers/userSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import customRes from "../../utils/customRes.js";
import Student from "../../models/newUsers/studentSchema.js";
export async function getTeacher(req, res) {
  try {
    const teachers = await Teacher.find();
    // .populate("userId", "email");
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
