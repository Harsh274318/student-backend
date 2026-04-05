import HomeWork from "../../models/ERP/homeWorkShema.js";
import Teacher from "../../models/newUsers/teacherSchema.js";
import customRes from "../../utils/customRes.js";
import Session from "../../models/PrincipalControlModel/session.js"


const classHomeWork = async (req, res) => {
    try {
        // homework as array of object [{title:Hindi,description:Read 2nd chapter},{title:English,description:learn 4nd chapter}]
        const { homeWork } = req.body
        // geting teacher id from authUser middlewear
        const teacherId = req.user.id
        // create current date
        const date = new Date().toISOString().split('T')[0];
        // checking homework should not empty
        if (!Array.isArray(homeWork) || homeWork.length === 0) return customRes(res, 400, false, "", "Invalid homework data", "");
        // accessing sessions 
        const session = await Session.findOne();
        if(!session) return customRes(res,404,false,"","session not found","")
        const currentSession = session.currentSession;
        // finding teacher for access class
        const isteacher = await Teacher.findOne({ userId: teacherId });
        // checking teacher exist or not 
        if (!isteacher) return customRes(res, 404, false, "", "Teacher Not Found", "");
        // checking homework should not already uploaded
        const ishomework = await HomeWork.findOne({ class: isteacher.classAssigned, session: currentSession, date: date });
        if (ishomework) return customRes(res, 400, false, "", "Today home work exist", "");
        // createing homework
        const todayHomework = await HomeWork.create({
            date, class: isteacher.classAssigned, session: currentSession, homeWork
        });
        // confiming homework uploaded seccessfully
        if (!todayHomework) return customRes(res, 400, false, "", "homework not uploaded", "");
        // sending data to user
        return customRes(res, 200, true, "Home work uploaded successfully", "", todayHomework.homeWork)

    }
    catch (err) {
        // handel error
        console.log("homework Says::", err.message);
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default classHomeWork