
import brevoConfig from "../../config/brevoConfig.js"
import Attendance from "../../models/ERP/attendance.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import Session from "../../models/PrincipalControlModel/session.js";
import customRes from "../../utils/customRes.js";
const absentEmailTemplate = (name, email) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Absence Notification</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f7ff;font-family:'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="460" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(99,102,241,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#ef4444,#dc2626);padding:32px 20px;">
              <p style="margin:0;font-size:32px;">📌</p>
              <h2 style="margin:10px 0 4px;color:#fff;font-size:20px;font-weight:700;">Absence Alert</h2>
              <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;">Apna School · Attendance Notice</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 20px;text-align:center;">
              <p style="margin:0 0 16px;font-size:14px;color:#6b7280;">
                Dear <strong style="color:#111827;">${name}</strong>,
              </p>

              <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">
                We noticed that you were <strong style="color:#dc2626;">absent</strong> from your recent class session.
                Regular attendance is important for your learning progress.
              </p>

              <!-- Info Box -->
              <div style="background:#fef2f2;border:2px dashed #fca5a5;border-radius:10px;padding:20px;display:inline-block;width:100%;box-sizing:border-box;max-width:320px;margin:0 auto;">
                <p style="margin:0 0 6px;font-size:12px;color:#b91c1c;">Student Name</p>
                <p style="margin:0 0 12px;font-size:16px;font-weight:600;color:#111827;">${name}</p>

                <p style="margin:0 0 6px;font-size:12px;color:#b91c1c;">Registered Email</p>
                <p style="margin:0;font-size:14px;color:#374151;">${email}</p>
              </div>

              <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">
                If this was a mistake or you had a valid reason, please inform your instructor.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 20px 28px;border-top:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">© 2026 Apna School · Stay Consistent 📚</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;


const absentNotify = async (req, res) => {
  try {
    const teacherId = req.user.id
    if (!teacherId) return customRes(res, 400, false, "", "id not found", "");
    const date = new Date().toLocaleString("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).split("/").join("-")
    const session = await Session.findOne()
    if (!session) return customRes(res, 404, false, "", "session not found", "");
    const isTeacher = await Teacher.findOne({ userId: teacherId });
    if (!isTeacher) return customRes(res, 404, false, "", "Teacher not found", "");

    const attendance = await Attendance.findOne({ date, session: session.currentSession, class: isTeacher.classAssigned }).populate("records.studentId", "email name")
    if (!attendance) return customRes(res, 404, false, "", "attendance not found", "");

    const absentStudent = attendance.records.filter(item => item.status == "absent").map(item => ({
      name: item.studentId.name,
      email: item.studentId.email
    }));
    if (absentStudent.length == 0) return customRes(res, 404, false, "", "Absent Students not found", "")
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    for (const { name, email } of absentStudent) {
      await brevoConfig.sendTransacEmail({
        sender: { email: process.env.SERVICE_GMAIL },
        to: [{ email }],
        subject: "Attendance Alert: You Were Absent",
        htmlContent: absentEmailTemplate(name, email)
      });
      await delay(500);
    }
    return customRes(res, 200, true, "email sended!", "", absentStudent)
  }

  catch (err) {
    console.log("absentNotify says::", err.message);
    return customRes(res, 500, false, "", err.message, "");
  }
}
export default absentNotify