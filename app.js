import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
import authRoute from "./routes/authRoute.js";
import newUserRouter from "./routes/createUsersRoute.js";
import getUserRoute from "./routes/getUserRoute.js";
import deleteRoute from "./routes/deleteUserRoute.js";
import patchRoute from "./routes/updatePassword.js";
import sendRoute from "./routes/sendRoute.js";
import teacherRoute from "./routes/teacherRotes.js";
import postRoute from "./routes/social/postRoute.js";
const PORT = process.env.PORT;
const app = express();
import cors from "cors";
import principalRoute from "./routes/principalRoutes.js";
app.use(cors());
app.use(express.json());
// :api calls
app.get("/", (req, res) => {
  res.send({ status: 200, success: true, wellcome: "User", message: "server is working on 2:41am" });
});
// only for login
app.use("/api/auth", authRoute);
// for create user POST APIs
app.use("/api", newUserRouter);
// for View/getUser GET APIs
app.use("/api", getUserRoute);
// for update password PATCH API
app.use("/api/user", patchRoute);
// for delete user delete APIs
app.use("/api", deleteRoute);
// for send Notifications
app.use("/api/notify", sendRoute);
// teacher Routes
app.use("/api/teacher", teacherRoute);
// for post Routes
app.use("/api/social", postRoute);
app.use("/api", principalRoute);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
