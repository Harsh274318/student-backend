import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import newUserRouter from "./routes/createUsersRoute.js";
import getUserRoute from "./routes/getUserRoute.js";
import deleteRoute from "./routes/deleteUserRoute.js";
import patchRoute from "./routes/updatePassword.js";

connectDB();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
// :api calls
// only for login
app.use("/api/auth", authRoute);
// for create user POST APIs
app.use("/api", newUserRouter);
// for View/getUser GET APIs
app.use("/api", getUserRoute);
// for update password PATCH API
app.use("/api/user", patchRoute);
// for delete user DELETE APIs
app.use("/api", deleteRoute);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
