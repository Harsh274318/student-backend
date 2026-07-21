import customRes from "../../utils/customRes.js";
import User from "../../models/newUsers/userSchema.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import DeviceBinding from "../../models/ERP/DeviceBinding.js";
import Student from "../../models/newUsers/studentSchema.js";
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return customRes(
        res,
        400,
        false,
        "",
        "something is wrong, check all filled",
        "",
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return customRes(
        res,
        404,
        false,
        "",
        "Something is wrong check email or password",
        "",
      );
    }
    if (user.role === "Student") {
      const student = await Student.findOne({ userId: user._id })
      if (!student || !student.isActive) {
        return customRes(res, 403, false, "", "Access denied.", "");
      }
    }
    if (user.isActive !== true) {
      return customRes(res, 403, false, "", "access deny", "");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return customRes(
        res,
        401,
        false,
        "",
        "Something is wrong check email or password",
        "",
      );
    }
    const isBinded = user.role === "Teacher"
      ? await DeviceBinding.findOne({ teacherId: user._id })
      : null;
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,

    };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "100d",
    });
    const returnPayload = {
      id: user._id,
      email,
      role: user.role,
      name: user.name,
      token,
      url: user.url,
      public_id: user.public_id,
    }
    if (user.role === "Teacher") {
      returnPayload.binded = isBinded?.isDeviceBind ?? false;
    }
    return customRes(res, 200, true, "login successfully!", "", returnPayload);
  } catch (err) {
    console.log(err.message);
    return customRes(res, 500, false, "", err.message, "");
  }
}
