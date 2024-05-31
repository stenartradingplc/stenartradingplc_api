import Careers from "./dal";
import { RequestHandler } from "express";
import AppError from "../../utils/app_error";
import configs from "../../configs";

// Create a create
export const createCareer: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <CareerRequest.ICreateCareerInput>req.value;

    const career = await Careers.createCareer(data); // Create career

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "New vacant position created successfully",
      data: { career },
    });
  } catch (error) {
    next(error);
  }
};

// Get all vacant positions
export const getAllCareers: RequestHandler = async (req, res, next) => {
  try {
    const careers = await Careers.getAllCareers(<RequestQuery>req.query);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: careers.length,
      data: { careers },
    });
  } catch (error) {
    next(error);
  }
};

// Get a career
export const getCareer: RequestHandler = async (req, res, next) => {
  try {
    const career = await Careers.getCareer(req.params.id);
    if (!career) return next(new AppError("Career not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: career,
    });
  } catch (error) {
    next(error);
  }
};

// Update a career
export const updateCareer: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <CareerRequest.IUpdateCareerInput>req.body;
    data.id = req.params.id;

    // Update career. If the method returns null, throw error
    const career = await Careers.updateCareer(data);
    if (!career) return next(new AppError("Career does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Career detail updated successfully",
      data: { career },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a career
export const deleteCareer: RequestHandler = async (req, res, next) => {
  try {
    const career = await Careers.deleteCareer(req.params.id);
    if (!career) return next(new AppError("Career does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Career deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all careers
export const deleteAllCareers: RequestHandler = async (req, res, next) => {
  try {
    // Delete key
    const { delete_key } = <CareerRequest.IDeleteAllCareers>req.value;
    if (configs.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 400));

    // Delete all careers
    await Careers.deleteAllCareers();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All careers have been deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};

// Update employment type
export const updateEmploymentType: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <CareerRequest.IUpdateEmployementType>req.value;

    const career = await Careers.updateEmploymentType(data);
    if (!career) return next(new AppError("Career does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Employment type updated successfully",
      data: { career },
    });
  } catch (error) {
    next(error);
  }
};

// Publish a career/vacancy post
export const updateIsPublished: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <CareerRequest.IUpdateIsPublished>req.value;

    // Update career and check if it exists
    const career = await Careers.updateIsPublished(data);
    if (!career) return next(new AppError("Career does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Career published successfully",
      data: { career },
    });
  } catch (error) {
    next(error);
  }
};

// Update career/vacancy status
export const updateVacancyStatus: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <CareerRequest.IUpdateVacancyStatus>req.value;

    // Update vacancy status. Throw error if career does not exist
    const career = await Careers.updateVacancyStatus(data);
    if (!career) return next(new AppError("Career does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Vacancy status updated successfully",
      data: { career },
    });
  } catch (error) {
    next(error);
  }
};

// Get all applicant of one job
export const getAllApplicants: RequestHandler = async (req, res, next) => {
  try {
    // Check career exists
    if (!(await Careers.getCareer(req.params.id))) {
      return next(new AppError("Career does not exist", 400));
    }

    // Find applicants
    const applicants = await Careers.getApplicantsOfACareer(req.params.id);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: applicants.length,
      data: applicants,
    });
  } catch (error) {
    next(error);
  }
};

// Get published careers
export const getPublishedCareers: RequestHandler = async (req, res, next) => {
  try {
    const publishedCareers = await Careers.getPublishedCareers();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: publishedCareers.length,
      data: { publishedCareers },
    });
  } catch (error) {
    next(error);
  }
};

// Get drafted careers
export const getDraftedCareers: RequestHandler = async (req, res, next) => {
  try {
    const draftedCareers = await Careers.getDraftedCareers();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: draftedCareers.length,
      data: { draftedCareers },
    });
  } catch (error) {
    next(error);
  }
};
