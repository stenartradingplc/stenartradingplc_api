import Joi from "joi";

export const createBlogValidation = Joi.object({
  title: Joi.required(),
  content_section_one: Joi.string().required(),
  is_published: Joi.boolean(),
  image_url: Joi.string().required(),
  image_public_id: Joi.string().required(),
});

export const updateBlogValidation = Joi.object({
  title: Joi.optional(),
  content_section_one: Joi.optional(),
});

export const deleteAllBlogsValidation = Joi.object({
  delete_key: Joi.string().required(),
});

export const publishBlogValidator = Joi.object({
  id: Joi.string(),
  is_published: Joi.boolean().required(),
});

export const updateImageValidator = Joi.object({
  image_url: Joi.string().required(),
  image_public_id: Joi.string().required(),
});
