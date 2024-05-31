import Joi, { string } from "joi";

export const createEventValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  event_date: Joi.string(),
  event_location: Joi.string(),
  is_published: Joi.boolean(),
  img: Joi.string(),
  img_cloudinary_public_id: Joi.string(),
  youtube_link: Joi.string(),
});

export const updateEventValidation = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  event_date: Joi.string(),
  event_location: Joi.string(),
  img: Joi.string(),
  img_cloudinary_public_id: Joi.string(),
  youtube_link: Joi.string(),
});

export const updateIsPublishedValidator = Joi.object({
  id: Joi.string().required(),
  is_published: Joi.boolean().required(),
});

export const deleteAllValidator = Joi.object({
  delete_key: Joi.string().required(),
});

export const updateImageValidator = Joi.object({
  img: Joi.string().required(),
  img_cloudinary_public_id: Joi.string().required(),
});
