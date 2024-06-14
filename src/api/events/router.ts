import { Router } from "express";
const router = Router();
import {
  createEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  updateEventDetail,
  publishEvent,
  getPublishedEvents,
  deleteAllEvents,
  updateImage,
} from "./controller";
import validate from "../../utils/validator";
import {
  createEventValidation,
  deleteAllValidator,
  updateEventValidation,
  updateIsPublishedValidator,
} from "./validation";
import protect from "../../auth/protect";
import auth from "../../auth/auth";
import { upload } from "../../utils/file_upload";

router
  .route("/")
  .post(
    protect,
    auth("Super-admin", "Admin"),
    upload.single("image"),
    validate(createEventValidation),
    createEvent
  )
  .get(protect,
    auth("Super-admin", "Admin"),getAllEvents)
  .delete(
    protect,
    auth("Super-admin"),
    validate(deleteAllValidator),
    deleteAllEvents
  );

router.patch(
  "/publish",
  protect,
  auth("Super-admin", "Admin"),
  validate(updateIsPublishedValidator),
  publishEvent
);

router.get("/published", getPublishedEvents);

router
  .route("/:id")
  .get(getEvent)
  .delete(protect, auth("Super-admin"), deleteEvent)
  .patch(
    protect,
    auth("Super-admin"),
    validate(updateEventValidation),
    updateEventDetail
  );

router.patch(
  "/updateimage/:id",
  protect,
  auth("Super-admin"),
  upload.single("image"),
  updateImage
);

// Export
export default router;
