import customRes from "../../utils/customRes.js"
import User from "../../models/newUsers/userSchema.js";



const updateProfile = async (req, res) => {
    try {
        const { email } = req.body;
        const { url, public_id } = req.imageInfo;
        if (!email) return customRes(res, 400, false, "", "Something is Wrong", "");
        const updated = await User.findOneAndUpdate({ email }, { $set: { url, public_id } }, { new: true });
        if (!updated) return customRes(res, 400, false, "", "failed to update Profile", "")
        return customRes(res, 200, true, "updated successfully", "", updated)
    }
    catch (err) {
        return customRes(res, 500, false, "", err.message, "");
    }
}
export default updateProfile;