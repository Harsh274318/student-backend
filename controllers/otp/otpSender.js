import SibApiV3Sdk from "sib-api-v3-sdk"
import brevoConfig from "../../config/brevoConfig.js"
import customRes from "../../utils/customRes.js";
import OTP from "../../models/otp.js"
import bcrypt from "bcrypt"
const htmlContent = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Verification</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f7ff;font-family:'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="460" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(99,102,241,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 20px;">
              <p style="margin:0;font-size:32px;">🎓</p>
              <h2 style="margin:10px 0 4px;color:#fff;font-size:20px;font-weight:700;">Verify Your Account</h2>
              <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;">LearnHub · Email Verification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 20px;text-align:center;">
              <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">
                Use the OTP below to verify your account. It expires in <strong style="color:#4f46e5;">10 minutes</strong>.
              </p>

              <!-- OTP -->
              <div style="background:#eef2ff;border:2px dashed #a5b4fc;border-radius:10px;padding:24px 20px;display:inline-block;width:100%;box-sizing:border-box;max-width:300px;margin:0 auto;">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;color:#7c3aed;text-transform:uppercase;">Your OTP</p>
                <p style="margin:0;font-size:38px;font-weight:700;letter-spacing:14px;color:#4f46e5;font-family:'Courier New',monospace;text-indent:14px;">${otp}</p>
              </div>

              <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">
                Didn't request this? Ignore this email — your account is safe. 🔒
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 20px 28px;border-top:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">© 2026 Apna School · Happy Learning 📚</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;


const otpSender = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return customRes(res, 400, false, "", "Enter email", "")
    // Prevent otp requset for 10 min
    const exist = await OTP.findOne({ email })
    if (exist) return customRes(res, 400, false, "", "wait for 10 min", "")
    // createing 6 Digits otp
    const otp = parseInt(100000 + Math.random() * 900000)
    const subject = "Verify OTP"



    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    sendSmtpEmail.sender = { email: process.env.SERVICE_GMAIL }
    sendSmtpEmail.to = [{ email }]
    sendSmtpEmail.subject = subject
    sendSmtpEmail.htmlContent = htmlContent(otp)
    const hashOtp = await bcrypt.hash(String(otp), Number(process.env.SALT_ROUND) || 10,)
    await OTP.create({ email, otp: hashOtp })
    await brevoConfig.sendTransacEmail(sendSmtpEmail);
    return customRes(res, 200, true, "OTP sended successfully on your email", "", { email })
  }
  catch (err) {
    return customRes(res, 500, false, "", ["otp sender err", err.message], "")
  }
}
export default otpSender
