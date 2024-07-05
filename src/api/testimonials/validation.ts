import Joi from "joi";

export const createTestimonialValidation = Joi.object({
  person_name: Joi.required(),
  position: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateTestimonialValidation = Joi.object({
  person_name: Joi.string(),
  position: Joi.string(),
  description: Joi.string(),
});

export const deleteAllTestimonialsValidation = Joi.object({
  delete_key: Joi.string().required(),
});

export const publishTestimonialValidator = Joi.object({
  is_published: Joi.boolean().required(),
});

