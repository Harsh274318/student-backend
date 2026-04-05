import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    sessions: {
        type: [String],
        required: true,
    },
    currentSession: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
export default Session