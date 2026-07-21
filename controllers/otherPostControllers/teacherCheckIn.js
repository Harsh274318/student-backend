import checkRadius from "../../utils/checkRadius.js";
import SchoolConfig from "../../models/ERP/schoolConfig.js";
import customRes from "../../utils/customRes.js";
import toMinutes from "../../utils/toMinutes.js";
import TeacherAttendance from "../../models/ERP/teacherAttendance.js";
import MonthCalendar from "../../models/ERP/MonthCalendar.js";
import Teacher from "../../models/newUsers/teacherSchema.js";

const teacherCheckIn = async (req, res) => {
    const teacherId = req.user.id;

    let { rLat, rLng } = req.body;
    try {
        // taking time for check IN 
        if (rLat == null || rLng == null) {
            return customRes(res, 400, false, "", "Something is Wrong!", "");
        }
        const lat = Number(rLat);
        const lng = Number(rLng);

        if (Number.isNaN(lat) || Number.isNaN(lng)) {
            return customRes(res, 400, false, "", "something is wrong", "")
        }
        if (lat <= 0 || lng <= 0) {
            return customRes(res, 400, false, "", "Numbers are Zero", "")
        }
        const checkInTime = new Date().toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        // taking date for checking is Working Day or not 
        const currentDate = new Date().toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata"
        })
        // taking date month and year seprate
        const [year, month, date] = currentDate.toString().split("-").map(e => Number(e))
        // finding data in calender for toDay's date
        const calendar = await MonthCalendar.findOne({ year, month, "days.dateOfDay": date })
        if (!calendar) {
            return customRes(res, 400, false, "", "calendar not found", "");
        }
        // taking date 
        const day = calendar.days.find(d => d.dateOfDay === date)
        if (!day) {
            return customRes(res, 400, false, "", "date not found in calender !", "");
        }
        if (day.type !== "working" || !day.isWorking) {
            return customRes(res, 400, false, "", `Today is ${day.type} can't checkIN`, "");
        }
        const isTeacher = await Teacher.findOne({ userId: teacherId })
        if (!isTeacher) {
            return customRes(res, 404, false, "", "User not found !", "");
        }

        const schoolConfigs = await SchoolConfig.findOne({ principalId: isTeacher.principalId });
        if (!schoolConfigs) {
            return customRes(res, 404, false, "", "school not found!", "");
        }
        const radius = checkRadius(lat, lng, schoolConfigs.location.lat, schoolConfigs.location.lng);
        if (radius > schoolConfigs.attendanceRadius) {
            const extraDistance = Math.round(radius - schoolConfigs.attendanceRadius);
            return customRes(res, 400, false, "", `Move ${extraDistance}m closer to check in.`, "");
        }
        const attMarked = await TeacherAttendance.findOne({ teacherId, date: currentDate });
        if (attMarked) {
            return customRes(res, 400, false, "", `attendance already ${attMarked.status} marked today!`, "");
        }

        const enterTime = toMinutes(checkInTime);
        const schoolTime = toMinutes(schoolConfigs.schoolOpenTime);
        const diff = (enterTime - schoolTime);
        let status = "present"
        if (diff > schoolConfigs.openGrace) {
            status = "late"
        }
        if (diff >= 90) {
            status = "half"
        }
        const markAttendance = await TeacherAttendance.create({
            teacherId,
            date: currentDate,
            checkIn: checkInTime,
            status,
            isWorkingDay: true
        })
        if (!markAttendance) {
            return customRes(res, 400, false, "", "Something went wrong while marking attendance.", "")
        }
        return customRes(res, 200, true, "congratulation Attendace marked", "", {
            checkIn: checkInTime,
            status,
        })


    }
    catch (err) {
        console.log(`teacherDailyAttendance says => ${err.message}`);
        return customRes(res, 500, false, "", err.message, "");
    }
}

export default teacherCheckIn