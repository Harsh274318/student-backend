import mongoose from "mongoose"
const homeWorkeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "date is missing"],
    },
    class: {
        type: Number,
        required: [true, "class is missing"],
    },
    session: {
        type: String,
        required: [true, "session is missing"]
    },
    homeWork: [{
        title: {
            type: String,
            required: [true, "title is missing"],
        },
        description: {
            type: String,
            required: [true, "description is missing"],
        }
    },
    ]
}, { timestamps: true })
homeWorkeSchema.index({ class: 1, date: 1, session: 1 }, { unique: true });
const HomeWork = mongoose.model("HomeWork", homeWorkeSchema);
export default HomeWork;