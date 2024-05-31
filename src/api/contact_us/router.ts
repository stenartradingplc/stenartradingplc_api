import { Router } from "express";
import {
  createContactUs,
  deleteAllContactUs,
  deleteContactUs,
  getAll,
  getById,
} from "./controller";

//validators
import validate from "../../utils/validator";
import {
  createContactUsValidation,
  deleteAllContactUsValidation,
} from "./validation";

//custom modules
import protect from "../../auth/protect";
import auth from "../../auth/auth";

const router = Router();

router
  .route("/")
  .post(validate(createContactUsValidation), createContactUs)
  .get(getAll)
  .delete(
    protect,
    auth("Super-admin"),
    validate(deleteAllContactUsValidation),
    deleteAllContactUs
  );

router
  .route("/:id")
  .get(protect, auth("Super-admin"), getById)
  .delete(protect, auth("Super-admin"), deleteContactUs);

// Export router
export default router;
