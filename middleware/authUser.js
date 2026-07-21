import jwt from "jsonwebtoken";
import customRes from "../utils/customRes.js";
import fs from "fs"
export function authUser(req, res, next) {
  try {
    const tokenDetails = req.headers?.authorization?.split(" ");
    const Bearer = tokenDetails[0];
    if (!Bearer) {
      return customRes(res, 401, false, "", "0.1 invalid token", "");
    }
    if (Bearer !== "Bearer") {
      return customRes(res, 401, false, "", "0.2 invalid token");
    }
    const token = tokenDetails[1];
    if (!token) {
      return customRes(res, 401, false, "", "0.3 invalid token", "");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return customRes(res, 400, false, "", "user not verified!");
    req.user = verified;
    next();
  } catch (err) {
    console.log(err.message, "auth");
    if (req.file?.path) fs.unlinkSync(req.file.path);//remove image which comes with req
    if (err.name === "TokenExpiredError") {
      return customRes(res, 401, false, "", "login again", "");
    }
    return customRes(res, 500, false, "", err, "");
  }
}
