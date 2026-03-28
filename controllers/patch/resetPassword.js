import User from "../../models/newUsers/userSchema.js";
import customRes from "../../utils/customRes.js";
import bcrypt from "bcrypt";
export async function resetPassword(req, res) {
    const { email, role, newPassword } = req.body;
    try {
        if (!email || !role || !newPassword) {
            return customRes(
                res,
                400,
                false,
                "",
                "something is missing, Check all filled",
                "",
            );
        }
        if (newPassword.length < 8) {
            return customRes(res, 400, false, "", "Password is too week");
        }

        const isUser = await User.findOne({ email, role });
        if (!isUser) {
            return customRes(res, 404, false, "", "User not found", "");
        }
        const hashed = await bcrypt.hash(
            newPassword,
            Number(process.env.SALT_ROUND) || 10,
        );
        const upadeted = await User.updateOne(
            { email, role },
            { password: hashed },
        );
        if (upadeted.modifiedCount === 0) {
            return customRes(res, 400, false, "", "Password not Updated", "");
        }
        return customRes(res, 200, true, "Password rest successfully", "", {
            email,
            role,
            name: isUser.name,
            userId: isUser._id,
        });
    } catch (err) {
        console.log(err)
        return customRes(res, 500, false, "", err.message, "");
    }
}
