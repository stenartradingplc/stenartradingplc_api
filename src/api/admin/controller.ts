import { RequestHandler } from "express";
import AppError from "../../utils/app_error";
import Admin from "./dal";
import IAdminDoc from "./dto";
import generateToken from "../../utils/generate_token";
import generatePassword from "../../utils/generate_password";
import configs from "../../configs";
import sendEmail from "../../utils/send_email";

export const createAdminFirstAccount: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Get body
    const { first_name, last_name, email, phone_number, first_account } = <
      AdminRequest.ICreateFirstAdminInput
    >req.value;

    // Make sure to include first_account if there are no admins in the DB
    const admins = await Admin.getAllAdmins();
    if (admins.length === 0) {
      if (!first_account) {
        return next(
          new AppError(
            "First account field can not be empty since you are the first admin in the system.",
            401
          )
        );
      }
    } else if (admins.length > 0) {
      if (first_account) {
        return next(
          new AppError(
            "You can not use the first account field since there is an admin already in the system with the flag",
            401
          )
        );
      }
    }

    // Create an admin
    const newAdmin: IAdminDoc = await Admin.createFirstAdmin({
      first_name,
      last_name,
      email,
      phone_number,
      first_account,
    });

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message: "New admin account is successfully created",
      data: {
        admin: newAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create an admin
export const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { first_name, last_name, phone_number, email, role } = <
      AdminRequest.ICreateAdminInput
    >req.value;

    // Create an admin
    const newAdmin = await Admin.createAdmin({
      first_name,
      last_name,
      phone_number,
      email,
      role,
    });

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message: `${newAdmin.first_name}'s account is successfully created with ${role} role`,
      data: {
        admin: newAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin login
export const adminLogin: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { email_or_phone, password } = <AdminRequest.IAdminLogin>req.value;

    // Check if there is an admin
    const admin = await Admin.getAdminByEmailOrPhoneNumber(email_or_phone);
    if (!admin || !admin.comparePassword(password, admin.password))
      return next(
        new AppError("Invalid email / phone number or password", 401)
      );

    if(!admin.account_status)
      return next(
        new AppError("Your Account has been banned please contact the system owner", 401)
      );

    // Update email phone number changed at to false if it is true
    if (admin.email_phone_number_changed_at) {
      await Admin.updateEmailOrPhoneNumberChangedAt(admin.id);
    }

    // Generate token
    const token = generateToken({ id: admin._id, user: "admin" });

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message: "You have successfully logged in",
      data: {
        admin,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Get all admins
export const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const admins = await Admin.getAllAdmins(<RequestQuery>req.query);

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      results: admins.length,
      data: {
        admins,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single admin
export const getAdmin: RequestHandler = async (req, res, next) => {
  try {
    const admin = await Admin.getAdmin(req.params.id);
    if (!admin)
      return next(new AppError("There is no Admin with the specified ID", 404));

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update a single admin
export const updateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const admin = await Admin.getAdmin(req.params.id);
    const data = <AdminRequest.IUpdateAdminInfo>req.value;
    if (!admin)
      return next(new AppError("There is no Admin with the specified ID", 404));

    await Admin.updateAccount(req.params.id, data);

    // Respond
    res.status(201).json({
      status: "SUCCESS",
      message: "Admin information updated successfuly!"
    });

  } catch (error) {
    next(error);
  }
};

// update default password
export const updateDefaultPassword: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { default_password, password, password_confirm } = <
      AdminRequest.IUpdateDefaultPassword
    >req.value;

    // Check password
    const getAdmin = <IAdminDoc>req.user;
    if (!getAdmin.comparePassword(default_password, getAdmin.password))
      return next(new AppError("Incorrect default password", 401));

    // Update password
    const admin = await Admin.updateDefaultPassword(
      getAdmin,
      password,
      password_confirm
    );

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message:
        "You have successfully updated your default password. Please login.",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};


// forgot admin password
export const forgotAdminPassword: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { email } = <
      AdminRequest.IForgotPassword
    >req.value;

    const existingAcc = await Admin.getAdminByEmailOrPhoneNumber(email)
    if (!existingAcc)
      return next(new AppError("There is no Admin with the specified email", 404));

    const otpCode = generatePassword();

    await sendEmail(existingAcc.email, "Forgot password verification",
     otpCode);

    await Admin.updateOTP(existingAcc.id, otpCode);

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message:
        "We have sent a verification code to your email address.",
    });
  } catch (error) {
    next(error);
  }
};

// force Reset Password
export const forceResetPassword: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { email, password } = <
      AdminRequest.IForceResetPassword
    >req.value;

    const existingAcc = await Admin.getAdminByEmailOrPhoneNumber(email)
    if (!existingAcc)
      return next(new AppError("There is no Admin with the specified email", 404));

    await Admin.updateAdminPassword(existingAcc, password);

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message:
        "Your password has been updated please check your email",
    });
  } catch (error) {
    next(error);
  }
};

// forgot admin password
export const resetPasswordPassword: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const { otp, password } = <
      AdminRequest.IResetPassword
    >req.value;

    const existingOTP = await Admin.getByOTPCode(otp)
    if (!existingOTP)
      return next(new AppError("INCORRECT OTP CODE!", 400));


    // Update password
    const admin = await Admin.updateAdminPassword(
      existingOTP,
      password,
    );

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message:
        "You have updated your password succesfuly please login.",
    });
  } catch (error) {
    next(error);
  }
};

// Update admin account status
export const updateAdminAccountStatus: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // Get body
    const {account_status } = <AdminRequest.IUpdateAccountStatus>req.value;
    const id = req.params.id;
    
    // check if the admins exists
    const getAdmin = await Admin.getAdmin(id);
    if (!getAdmin)
      return next(new AppError("There is no Admin with the specified ID", 404));

    // Check if the admin id and the admin resetting id are similar
    const user = <IAdminDoc>req.user;
    if (id === user.id)
      return next(
        new AppError("You can not change the status of your own account", 401)
      );

    // Check if the admin account is first account
    if (getAdmin.first_account)
      return next(
        new AppError(
          "The default account status for the first account is Active. You can not change it.",
          401
        )
      );

    // Message
    let message: string = `Unknown status`;
    if (account_status) {
      message = `${getAdmin.first_name} ${getAdmin.last_name}'s account is successfully activated`;
    } else if (!account_status) {
      message = `${getAdmin.first_name} ${getAdmin.last_name}'s account is successfully deactivated`;
    } else {
      return next(new AppError(`Unknown account status`, 400));
    }

    // Update
    const admin = await Admin.updateAdminAccountStatus(
      getAdmin.id,
      account_status
    );

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message,
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete an admin permanently
export const deleteAdmin: RequestHandler = async (req, res, next) => {
  try {
    const admin = await Admin.deleteAdmin(req.params.id);
    if (!admin)
      return next(new AppError("There is no admin with the specified ID", 404));

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message: "Admin account is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all admins except for the first account
export const deleteAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    // Get delete key
    const { delete_key } = <AdminRequest.IDeleteAllAdmins>req.value;

    // Check the validity of the delete key
    if (configs.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 401));

    // Check if the admin deleting is the first account
    const user = <IAdminDoc>req.user;
    if (!user.first_account)
      return next(
        new AppError(
          "The administrator with the first account on the system can only delete admins",
          401
        )
      );

    // Delete all admins
    await Admin.deleteAllAdmins();

    // Respond
    res.status(200).json({
      status: "SUCCESS",
      message:
        "All admin accounts are deleted except for the first account created on the system",
    });
  } catch (error) {
    next(error);
  }
};
