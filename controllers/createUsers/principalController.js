import bcrypt from "bcrypt";
import User from "../../models/newUsers/userSchema.js";
import customRes from "../../utils/customRes.js";
const role = "principal";
export async function principal(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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
      return customRes(
        res,
        400,
        false,
        "",
        "user exist with this email",
        "no data",
      );
    }
    if (email !== process.env.PRINCIPAL) {
      return customRes(res, 400, false, "", "invlid email", "");
    }

    const isPrincipal = await User.findOne({ role: "principal" });
    if (isPrincipal) {
      return customRes(res, 400, false, "", "principal already exist!");
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND) || 10,
    );
    await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    return customRes(res, 201, true, "User created successfully!", "", {
      name,
      email,
      role,
    });
  } catch (err) {
    return customRes(res, 500, false, "", err.message, "");
  }
}
// done !
// export default register;
