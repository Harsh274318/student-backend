import mongoose from "mongoose";

const DeviceBindingSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Teacher Id missing"],
        unique: true,
    },
    isDeviceBind: {
        type: Boolean,
        default: false
    },
    userAgent: {
        type: String,
    },
    screenWidth: {
        type: Number,
        required: [true, "screen width missing"],
    },

    screenHeight: {
        type: Number,
        required: [true, "screen height missing"],
    },

    platform: {
        type: String,
        required: [true, "platform missing"],
    },

    devicePixel: {
        type: Number,
        required: [true, "devicePixelRatio is missing"],
    },
    deviceName: {
        type: String,
        required: [true, "diviceName is missing"]
    },
    browser: {
        type: String,
    },
    osVersion: {
        type: String,
    },
},
    {
        timestamps: true,
    });

const DeviceBinding = mongoose.model("DeviceBinding", DeviceBindingSchema);

export default DeviceBinding;