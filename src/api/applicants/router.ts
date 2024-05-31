import { Router } from "express";
const router = Router();
import protect from "../../auth/protect";
import auth from "../../auth/auth";
import {
  createApplicantValidator,
  deleteAllApllicantsValidator,
  updateStatusValidator,
} from "./validator";
import {
  createApplicant,
  deleteAllApplicants,
  deleteApplicant,
  getAllApplicants,
  getApplicant,
  updateStatus,
} from "./controller";
import validate from "../../utils/validator";

router
  .route("/")
  .post(validate(createApplicantValidator), createApplicant)
  .get(protect, auth("Super-admin", "Admin"), getAllApplicants)
  .delete(
    protect,
    auth("Super-admin"),
    validate(deleteAllApllicantsValidator),
    deleteAllApplicants
  );

router
  .route("/updatestatus")
  .patch(
    protect,
    auth("Super-admin", "Admin"),
    validate(updateStatusValidator),
    updateStatus
  );

router
  .route("/:id")
  .get(getApplicant)
  .delete(protect, auth("Super-admin", "Admin"), deleteApplicant);

// Export router
export default router;
