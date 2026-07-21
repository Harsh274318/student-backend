import customRes from "../../utils/customRes.js";
import SchoolConfig from "../../models/ERP/schoolConfig.js";

const schoolConfig = async (req, res) => {
    try {
        const {
            lat,
            lng,
            attendanceRadius,
            schoolOpenTime,
            schoolClose,
            openGrace,
            closeGrace,
            lateLimit
        } = req.body;
        const id = req.user._id
        // Required fields
        if (
            lat === undefined ||
            lng === undefined ||
            attendanceRadius === undefined ||
            schoolOpenTime === undefined ||
            schoolClose === undefined ||
            openGrace === undefined ||
            closeGrace === undefined ||
            lateLimit === undefined
        ) {
            return customRes(res, 400, false, "", "Something is missing in data.", "");
        }

        // Convert to numbers
        const latNum = Number(lat);
        const lngNum = Number(lng);
        const attendanceRadiusNum = Number(attendanceRadius);
        const openGraceNum = Number(openGrace);
        const closeGraceNum = Number(closeGrace);
        const lateLimitNum = Number(lateLimit);

        // Number validation
        if (
            Number.isNaN(latNum) ||
            Number.isNaN(lngNum) ||
            Number.isNaN(attendanceRadiusNum) ||
            Number.isNaN(openGraceNum) ||
            Number.isNaN(closeGraceNum) ||
            Number.isNaN(lateLimitNum)
        ) {
            return customRes(res, 400, false, "", "All numeric fields must be valid numbers.", "");
        }

        // Latitude validation
        if (latNum < -90 || latNum > 90) {
            return customRes(res, 400, false, "", "Latitude must be between -90 and 90.", "");
        }

        // Longitude validation
        if (lngNum < -180 || lngNum > 180) {
            return customRes(res, 400, false, "", "Longitude must be between -180 and 180.", "");
        }

        // Attendance radius validation
        if (attendanceRadiusNum < 10 || attendanceRadiusNum > 1000) {
            return customRes(res, 400, false, "", "Attendance radius must be between 10 and 1000 meters.", "");
        }

        // Grace validations
        if (openGraceNum < 0 || closeGraceNum < 0 || lateLimitNum < 0) {
            return customRes(res, 400, false, "", "Grace values cannot be negative.", "");
        }

        // Time format validation
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (![schoolOpenTime, schoolClose].every(time => timeRegex.test(time))) {
            return customRes(
                res,
                400,
                false,
                "",
                "schoolOpenTime and schoolClose must be in HH:mm (24-hour) format.",
                ""
            );
        }

        // Open time should be before close time
        const [openHour, openMinute] = schoolOpenTime.split(":").map(Number);
        const [closeHour, closeMinute] = schoolClose.split(":").map(Number);

        const openMinutes = openHour * 60 + openMinute;
        const closeMinutes = closeHour * 60 + closeMinute;

        if (openMinutes >= closeMinutes) {
            return customRes(
                res,
                400,
                false,
                "",
                "School open time must be earlier than school close time.",
                ""
            );
        }
        // Save/Update config here
        // Save or Update School Configuration
        const config = await SchoolConfig.findOneAndUpdate(
            {},
            {
                principalId: id,
                location: {
                    lat: latNum,
                    lng: lngNum,
                },
                attendanceRadius: attendanceRadiusNum,
                schoolOpenTime,
                schoolClose,
                openGrace: openGraceNum,
                closeGrace: closeGraceNum,
                lateLimit: lateLimitNum,
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );
        if (!config) {
            return customRes(res, 500, false, "", "Failed to save school configuration.", "");
        }

        return customRes(
            res,
            200,
            true,
            config,
            "School configuration saved successfully.",
            ""
        );
    } catch (err) {
        console.log(`school config:: ${err.message}`);
        return customRes(res, 500, false, "", err.message, "");
    }
};

export default schoolConfig;