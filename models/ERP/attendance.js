import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({
    class: {
        type: Number,
        required: [true, "Class is missing"]
    },
    date: {
        type: String,
        required: [true, "date is missing"]
    },
    session: {
        type: String,
        required: [true, "Session is missing"]
    },
    records: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["present", "absent"], required: true }
    }
    ]


}, { timestamps: true });
attendanceSchema.index({ class: 1, session: 1, date: 1 }, { unique: true });
const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;