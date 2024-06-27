import { Router } from "express";

const router = Router();

import {
  createAdminFirstAccount,
  adminLogin,
  getAdmin,
  updateDefaultPassword,
  createAdmin,
  forgotAdminPassword,
  updateAdminAccountStatus,
  deleteAdmin,
  deleteAllAdmins,
  getAllAdmins,
  resetPasswordPassword,
  forceResetPassword
} from "./controller";
import {
  createFirstAdminValidation,
  adminLoginValidation,
  updateDefaultPasswordValidation,
  createAdminValidation,
  forgotPasswordValidation,
  updateAdminAccountStatusValidation,
  deleteAllAdminsValidation,
  verifyPasswordValidation,
  forceResetPasswordValidation,
} from "./validation";

import validator from "../../utils/validator";

import protect from "../../auth/protect";
import bypass from "../../auth/bypass";
import auth from "../../auth/auth";

router.post("/login", validator(adminLoginValidation), adminLogin);
router.patch(
  "/defaultpassword",
  bypass,
  validator(updateDefaultPasswordValidation),
  updateDefaultPassword
);

router
  .route("/firstaccount")
  .post(validator(createFirstAdminValidation), createAdminFirstAccount);


// router.post(
//   "/forgotpassword",
//   validator(forgotPasswordValidation),
//   forgotAdminPassword
// );

// router.patch(
//   "/verifypassword",
//   validator(verifyPasswordValidation),
//   resetPasswordPassword
// );

router.post(
  "/forceresetpassword",
  validator(forceResetPasswordValidation),
  forceResetPassword
);

router
  .route("/")
  .post(
    protect,
    auth("Super-admin"),
    validator(createAdminValidation),
    createAdmin
  )
  .get(protect, auth("Super-admin", "Admin"), getAllAdmins)
  .delete(
    protect,
    auth("Super-admin"),
    validator(deleteAllAdminsValidation),
    deleteAllAdmins
  );

router.patch(
  "/status/:id",
  protect,
  auth("Super-admin"),
  validator(updateAdminAccountStatusValidation),
  updateAdminAccountStatus
);

  
router
  .route("/:id")
  .get(protect, auth("Super-admin", "Admin"), getAdmin)
  .patch(protect, auth("Super-admin", "Admin"), getAdmin)
  .delete(protect, auth("Super-admin"), deleteAdmin);

export default router;
