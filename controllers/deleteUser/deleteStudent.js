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
      return customRes(res, 404, false, "", "Teacher not found.", "");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return customRes(res, 404, false, "", "User not found.", "");
    }

    const student = await Student.findOne({
      userId: user._id,
      class: teacherInfo.classAssigned,
    });

    if (!student) {
      return customRes(res, 404, false, "", "Student not found.", "");
    }

    // Deactivate student
    student.isActive = false;
    await student.save();

    // Deactivate user
    user.isActive = false;
    await user.save();

    return customRes(
      res,
      200,
      true,
      {
        name: user.name,
        email: user.email,
      },
      "Student deactivated successfully.",
      ""
    );
  } catch (err) {
    console.log(`deleteStudent says:: ${err.message}`);
    return customRes(res, 500, false, "", err.message, "");
  }
}