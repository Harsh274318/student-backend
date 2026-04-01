import User from "../../models/newUsers/userSchema.js";
import Student from "../../models/newUsers/studentSchema.js";
import customRes from "../../utils/customRes.js";
import bcrypt from "bcrypt";
import Teacher from "../../models/newUsers/teacherSchema.js";
const roleStudent = "student";
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dob,
      rollNumber,
      gender,
      fatherName,
      parentMobile,
      notifyMethod,
      address,
    } = req.body;
    const { url, public_id } = req.imageInfo;
    // console.log(name)
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
      return customRes(
        res,
        400,
        false,
        "",
        "Something is missing, check all filled ",
      );
    }
    const isUser = await User.findOne({ email });
    if (isUser) {
      return customRes(res, 409, false, "", "User already exists", "");
    }
    const teacherClass = await Teacher.findOne({ userId: teacherId }).select(
      "classAssigned",
    );
    if (!teacherClass) {
      return customRes(res, 404, false, "", "Teacher class not found", "");
    }
    const isroll = await Student.findOne({
      rollNumber,
      class: teacherClass.classAssigned,
    });
    if (isroll) {
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
      class: teacherClass.classAssigned,
      dob,
      rollNumber,
      gender,
      fatherName,
      parentMobile,
      notifyMethod,
      address,
    });
    return customRes(
      res,
      201,
      true,
      "User create successfully as student",
      "",
      {
        id: newStudent.userId,
        name,
        email,
        parentMobile,
        notifyMethod,
        gender,
        role: roleStudent,
        url,
      },
    );
  } catch (err) {
    console.log(err.message);
    return customRes(res, 500, false, "", err.message, "err here");
  }
};
// done!
