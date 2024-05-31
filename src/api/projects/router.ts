import { Router } from "express";
const router = Router();
import protect from "../../auth/protect";
import auth from "../../auth/auth";
import validate from "../../utils/validator";
import {
  createProjectValidator,
  deleteAllProjectsValidator,
  publishProjectValidator,
  updateImgValidator,
  updateProjectValidator,
} from "./validation";
import {
  createProject,
  deleteAllProjects,
  deleteProject,
  getAllProjects,
  getDraftedProjects,
  getProject,
  getPublishedProjects,
  publishProject,
  updateProjectImg,
  updateProjectInfo,
} from "./controller";

// Mount routes with their controller methods
router
  .route("/")
  .post(
    protect,
    auth("Super-admin"),
    validate(createProjectValidator),
    createProject
  )
  .get(protect, auth("Super-admin", "Admin"), getAllProjects)
  .delete(
    protect,
    auth("Super-admin"),
    validate(deleteAllProjectsValidator),
    deleteAllProjects
  );

router.get("/published", getPublishedProjects);
router.get(
  "/drafts",
  protect,
  auth("Super-admin", "Admin"),
  getDraftedProjects
);

router.patch(
  "/publish",
  protect,
  auth("Super-admin"),
  validate(publishProjectValidator),
  publishProject
);

router.patch(
  "/updateimg",
  protect,
  auth("Super-admin", "Admin"),
  validate(updateImgValidator),
  updateProjectImg
);

router
  .route("/:id")
  .patch(
    protect,
    auth("Super-admin"),
    validate(updateProjectValidator),
    updateProjectInfo
  )
  .get(getProject)
  .delete(protect, auth("Super-admin", "Admin"), deleteProject);

export default router;
