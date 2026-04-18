import Student from "../../models/newUsers/studentSchema.js";
import customRes from "../../utils/customRes.js"



const studentById = async (req, res) => {
    try {
        // geting student rollNumber
        const roll = Number(req.params.id);
        console.log(roll)
        // geting class and session
        const { classRoom, session } = req.query;
        // checking class and session fill should not empty
        if (!classRoom || !session) return customRes(res, 400, false, "", "somethig is wrong check all filled", "");
        // converting class into numner
        const classNum = Number(classRoom);
        // checking is class should number or not 
        if (isNaN(classNum)) return customRes(res, 400, false, "", "Invalid class", "");
        // checking is rollnumber should number or not 
        if (isNaN(roll)) return customRes(res, 400, false, "", "Invalid roll number", "");
        // checking roll number must equal or greter then 3 digits
        if (roll < 100) return customRes(res, 400, false, "", "Roll Number must at lest 3 digits", "")
        // geting student details form db
        const student = await Student.findOne({ rollNumber: roll, class: classRoom, session: session }).populate("userId", "name email url");
        // checking is student or not in db 
        if (!student) return customRes(res, 404, false, "", "student not found", "");
        // we come till here means everything is okk so sending student's data to principal
        return customRes(res, 200, true, "student founded", "", student)

    }
    catch (err) {
        // handal errors
        console.log("studentById says::", err.message)
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default studentById