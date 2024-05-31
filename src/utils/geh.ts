import { Request, Response, NextFunction } from "express";
import AppError from "./app_error";
import configs from "../configs";

// Error for development environment
const errorForDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

// Error for production environment
const errorForProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps, something went wrong",
    });
  }
};

// Error for unknown environment
const errorForUnknownNodeEnvironment = (err: AppError, res: Response) => {
  res.status(500).json({
    status: "ERROR",
    message: "Opps, unknown environment selected",
  });
};

// Error handler middleware
export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ERROR";

  if (err.name === "JsonWebTokenError") {
    err = new AppError("Please login", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new AppError("Please login", 401);
  }

  if (err.message.includes("E11000")) {
    if (err.message.includes("phone_number")) {
      err = new AppError("Phone number is already used", 400);
    } else if (err.message.includes("email")) {
      err = new AppError("Email is already used", 400);
    }
  }

  // Send different error for different environments
  if (configs.env === "development") {
    errorForDev(err, res);
  } else if (configs.env === "production" || configs.env === "qa") {
    errorForProd(err, res);
  } else {
    errorForUnknownNodeEnvironment(err, res);
  }
};
