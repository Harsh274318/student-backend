import customRes from "../../utils/customRes.js"
import Teacher from "../../models/newUsers/teacherSchema.js"
import Attendance from "../../models/ERP/attendance.js"
import Session from "../../models/PrincipalControlModel/session.js"
const attendance = async (req, res) => {
    try {
        const { records } = req.body
        const teacherId = req.user.id;
        if (!records || !teacherId) return customRes(res, 400, false, "", "Something is Wrong", "");
        const date = new Date().toLocaleString("en-CA", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).split("/").join("-")
        const teacher = await Teacher.findOne({ userId: teacherId });
        if (!teacher) return customRes(res, 404, false, "", "Teacher not found", "");
        const isSession = await Session.find();
        if (!isSession) return customRes(res, 404, false, "", "session not found", "")
        if (!isSession.currentSession) return customRes(res, 400, false, "", "check Sessions", "");
        const attendanceMarking = await Attendance.create({
            class: teacher.classAssigned,
            session: isSession.currentSession,
            date,
            records,
        })
        if (!attendanceMarking) return customRes(res, 400, false, "", "attendance not marked", "");
        return customRes(res, 200, true, "Attendance marked successfully", "", attendanceMarking.records)
    }
    catch (err) {
        console.log("attendance says::", err.message);
        return customRes(res, 500, false, "", err.message, "")


    }
}

export default attendance
// done this is for post