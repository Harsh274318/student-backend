import mongoose from "mongoose";
import Attendance from "../../models/ERP/attendance.js";
import Student from "../../models/newUsers/studentSchema.js";
import Session from "../../models/PrincipalControlModel/session.js";
import customRes from "../../utils/customRes.js";




const getAttendance = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) return customRes(res, 404, false, "", "User id not found", "");
        const userClass = await Student.findOne({ userId })
        if (!userClass) return customRes(res, 404, false, "", "User not found", "");
        let isclass = userClass.class
        if (!isclass) return customRes(res, 400, false, "", "class is missing", "");
        isclass = Number(isclass);
        if (isNaN(isclass) || !(isclass >= 1 && isclass <= 12)) return customRes(res, 400, false, "", "Invalid class", "");
        const session = await Session.findOne();
        const currentSession = session.currentSession;
        const attendance = await Attendance.find({ class: isclass, session: currentSession, }, {
            date: 1,
            session: 1,
            records: {  $elemMatch: { 
                        studentId: new mongoose.Types.ObjectId(userClass._id) 
                    }  }
        });
        if (attendance.length === 0 || !attendance) return customRes(res, 404, false, "", "data not found", "");
        return customRes(res, 200, true, "Attendance found Seccessfully", "", attendance)

    }
    catch (err) {
        console.log("getAttendance says::", err.message);
        return customRes(res, 500, false, "", err.message, "");
    }
}
export default getAttendance