import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is missing !"],
        trim: true
    },
    userId: {
        type: String,
        required: [true, "userId is required"],

    },
    userUrl: {
        type: String,
        required: [true, "userUrl is required"],

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
        enum: ["study", "student", "news", "announcement", "general"],
        trim: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    userUrl: {
        type: String,
        default: ""
    },
    comments: [
        {
            user: {
                type: String,
                required: [true, "user is missing"]
            },
            userId: {
                type: String,
                required: [true, "id is missing"]
            },
            url: {
                type: String,
                default: ""
            },
            message: {
                type: String,
                required: [true, "message is missing"],
                trim: true
            },
            date: {
                type: Date,
                default: Date.now
            },

        }
    ]
}, { timestamps: true })
const Posts = mongoose.model("Posts", postSchema)
export default Posts