import Joi from "joi";

export const createProjectValidator = Joi.object({
  name: Joi.string().required(),
  client_name: Joi.string().required(),
  description: Joi.string().required(),
  problem: Joi.string().required(),
  approach: Joi.string().required(),
  time_taken: Joi.string().required(),
  color: Joi.string(),
  img_secure_url: Joi.string().required(),
  img_cloudinary_public_id: Joi.string().required(),
  is_published: Joi.boolean(),
});

export const updateProjectValidator = Joi.object({
  name: Joi.string(),
  client_name: Joi.string(),
  description: Joi.string(),
  problem: Joi.string(),
  approach: Joi.string(),
  time_taken: Joi.string(),
  color: Joi.string(),
});

export const publishProjectValidator = Joi.object({
  id: Joi.string().required(),
  is_published: Joi.boolean().required(),
});

export const deleteAllProjectsValidator = Joi.object({
  delete_key: Joi.string().required(),
});

export const updateImgValidator = Joi.object({
  id: Joi.string().required(),
  img_secure_url: Joi.string().required(),
  img_cloudinary_public_id: Joi.string().required(),
});
