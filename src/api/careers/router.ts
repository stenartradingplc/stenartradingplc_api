import { Router } from "express";
const router = Router();
import protect from "../../auth/protect";
import auth from "../../auth/auth";
import validate from "../../utils/validator";
import {
  createCareersValidator,
  deleteAllCareersValidator,
  updateCareerValidator,
  updateEmploymentTypeValidator,
  updateIs_Published_Validator,
  updateVacStatusValidator,
} from "./validation";
import {
  createCareer,
  deleteAllCareers,
  deleteCareer,
  getAllApplicants,
  getAllCareers,
  getCareer,
  getDraftedCareers,
  getPublishedCareers,
  updateCareer,
  updateEmploymentType,
  updateIsPublished,
  updateVacancyStatus,
} from "./controller";

// Mount route name with controller method
router
  .route("/")
  .post(
    protect,
    auth("Super-admin"),
    validate(createCareersValidator),
    createCareer
  )
  .get(getAllCareers)
  .delete(
    protect,
    auth("Super-admin"),
    validate(deleteAllCareersValidator),
    deleteAllCareers
  );

router.patch(
  "/employmenttype",
  protect,
  auth("Super-admin"),
  validate(updateEmploymentTypeValidator),
  updateEmploymentType
);

router.patch(
  "/publish",
  protect,
  auth("Super-admin"),
  validate(updateIs_Published_Validator),
  updateIsPublished
);

router.patch(
  "/careerstatus",
  protect,
  auth("Super-admin"),
  validate(updateVacStatusValidator),
  updateVacancyStatus
);

router.get("/published", getPublishedCareers);

router.get("/drafts", protect, auth("Super-admin", "Admin"), getDraftedCareers);

router.get("/applicants/:id", protect, getAllApplicants);

router
  .route("/:id")
  .get(getCareer)
  .patch(
    protect,
    auth("Super-admin"),
    validate(updateCareerValidator),
    updateCareer
  )
  .delete(protect, auth("Super-admin"), deleteCareer);

export default router; // Export the router
