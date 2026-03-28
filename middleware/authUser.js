import jwt from "jsonwebtoken";
import customRes from "../utils/customRes.js";
export function authUser(req, res, next) {
  const tokenDetails = req.headers?.authorization?.split(" ");
  const Bearer = tokenDetails[0];
  if (!Bearer) {
    return customRes(res, 401, false, "", "invalid token", "");
  }
  if (Bearer !== "Bearer") {
    return customRes(res, 401, false, "", "invalid token");
  }
  const token = tokenDetails[1];
  if (!token) {
    return customRes(res, 401, false, "", "invalid token", "");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err.message, "auth");
    return customRes(res, 500, false, "", err, "");
  }
}
