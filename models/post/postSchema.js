import mongoose, { Schema } from "mongoose";
const postSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is missing !"],
        trim: true
    },
    class: {
        type: String,
        required: [true, "class is missing"],
        trim: true
    },
    title: {
        type: String,
        required: [true, "title is missing!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "description is missing!"],
        trim: true
    },
    category: {
        type: String,
        enum: ["study", "news", "announcement", "general"],
        trim: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            user: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true,
                trim: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            trim: true
        }
    ]
}, { timestamps: true })
const Posts = mongoose.model("Posts", postSchema)
export default Posts