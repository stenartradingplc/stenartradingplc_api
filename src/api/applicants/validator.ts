import Joi from "joi";

export const createApplicantValidator = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
  field_of_study: Joi.string().required(),
  experience: Joi.number().required(),
  education_level: Joi.string().required(),
  cv_secure_url: Joi.string().required(),
  cv_cloudinary_public_id: Joi.string().required(),
  address: Joi.string().required(),
  job_applied: Joi.string().required(),
  status: Joi.boolean(),
});

export const updateStatusValidator = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});

export const deleteAllApllicantsValidator = Joi.object({
  delete_key: Joi.string().required(),
});
