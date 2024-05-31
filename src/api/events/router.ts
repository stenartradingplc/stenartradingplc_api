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
  getDraftedEvents,
  deleteAllEvents,
  updateImage,
} from "./controller";
import validate from "../../utils/validator";
import {
  createEventValidation,
  deleteAllValidator,
  updateEventValidation,
  updateIsPublishedValidator,
  updateImageValidator,
} from "./validation";
import protect from "../../auth/protect";
import auth from "../../auth/auth";

router
  .route("/")
  .post(
    protect,
    auth("Super-admin", "Admin"),
    validate(createEventValidation),
    createEvent
  )
  .get(getAllEvents)
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
router.get("/drafts", protect, auth("Super-admin", "Admin"), getDraftedEvents);

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
  validate(updateImageValidator),
  updateImage
);

// Export
export default router;
