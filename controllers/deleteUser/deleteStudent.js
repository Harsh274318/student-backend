import Student from "../../models/newUsers/studentSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import User from "../../models/newUsers/userSchema.js";
import customRes from "../../utils/customRes.js";
export async function deleteStudent(req, res) {
  const { email } = req.body;
  const { id } = req.user;
  try {
    if (!email) {
      return customRes(res, 400, false, "", "Email is missing!", "");
    }
    const teacherInfo = await Teacher.findOne({ userId: id });
    if (!teacherInfo) {
      return customRes(res, 404, false, "", "Teacher not found", "");
    }

    const deletedStudent = await Student.findOneAndDelete({
      email,
      class: teacherInfo.classAssigned,
    });
    if (!deletedStudent) {
      return customRes(res, 400, false, "", "Student not found", "");
    }
    const deletedUser = await User.findOneAndDelete({
      _id: deletedStudent.userId,
    });
    if (!deletedUser) {
      return customRes(res, 400, false, "", "User not found", "");
    }
    return customRes(res, 200, true, "Student Deleted successfully", "", {
      name: deletedUser.name,
      email: deletedUser.email,
    });
  } catch (err) {
    return customRes(res, 500, false, "", err.message, "");
  }
}
