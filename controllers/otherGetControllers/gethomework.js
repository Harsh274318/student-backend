import HomeWork from "../../models/ERP/homeWorkShema.js";
import Student from "../../models/newUsers/studentSchema.js";
import Session from "../../models/PrincipalControlModel/session.js";
import customRes from "../../utils/customRes.js";



const getHomework = async (req, res) => {
    try {
        const date = req.query.date;
        let classToUse = req.query.useClass

        if (!date) return customRes(res, 400, false, "", "Something is wrong", "");
        if (typeof date !== "string") return customRes(res, 400, false, "", "Invalid date format", "");
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return customRes(res, 400, false, "", "Invalid date format (YYYY-MM-DD)", "");
        const session = await Session.findOne();
        const currentSession = session.currentSession;
        if (!classToUse) {
            const studentId = req.user.id
            if (!studentId) return customRes(res, 400, false, "", "Something is wrong", "");
            const student = await Student.findOne({ userId: studentId, session: currentSession });
            if (!student) return customRes(res, 404, false, "", "Student not found", "");
            classToUse = student.class
        }
        if (isNaN(Number(classToUse))) return customRes(res, 400, false, "", "Class must be a number", "");
        classToUse = Number(classToUse);
        const ishomeWork = await HomeWork.findOne({ class: classToUse, session: currentSession, date })
        if (!ishomeWork) return customRes(res, 404, false, "", "Home work not found", "");
        return customRes(res, 200, true, "Here is your Home work", "", ishomeWork.homeWork);
    }
    catch (err) {
        console.log("get Home work says::", err.message);
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default getHomework