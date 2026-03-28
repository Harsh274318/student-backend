import customRes from "../utils/customRes.js";

export const roleCheck = (allowedRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== allowedRole) {
      return customRes(res, 403, false, "", "Access denied", "");
    }
    next();
  };
};
