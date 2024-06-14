import Joi from "joi";

export const createBlogValidation = Joi.object({
  title: Joi.required(),
  content: Joi.string().required(),
  is_published: Joi.boolean()
});

export const updateBlogValidation = Joi.object({
  title: Joi.optional(),
  content: Joi.optional(),
});

export const deleteAllBlogsValidation = Joi.object({
  delete_key: Joi.string().required(),
});

export const publishBlogValidator = Joi.object({
  is_published: Joi.boolean().required(),
});

