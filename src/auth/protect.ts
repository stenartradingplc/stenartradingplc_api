import AppError from "../utils/app_error";
import { Request, Response, NextFunction } from "express";
import configs from "../configs";
import verifyToken from "../utils/verify_token";
import Admin from "../api/admin/dal";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new AppError("Please login", 401));

    // Verify the token
    const decodedData = verifyToken(token);
    if (decodedData.user === "admin") {
      const admin = await Admin.getAdmin(decodedData.id);
      if (!admin) {
        return next(
          new AppError(
            "Unable to authorize you to this resource. Please login",
            401
          )
        );
      }

      if (admin.is_default_password) {
        return next(new AppError("Please change your default password.", 400));
      }

      if (!admin.account_status) {
        return next(new AppError("You're account is not active.", 401));
      }

      if (admin.email_phone_number_changed_at) {
        return next(
          new AppError(
            "You recently changed your email or phone number. Please login again",
            401
          )
        );
      }

      if (admin.checkPasswordChangedAt(decodedData.iat as number)) {
        return next(
          new AppError(
            "You recently changed your password. Please login again",
            401
          )
        );
      }

      // Put admin data on request object for later use in other middlewares
      req.user = admin;
    } else if (decodedData.user === "client") {
      // Client related authorization rules
    }

    next();
  } catch (error) {
    next(error);
  }
};
