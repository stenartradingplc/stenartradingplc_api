import Joi, { string } from "joi";

export const createFirstAdminValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  first_account: Joi.boolean(),
});

export const createAdminValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  role: Joi.required(),
});

export const adminLoginValidation = Joi.object({
  email_or_phone: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateDefaultPasswordValidation = Joi.object({
  default_password: Joi.string().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().equal(Joi.ref("password")).required(),
});

export const updateEmailOrPhoneNumberValidation = Joi.object({
  phone_number: Joi.string().required(),
  email: Joi.string().required(),
});

export const updateAdminRoleValidation = Joi.object({
  id: Joi.required(),
  role: Joi.required(),
});

export const updateAdminPasswordValidation = Joi.object({
  current_password: Joi.string().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().equal(Joi.ref("password")).required(),
});

export const resetAdminPasswordValidation = Joi.object({
  id: Joi.required(),
});

export const updateAdminAccountStatusValidation = Joi.object({
  id: Joi.required(),
  account_status: Joi.required(),
});

export const deleteAllAdminsValidation = Joi.object({
  delete_key: Joi.string(),
});
