import mongoose from "mongoose";
// regester schema for all
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
      enum: ["student", "teacher", "principal"],
      required: [true, "role must be one of student, teacher or principal"],
    },
    url: {
      type: String,
      required: [true, "Image is Missing in user"],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);

export default User;
