import Joi from "joi";
import { RequestHandler } from "express";
import AppError from "./app_error";

export default (joiSchema: Joi.Schema): RequestHandler => {
  return (req, res, next) => {
    // Validate incoming request body
    const { value, error } = joiSchema.validate(req.body);
    if (error) {
      return next(new AppError(error.message, 400));
    }

    // Add "value" on request object
    req.value = value;
    next();
  };
};
