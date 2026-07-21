import Student from "../../models/newUsers/studentSchema.js";
import User from "../../models/newUsers/userSchema.js";
import customRes from "../../utils/customRes.js";


const allStudents = async (req, res) => {
    const user = req.user.id
    try {
        if (!user) {
            return customRes(res, 400, false, user, "Something is Wrong", "");
        }
        const isPrincipal = await User.findById(user);
        if (!isPrincipal) return customRes(res, 404, false, "", "User not found", "");
        if (isPrincipal.role !== "Principal") return customRes(res, 400, false, "", "only Principal can use", "");
        const students = await Student.find().populate("userId", "email name url public_id");
        if (students.length === 0) return customRes(res, 404, false, "", "students not founded!", "");

        return customRes(res, 200, true, "Students fetched successfully", "", students)

    }
    catch (err) {
        console.log(`allStedents says:: ${err.message}`)
        return customRes(res, 500, false, "", err.message, "")
    }
}

export default allStudents