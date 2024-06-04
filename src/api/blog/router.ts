import { Router } from "express";
import {
  createBlog,
  removeAllBlog,
  deleteBlog,
  getAll,
  getById,
  getByTitle,
  updateBlog,
  updateBlogImage,
  getAllPublished,
  publishBlog,
} from "./controller";

//validators
import validate from "../../utils/validator";
import {
  createBlogValidation,
  deleteAllBlogsValidation,
  publishBlogValidator,
  updateBlogValidation,
  updateImageValidator,
} from "./validation";

//custom modules
import protect from "../../auth/protect";
import auth from "../../auth/auth";

const router = Router();

router
  .route("/")
  .post(
    protect,
    auth("Super-admin", "Admin"),
    validate(createBlogValidation),
    createBlog
  )
  .get(protect, auth("Super-admin", "Admin"), getAll)
  .delete(
    protect,
    auth("Super-admin", "Admin"),
    validate(deleteAllBlogsValidation),
    removeAllBlog
  );

router.get("/published", getAllPublished);

router.get("/getbytitle/:title", getByTitle);
router.patch(
  "/publish/:id",
  protect,
  auth("Super-admin", "Admin"),
  validate(publishBlogValidator),
  publishBlog
);

router
  .route("/:id")
  .get(getById)
  .patch(
    protect,
    auth("Super-admin", "Admin"),
    validate(updateBlogValidation),
    updateBlog
  )
  .delete(protect, auth("Super-admin", "Admin"), deleteBlog);

router.patch(
  "/updateimage/:id",
  protect,
  auth("Super-admin", "Admin"),
  validate(updateImageValidator),
  updateBlogImage
);

// Export router
export default router;
