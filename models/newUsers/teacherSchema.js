import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "id is missing"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Enter valid email"],
  },
  name: {
    type: String,
    required: [true, "name is missing"],
  },
  classAssigned: {
    type: String,
    unique: [true, "user exist with this class"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    require: [true, "gender is missing"],
  },
});
const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
