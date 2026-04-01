import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is missing !"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Enter valid email"],
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    url: {
        type: String,
        default: ""
    },
    comments: [
        {
            user: {
                type: String,
                required: true
            },
            url:{
                type:String,
                default:""
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

        }
    ]
}, { timestamps: true })
const Posts = mongoose.model("Posts", postSchema)
export default Posts