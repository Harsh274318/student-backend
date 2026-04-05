import Student from "../../models/newUsers/studentSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import Session from "../../models/PrincipalControlModel/session.js";
import customRes from "../../utils/customRes.js";
// import User from "../../models/newUsers/userSchema.js";

export async function getstudents(req, res) {
  try {
    const teacherClass = await Teacher.findOne({
      userId: req.user.id,
    });
    if (!teacherClass) return customRes(res, 404, false, "", "Teacher not Found", "")
    const classAccess = teacherClass.classAssigned;
    const session = await Session.findOne()
    if (!session) return customRes(res, 404, "", "Session not Found", "");
    const students = await Student.find({ class: classAccess, session: session.currentSession }).populate("userId", "email name url");
    if (students.length === 0) {
      return customRes(res, 404, false, "", "No user found!", "");
    }

    return customRes(
      res,
      200,
      true,
      `Here is your all students of class ${classAccess}`,
      "",
      students,
    );
  } catch (err) {
    return customRes(res, 500, false, "", err.message, "");
  }
}
