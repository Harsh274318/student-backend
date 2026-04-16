import User from "../../models/newUsers/userSchema.js";
import Student from "../../models/newUsers/studentSchema.js";
import customRes from "../../utils/customRes.js";
import bcrypt from "bcrypt";
import Teacher from "../../models/newUsers/teacherSchema.js";
import Session from "../../models/PrincipalControlModel/session.js";
const roleStudent = "Student";
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dob,
      gender,
      fatherName,
      parentMobile,
      notifyMethod,
      address,

    } = req.body;
    let { rollNumber } = req.body;
    const { url, public_id } = req.imageInfo;
   
    const teacherId = req.user.id;

    if (
      !name ||
      !email ||
      !password ||
      !dob ||
      !rollNumber ||
      !gender ||
      !fatherName ||
      !parentMobile ||
      !notifyMethod ||
      !address ||
      !url
    ) {
      console.log("error")
      return customRes(
        res,
        400,
        false,
        "",
        "Something is missing, check all filled ",
      );
    }
    if (parentMobile.length !== 10) {
      return customRes(res, 400, false, "", "Invalid mobile number", "");
    }
    rollNumber = Number(rollNumber);
    if (isNaN(rollNumber)) {
      return customRes(res, 400, false, "", "Invalid roll number", "");
    }
    const isUser = await User.findOne({ email });
    if (isUser) {
      return customRes(res, 409, false, "", "User already exists", "");
    }
    const teacher = await Teacher.findOne({ userId: teacherId })
    if (!teacher) {
      return customRes(res, 404, false, "", "Teacher not found", "");
    }
    const thisSession = await Session.findOne()
    if (!thisSession) return customRes(res, 404, false, "", "session not found", "");

    const isEnroll = await Student.findOne({
      rollNumber,
      class: teacher.classAssigned,
      session: thisSession.currentSession,
    });
    if (isEnroll) {
      return customRes(
        res,
        409,
        false,
        "",
        "Roll number already exists in this class",
        "",
      );
    }
    const hashed = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND) || 10,
    );
    const newUser = await User.create({
      email,
      name,
      password: hashed,
      role: roleStudent,
      url,
      public_id,
    });

    const newStudent = await Student.create({
      userId: newUser._id,
      class: teacher.classAssigned,
      dob,
      rollNumber: Number(teacher.classAssigned) * 100 + Number(rollNumber),
      gender,
      fatherName,
      parentMobile,
      notifyMethod,
      address,
      session: thisSession.currentSession,
    });
    if (!newStudent) return customRes(res, 400, false, "", "user not created", "");

    return customRes(
      res,
      201,
      true,
      "User create successfully as student",
      "",
      {
        name,
        email,
        parentMobile,
        notifyMethod,
        gender,
        role: roleStudent,
        url,
        session: thisSession.currentSession,
      },
    );
  } catch (err) {
    console.log(err.message);
    return customRes(res, 500, false, "", err.message, "err here");
  }
};
// done!
