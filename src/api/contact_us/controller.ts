import { RequestHandler } from "express";
import ContactUs from "./dal";
import AppError from "../../utils/app_error";
import configs from "../../configs";

// Create contact-us
export const createContactUs: RequestHandler = async (req, res, next) => {
  try {
    // Request body
    const contactUsData = <ContactUsRequest.ICreateContactUsInput>req.value;

    // Insert Contact us fields
    const contactUs = await ContactUs.createContactUs(contactUsData);

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "Message sent. We will contact you ASAP. Thank you",
      data: {
        contactUs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Find all
export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const contactUs = await ContactUs.getAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: contactUs.length,
      data: {
        contactUs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Find contact Us by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    //get the current admin name
    const admin = <AdminRequest.ICurrentAdmin>req.user;

    const firstReadBy = admin.first_name + " " + admin.last_name;

    await ContactUs.checkAndUpdateReadStatus(firstReadBy, req.params.id);

    // Find and check if it exists
    const contactUs = await ContactUs.getById(req.params.id);
    if (!contactUs) return next(new AppError("contact us not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: {
        contactUs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact-us
export const deleteContactUs: RequestHandler = async (req, res, next) => {
  try {
    // Check if contact-us content exists
    const contactUs = await ContactUs.getById(req.params.id);
    if (!contactUs) return next(new AppError("ContactUs not found", 404));

    // Delete the ContactUs
    await ContactUs.deleteContactUs(req.params.id);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Contact us deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact-us
export const deleteAllContactUs: RequestHandler = async (req, res, next) => {
  try {
    // Get delete key
    const { delete_key } = <ContactUsRequest.IDeleteAllContactUs>req.value;

    // Check the validity of the delete key
    if (configs.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 401));

    // Delete the ContactUs
    await ContactUs.removeAllContactUs();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Contact us deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
