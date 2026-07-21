import DeviceBinding from "../models/ERP/DeviceBinding.js";
import customRes from "../utils/customRes.js";


const authDevice = async (req, res, next) => {
    const { platform, deviceName, browser, osVersion, userAgent } = req.body;
    let { rScreenWidth, rScreenHeight, rDevicePixel } = req.body
    const teacherId = req.user.id;
    try {
        if (!platform || !deviceName || !browser || !osVersion || !userAgent || rScreenWidth == null || rScreenHeight == null || rDevicePixel == null) {
            return customRes(res, 400, false, "", "Something is Wrong!", "")
        };

        const screenWidth = Number(rScreenWidth);
        const screenHeight = Number(rScreenHeight);
        const devicePixel = Number(rDevicePixel);
        if (Number.isNaN(screenWidth) || Number.isNaN(screenHeight) || Number.isNaN(devicePixel)) {
            return customRes(res, 400, false, "", "something is wrong", "")
        };
        if (screenWidth <= 0 || screenHeight <= 0 || devicePixel <= 0) {
            return customRes(res, 400, false, "", "Numbers are Zero", "")
        };
        const deviceBinding = await DeviceBinding.findOne({ teacherId });
        if (!deviceBinding) {
            return customRes(res, 404, false, "", "Device is not bound yet.", "");
        };
        const isValidConfig =
            deviceBinding.browser === browser &&
            deviceBinding.platform === platform &&
            deviceBinding.osVersion === osVersion &&
            deviceBinding.userAgent === userAgent &&
            deviceBinding.deviceName === deviceName &&
            deviceBinding.screenWidth === screenWidth &&
            deviceBinding.devicePixel === devicePixel &&
            deviceBinding.screenHeight === screenHeight;
        if (!isValidConfig) {
            return customRes(res, 400, false, "", "Device configuration does not match.", "");
        };
        return next()



    }
    catch (err) {
        console.log(`authDevice err is ${err.message}`);
        return customRes(res, 500, false, "", err.message, "")
    }

}
export default authDevice