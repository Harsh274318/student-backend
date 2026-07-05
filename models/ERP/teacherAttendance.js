import mongoose from "mongoose";
const teacherAttendanceSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "teacherID is missing"],
    },
    date: {
        type: Date,
        required: [true, "date is missing"],
    },
    status: {
        type: String,
        enum: ["present", "absent", "late","half"],
        default: "absent"
    },
    checkIn: {
        type: Date,
        default: null,

    },
    checkOut: {
        type: Date,
        default: null,
    },
    gps: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null }
    },

    isWorkingDay: {
        type: Boolean,
        required: [true, "working day missing"]
    },
    deductible: {
        type: Boolean,
        default: false,
    },
    overriddenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    overrideReason: {
        type: String,
        default: null,
    },


}, { timestamps: true });
teacherAttendanceSchema.index(
    { teacherId: 1, date: 1 },
    { unique: true }
)
const TeacherAttendance = mongoose.model("TeacherAttendance", teacherAttendanceSchema)
export default TeacherAttendance