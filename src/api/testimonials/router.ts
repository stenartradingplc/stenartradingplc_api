import { Router } from "express";
import {
  createTestimonial,
  removeAllTestimonial,
  deleteTestimonial,
  getById,
  updateTestimonial,
  updateTestimonialImage,
  getAllTestimonials,
} from "./controller";

//validators
import validate from "../../utils/validator";
import {
  createTestimonialValidation,
  deleteAllTestimonialsValidation,
  publishTestimonialValidator,
  updateTestimonialValidation,
} from "./validation";

//custom modules
import protect from "../../auth/protect";
import auth from "../../auth/auth";
import { upload } from "../../utils/file_upload";

const router = Router();

router
  .route("/")
  .post(
    protect,
    auth("Super-admin", "Admin"),
    upload.single("image"),
    validate(createTestimonialValidation),
    createTestimonial
  )
  .delete(
    protect,
    auth("Super-admin", "Admin"),
    validate(deleteAllTestimonialsValidation),
    removeAllTestimonial
  ).get(getAllTestimonials);


router
  .route("/:id")
  .get(getById)
  .patch(
    protect,
    auth("Super-admin", "Admin"),
    validate(updateTestimonialValidation),
    updateTestimonial
  )
  .delete(protect, auth("Super-admin", "Admin"), deleteTestimonial);

router.patch(
  "/updateimage/:id",
  protect,
  auth("Super-admin", "Admin"),
  upload.single("image"),
  updateTestimonialImage
);

// Export router
export default router;
