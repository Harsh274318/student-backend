import mongoose, { mongo } from "mongoose";
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Enter valid email"],
    },
    otp: {
        type: String,
        required: [true, "OTP is missing"]
    },
    createdAt: { type: Date, default: Date.now, expires: 600 }
})
const OTP = mongoose.model("OTP", otpSchema);
export default OTP