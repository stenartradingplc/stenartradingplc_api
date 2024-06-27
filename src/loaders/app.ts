import express, { Request, Response, NextFunction } from "express";
const app = express();
import geh from "../utils/geh";
import AppError from "../utils/app_error";
import cors from "cors";

// Import router files here
import adminRouter from "../api/admin/router";
import eventRouter from "../api/events/router";
import contactUseRouter from "../api/contact_us/router";
import blogRouter from "../api/blog/router";

// Third party middleware
app.use(cors({origin:"*"}));

// Parse incoming data - from request body and query
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount endpoints with router files - controller methods
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/contactus", contactUseRouter);
app.use("/api/v1/blogs", blogRouter);

// Healthcheck endpoint
app.get("/healthcheck", (req, res, next) => {
  try {
    res.status(200).json({
      status: "SUCCESS",
      message: "Healthy!",
    });
  } catch (error) {
    next(error);
  }
});

// Unknown url
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("Unknown URL", 404));
});
app.use(geh);
// Export app
export default app;
