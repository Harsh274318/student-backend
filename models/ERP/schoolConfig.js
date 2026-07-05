import mongoose from "mongoose";
const schoolConfigSchema = new mongoose.Schema({

    principalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "principal Id is missing"],
        unique: true,
    },

    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    attendanceRadius: {
        type: Number,
        default: 100,
    },
    schoolOpenTime: {
        type: String,
        default: "07:30"
    },
    schoolClose: {
        type: String,
        default: "01:00"
    },
    openGrace: {
        type: Number,
        default: 15
    },
    closeGrace: {
        type: Number,
        default: 15
    },
    lateLimit: {
        type: Number,
        default: 3
    }
},
    { timestamps: true }
)

const SchoolConfig = mongoose.model("SchoolConfig", schoolConfigSchema);
export default SchoolConfig;
