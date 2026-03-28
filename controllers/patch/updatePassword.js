import bcrypt from "bcrypt";
import User from "../../models/newUsers/userSchema.js";
import customRes from "../../utils/customRes.js";

export async function updatePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  const { email, role } = req.user;
  try {
    if (!oldPassword || !newPassword) {
      return customRes(res, 422, false, "", "Required data missing", "");
    }
    if (oldPassword === newPassword) {
      return customRes(
        res,
        400,
        false,
        "",
        "New password cannot be same as old password",
        "",
      );
    }
    if (newPassword.length < 8) {
      return customRes(
        res,
        400,
        false,
        "",
        "Password must be at least 8 characters",
        "",
      );
    }
    const isUser = await User.findOne({ email, role });
    if (!isUser) {
      return customRes(res, 404, false, "", "user not found", "");
    }
    const userPassword = isUser.password;
    if (!userPassword) {
      return customRes(res, 400, false, "", "password not found", "");
    }
    const isCorrect = await bcrypt.compare(oldPassword, userPassword);
    if (!isCorrect) {
      return customRes(res, 400, false, "", "Incorrect password", "");
    }
    const hashed = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUND) || 10,
    );
    const updated = await User.updateOne({ email, role }, { password: hashed });
    if (updated.modifiedCount === 0) {
      return customRes(res, 400, false, "", "Password update failed", "");
    }
    return customRes(res, 200, true, "Password changed successfully", "", {
      email: isUser.email,
    });
  } catch (err) {
    return customRes(res, 500, false, "", err.message, "");
  }
}
