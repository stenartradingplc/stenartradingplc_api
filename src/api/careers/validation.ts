import Joi, { string } from "joi";

export const createCareersValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  responsibilities: Joi.string().required(),
  employement_type: Joi.string().required(),
  experience: Joi.string().required(),
  qualifications: Joi.string().required(),
  location: Joi.string().required(),
  salary: Joi.number(),
  deadline: Joi.date(),
  is_published: Joi.boolean(),
  status: Joi.string(),
  quantity: Joi.number().required(),
});

export const updateCareerValidator = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  experience: Joi.string(),
  responsibilities: Joi.string(),
  qualifications: Joi.string(),
  location: Joi.string(),
  salary: Joi.number(),
  quantity: Joi.number(),
  deadline: Joi.date(),
  employement_type: Joi.string(),
});

// Validates the api that updates the career's employement type
export const updateEmploymentTypeValidator = Joi.object({
  id: Joi.string().required(),
  employement_type: Joi.string().required(),
});

// Validates the api that updates "is_publish"
export const updateIs_Published_Validator = Joi.object({
  id: Joi.string().required(),
  is_published: Joi.boolean().required(),
});

// Validates the api that updates "vacancy_status"
export const updateVacStatusValidator = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});

export const deleteAllCareersValidator = Joi.object({
  delete_key: Joi.string().required(),
});
