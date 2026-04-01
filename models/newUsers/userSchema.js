import mongoose from "mongoose";
// register schema for all
const userSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: [true, "password is missing"],
      minlength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#$%&*]).+$/,
        "Password should be Strong",
      ],
    },
    role: {
      type: String,
      enum: ["Student", "Teacher", "Principal"],
      required: [true, "role must be one of student, teacher or principal"],
    },
    url: {
      type: String,
      default: ""
    },
    public_id: {
      type: String,
      default: ""
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);

export default User;
