import Joi from "joi";

export const createContactUsValidation = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string(),
  phone_number: Joi.string().required(),
  message: Joi.string().required(),
});

export const deleteAllContactUsValidation = Joi.object({
  delete_key: Joi.string().required(),
});
