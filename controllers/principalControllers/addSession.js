import Session from "../../models/PrincipalControlModel/session.js";
import customRes from "../../utils/customRes.js"

const addSession = async (req, res) => {
    try {

        const { session } = req.body
        if (!session) return customRes(res, 400, false, "", "filled is empty", "");
        const sessionDoc = await Session.findOne()
        if (sessionDoc.sessions.includes(session)) return customRes(res, 400, false, "", "session exist", "");
        sessionDoc.sessions.push(session);
        sessionDoc.currentSession = session;
        const updated = await sessionDoc.save()
        if (!updated) return customRes(res, 204, false, "", "Try after some time", "");
        return customRes(res, 200, true, "Session added", "", updated)
    }
    catch (err) {
        return customRes(res, 500, false, "", err.message, "");

    }
}
export default addSession