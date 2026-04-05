import Attendance from "../../models/ERP/attendance.js";
import Session from "../../models/PrincipalControlModel/session.js";
import customRes from "../../utils/customRes.js";




const getAttendance = async (req, res) => {
    try {
        const date = req.params.id;
        const userId = req.user.id
        let isclass = req.query.class;
        const currentDate = new Date().toISOString().split("T")[0]
        if (!date) return customRes(res, 400, false, "", "dete is missing", "");
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return customRes(res, 400, false, "", "Invalid date format (YYYY-MM-DD)", "");
        if (date > currentDate) return customRes(res, 400, false, "", "date must be less then or equal to current date", "");
        if (!userId) return customRes(res, 404, false, "", "User id not found", "");
        if (!isclass) return customRes(res, 400, false, "", "class is missing", "");
        isclass = Number(isclass);
        if (isNaN(isclass) || !(isclass >= 1 && isclass <= 12)) return customRes(res, 400, false, "", "Invalid class", "");
        const session = await Session.findOne();
        const currentSession = session.currentSession;
        const attendance = await Attendance.findOne({ class: isclass, date, session: currentSession, });
        if (!attendance) return customRes(res, 404, false, "", "data not found", "");
        const record = attendance?.records.find(
            r => r.studentId.toString() === userId
        );
        return customRes(res, 200, true, "Attendance found Seccessfully", "", {
            date: attendance.date,
            AttendanceStatus: record?.status || "Not marked yet"
        })

    }
    catch (err) {
        console.log("getAttendance says::", err.message);
        return customRes(res, 500, false, "", err.message, "");
    }
}
export default getAttendance