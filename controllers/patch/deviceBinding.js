
// teacherId, isDeviceBind, userAgent, screenWidth, screenHeight,platform, devicePixel, deviceName, browser, osVersion

import DeviceBinding from "../../models/ERP/deviceBinding.js";
import customRes from "../../utils/customRes.js";



const deviceBind = async (req, res) => {
    try {
        const { userAgent, tscreenWidth, tscreenHeight, platform, tdevicePixel, deviceName, browser, osVersion } = req.body
        const teacherId = req.user._id
        if (!userAgent || !tscreenWidth || tscreenWidth == 0 || !tscreenHeight || tscreenHeight == 0 || !platform || !tdevicePixel || tdevicePixel == 0 || !deviceName || !browser || !osVersion) {
            return customRes(res, 400, false, "", "device details are missing", "");
        }
        const screenWidth = Number(tscreenWidth);
        const screenHeight = Number(tscreenHeight);
        const devicePixel = Number(tdevicePixel);
        if (
            Number.isNaN(screenWidth) ||
            Number.isNaN(screenHeight) ||
            Number.isNaN(devicePixel)
        ) {
            return customRes(res, 400, false, "", "Something is wrong with device binding", "");
        }
        if (screenWidth <= 0 || screenHeight <= 0 || devicePixel <= 0) {
            return customRes(res, 400, false, "", "Invalid device details", "");
        }
        const isBinded = await DeviceBinding.findOne({ teacherId })
        let saved = null
        if (isBinded) {
            isBinded.teacherId = teacherId,
                isBinded.isDeviceBind = true,
                isBinded.userAgent = userAgent,
                isBinded.screenWidth = screenWidth,
                isBinded.screenHeight = screenHeight,
                isBinded.platform = platform,
                isBinded.devicePixel = devicePixel,
                isBinded.deviceName = deviceName,
                isBinded.browser = browser,
                isBinded.osVersion = osVersion,
                saved = await isBinded.save()
        }
        else {
            saved = await DeviceBinding.create({
                teacherId,
                isDeviceBind: true,
                userAgent,
                screenWidth,
                screenHeight,
                platform,
                devicePixel,
                deviceName,
                browser,
                osVersion
            })
        }
        if (!saved) {
            return customRes(res, 400, false, "", "bind not saved", "");
        }
        const bind = saved.isDeviceBind
        return customRes(res, 200, true, "Device Binded successfully", "", { bind })
    }
    catch (err) {
        console.log(`deviceBind says=> ${err.message}`);
        return customRes(res, 500, false, "", err.message, "");
    }

}
export default deviceBind;
