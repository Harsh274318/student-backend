import Student from "../../models/newUsers/studentSchema.js";
import User from "../../models/newUsers/userSchema.js";
import customRes from "../../utils/customRes.js"
import Teacher from "../../models/newUsers/teacherSchema.js";
import Session from "../../models/PrincipalControlModel/session.js";


const promotStudent = async (req, res) => {
    try {
        const { email, name, } = req.body
        const teacherId = req.user.id;
        if (!email || !name) return customRes(res, 400, false, "", "Something is wrong Check all fields", "")
        if (!teacherId) return customRes(res, 400, false, "", "teacher is missing", "")
        const teacher = await Teacher.findOne({ userId: teacherId });
        if (!teacher) return customRes(res, 404, false, "", "Teacher not found", "");

        const user = await User.findOne({ email, name });
        if (!user) return customRes(res, 404, false, "", "User not found", "");
        
        const student = await Student.findOne({ userId: user._id })
        if (!student) return customRes(res, 404, false, "", "student Not found", "");
        const nextSession = await Session.findOne();
        if (!nextSession) return customRes(res, 404, false, "", "session not found", "");
        
        const already = await Student.findOne({
            userId: user._id,
            session: nextSession.currentSession
        });
        if (already) return customRes(res, 400, false, "", "Already promoted", "");

        if (student.session == nextSession.currentSession) return customRes(res, 400, false, "", "Previos seesion and Promoted session can not be same", "");
        const data = student.toObject()
        delete data._id;
        delete data.createdAt;
        delete data.updatedAt;
        const promotTO = await Student.create({
            ...data, session: nextSession.currentSession, class: student.class + 1, rollNumber: student.rollNumber + 100
        });
        if (!promotTO) return customRes(res, 400, false, "", "Student not promoted to next class try again!", "");
        return customRes(res, 200, true, "Student promoted to next Class", "", {
            email, name, class: Number(teacher.classAssigned) + 1
        })





    }
    catch (err) {
        console.log("promotStudent says::", err.message)
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default promotStudent