import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    class: {
      type: String,
      required: [true, "class is missing"],
    },
    dob: {
      type: Date,
      required: [true, "DOB is missing or something wrong"],
    },
    rollNumber: {
      type: Number,
      unique: [true, "Roll number should be unique"],
      min: 100,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      require: [true, "gender is missing"],
    },
    fatherName: {
      type: String,
      lowercase: true,
      match: [/^[a-z ]+$/, "Only alphabets and spaces allowed"],
    },
    parentMobile: {
      type: String,
      required: [true, "Parent mobile number is required"],
      match: [/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number"],
    },
    notifyMethod: {
      type: String,
      enum: ["sms", "whatsapp"],
      required: [true, "Notification method is required for student"],
    },
    address: {
      type: String,
      lowercase: true,
      required: [true, "address is mandatory"],
      match: [/^[A-Za-z0-9\s,./-]+$/, "Enter valid address"],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Student = mongoose.model("Student", studentSchema);
export default Student;

//  name: {
//     type: String,
//     required: [true, "Name is missing"],
//     trim: true,
//     lowercase: true,
//     match: [/^[a-z ]+$/, "name should be only in lowerCase"],
//   },
//   email: {
//     type: String,
//     trim: true,
//     required: [true, "email is missing"],
//     unique: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, "Enter valid email"],
//   },
//   password: {
//     type: String,
//     required: [true, "password is missing"],
//     minlength: 8,
//     match: [
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#$%&*]).+$/,
//       "Password should be Strong",
//     ],
//   },
//   role: {
//     type: String,
//     enum: ["principal"],
//     required: [true, "role is missing"],
//   },
