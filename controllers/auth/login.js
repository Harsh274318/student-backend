import customRes from "../../utils/customRes.js";
import User from "../../models/newUsers/userSchema.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
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
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return customRes(res, 200, true, "login successfully!", "", {
      id: user._id,
      email,
      role: user.role,
      name: user.name,
      token,
      url: user.url,
      public_id: user.public_id
    });
  } catch (err) {
    console.log(err.message);
    return customRes(res, 500, false, "", err.message, "");
  }
}
