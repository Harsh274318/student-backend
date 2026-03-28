import customRes from "../../utils/customRes.js";
import bcrypt from "bcrypt";
import User from "../../models/newUsers/userSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
const teacherRole = "teacher";
export async function createTeacher(req, res) {
  const { name, email, password, asClass, gender } = req.body;
  try {
    if (!name || !email || !password || !asClass || !gender) {
      return customRes(
        res,
        400,
        false,
        "",
        "somthing is wrong, check all filled",
        "",
      );
    }
    const isUser = await User.findOne({ email });
    if (isUser) {
      return customRes(res, 409, false, "", "user already exist", "");
    }
    const isclass = await Teacher.findOne({ classAssigned: asClass });
    if (isclass) {
      return customRes(
        res,
        400,
        false,
        "",
        "Teacher exist with this Class",
        "",
      );
    }
    const hashed = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND) || 10,
    );
    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: teacherRole,
    });
    await Teacher.create({
      userId: newUser._id,
      name,
      email,
      gender,
      classAssigned: asClass,
    });
    return customRes(res, 201, true, "Teacher created successfully", "", {
      name,
      email,
      gender,
      role: teacherRole,
      classAssigned: asClass,
    });
  } catch (err) {
    console.log(err);
    return customRes(res, 500, false, "", err.message, "");
  }
}
