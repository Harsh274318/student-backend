import customRes from "../../utils/customRes.js";
import bcrypt from "bcrypt";
import User from "../../models/newUsers/userSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
const teacherRole = "Teacher";
export async function createTeacher(req, res) {
  const { name, email, password, gender } = req.body;
  let { asClass } = req.body;
  const { url, public_id } = req.imageInfo;
  try {
    if (!name || !email || !password || !asClass || !gender || !url) {
      return customRes(
        res,
        400,
        false,
        "",
        "something is wrong, check all filled",
        "",
      );
    }
    asClass = Number(asClass);
    if (isNaN(asClass)) return customRes(res, 400, false, "", "Class must be a number", "");
    if (asClass < 1 || asClass > 12) return customRes(res, 400, false, "", "Class must between 1 and 12", "")
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
      url,
      public_id,
    });
    await Teacher.create({
      userId: newUser._id,
      gender,
      classAssigned: asClass,
    });
    return customRes(res, 201, true, "Teacher created successfully", "", {
      name,
      email,
      gender,
      role: teacherRole,
      classAssigned: asClass,
      url,
    });
  } catch (err) {
    console.log(err);
    return customRes(res, 500, false, "", err.message, "");
  }
}
