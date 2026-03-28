import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d907rno.mongodb.net/school001`,
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("DB not connected", error);
    process.exit(1);
  }
};

export default connectDB;
