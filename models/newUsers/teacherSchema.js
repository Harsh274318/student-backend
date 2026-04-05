import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "id is missing"],
  },
 
  classAssigned: {
    type: Number,
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
