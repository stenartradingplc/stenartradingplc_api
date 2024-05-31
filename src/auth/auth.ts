import { RequestHandler } from "express";
import IAdminDoc from "../api/admin/dto";
import AppError from "../utils/app_error";

export default (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = <IAdminDoc>req.user;
    if (!roles.includes(user.role)) {
      return next(new AppError("Access Denied", 403));
    }
    next();
  };
};
