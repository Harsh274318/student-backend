import OTP from "../../models/otp.js";
import customRes from "../../utils/customRes.js";
import bcrypt from "bcrypt";


const otpCkecker = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email, !otp) return customRes(res, 400, false, "", "something missing", "");
        const user = await OTP.findOne({ email })
        if (!user) return customRes(res, 404, false, "", "otp not found with this email", "");
        const verifyOtp = await bcrypt.compare(otp, user.otp);
        if (!verifyOtp) return customRes(res, 401, false, "", "OTP mismatch try again", "");
        await OTP.deleteOne({ email })
        next()

    }
    catch (err) {
        console.log("otpChecker err::", err.message)
        return customRes(res, 500, false, "", err.message, "")
    }

}
export default otpCkecker 