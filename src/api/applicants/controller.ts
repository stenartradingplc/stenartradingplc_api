import Applicant from "./dal";
import { RequestHandler } from "express";
import AppError from "../../utils/app_error";
import configs from "../../configs";

// Create applicant
export const createApplicant: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <ApplicantRequest.ICreateApplicantInput>req.value;

    const applicant = await Applicant.createApplicant(data);

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "Application submitted successfully",
      data: { applicant },
    });
  } catch (error) {
    next(error);
  }
};

// Get all applicants in the system
export const getAllApplicants: RequestHandler = async (req, res, next) => {
  try {
    const applicants = await Applicant.getAllApplicants();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: applicants.length,
      data: { applicants },
    });
  } catch (error) {
    next(error);
  }
};

// Get an applicant
export const getApplicant: RequestHandler = async (req, res, next) => {
  try {
    // Find applicant
    const applicant = await Applicant.getApplicant(req.params.id);
    if (!applicant) return next(new AppError("Applicant not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { applicant },
    });
  } catch (error) {
    next(error);
  }
};

// Update applicant data
export const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <ApplicantRequest.IUpdateStatusInput>req.value;

    // Logged in admin
    const loggedInAdmin = <AdminRequest.ICurrentAdmin>req.user;
    data.status_updated_by = loggedInAdmin.id; // Add admin id to "data"

    // Update applicant. If it returns null, throw error
    const applicant = await Applicant.updateApplicantStatus(data);
    if (!applicant) return next(new AppError("Applicant does not exist", 400));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Applicant data updated successfully",
      data: { applicant },
    });
  } catch (error) {
    next(error);
  }
};

// Delete applicant data
export const deleteApplicant: RequestHandler = async (req, res, next) => {
  try {
    // Delete applicant.
    const applicant = await Applicant.deleteApplicant(req.params.id);
    if (!applicant) return next(new AppError("Applicant does  not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Applicant data deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all applicants
export const deleteAllApplicants: RequestHandler = async (req, res, next) => {
  try {
    // Delete key from request body
    const { delete_key } = <ApplicantRequest.IDeleteAllApplicants>req.value;

    // Check delete_key matches with the one in configs
    if (configs.delete_key !== delete_key) {
      return next(new AppError("Invalid delete key", 400));
    }

    // Delete all applicants
    await Applicant.deleteAllApplicants(delete_key);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All applicant data has is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
