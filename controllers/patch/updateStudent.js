import Student from "../../models/newUsers/studentSchema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import Session from "../../models/PrincipalControlModel/session.js";
import customRes from "../../utils/customRes.js";

const uptadeStudent = async (req, res) => {
    try {
        const { rollNumber, userId } = req.query;
        const teacherId = req.user.id
        const { data } = req.body
        if (!rollNumber || !userId) return customRes(res, 400, false, "", "Something is Wrong", "");
        if (!data) return customRes(res, 400, false, "", "data is missing", "");
        const isTeacher = await Teacher.findOne({ userId: teacherId });
        if (!isTeacher) return customRes(res, 404, false, "", "Teacher not found", "");
        const session = await Session.findOne();
        if (!session) return customRes(res, 404, false, "", "Session not found", "")
        if (data.rollNumber || data.session || data.userId) return customRes(res, 400, false, "", "May be Data have some Extra details", "")
        const student = await Student.findOneAndUpdate(
            { userId, rollNumber, session: session.currentSession },
            { $set: data },
            { new: true }
        );
        if (!student) return customRes(res, 404, false, "", "Student not found", "");
        return customRes(res, 200, true, "Student updated successfully", "", student);
    }
    catch (err) {
        console.log("uptadeStudent says::", err.message);
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default uptadeStudent