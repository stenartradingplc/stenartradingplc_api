import { RequestHandler } from "express";
import Testimonial from "./dal";
import AppError from "../../utils/app_error";
import cloudinary from "../../utils/cloudinary";
import configs from "../../configs";
import slugifer from "../../utils/slugfier";

// Create testimonial
export const createTestimonial: RequestHandler = async (req, res, next) => {
  try {
    // Request body
    const testimonialContents = <TestimonialRequest.ICreateTestimonialInput>req.value;

    const image: any = req.file;
    if (!image) {
      return next(new AppError("Please upload testimonial image.", 400));
    }

    await cloudinary.uploader.upload(image?.path).then((response: any) => {
      testimonialContents.image_url = response.secure_url;
      testimonialContents.image_key = response.public_id;
    });

    // Insert testimonial content
    const testimonial = await Testimonial.createTestimonial(testimonialContents);

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "New Testimonial created successfully",
      data: {
        testimonial,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Find all
export const getAllTestimonials: RequestHandler = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.getAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: testimonials.length,
      data: {
        testimonials,
      },
    });
  } catch (error) {
    next(error);
  }
};


// Find by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    // Find testimonial and check if it exists
    const testimonial = await Testimonial.getById(req.params.id);
    if (!testimonial) return next(new AppError("Testimonial not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: {
        testimonial,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update testimonial
export const updateTestimonial: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <TestimonialRequest.IUpdateTestimonialInput>req.value;
    const id: string = req.params.id;

    // Update testimonial. Also check if the dal method returns null
    const testimonial = await Testimonial.updateTestimonial(id, data);
    if (!testimonial) return next(new AppError("Testimonial not found", 404));

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "Testimonial updated successfully",
      data: { testimonial },
    });
  } catch (error) {
    next(error);
  }
};


// Update testimonial Image
export const updateTestimonialImage: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;

    const data = <TestimonialRequest.IUpdateImage> {image_key:"", image_url:""};

    const testimonial = await Testimonial.getById(id);

    if (!testimonial) {
      return next(
        new AppError("No testimonial found with the provided testimonial id!", 404)
      );
    }

    
    const image: any = req.file;
    if (!image) {
      return next(new AppError("Please upload testimonial image.", 400));
    }

    await cloudinary.uploader.upload(image?.path).then((response: any) => {
      data.image_url = response.secure_url;
      data.image_key = response.public_id;
    });


    await cloudinary.uploader.destroy(testimonial.image_key);

    // Update testimonial. Also check if the dal method returns null
    const updatedTestimonial = await Testimonial.updateTestimonialImage(testimonial, data);

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "Testimonial updated successfully",
      data: { testimonial: updatedTestimonial },
    });
  } catch (error) {
    next(error);
  }
};

// Delete testimonial
export const deleteTestimonial: RequestHandler = async (req, res, next) => {
  try {
    // Check if testimonial content exists
    const testimonial = await Testimonial.getById(req.params.id);
    if (!testimonial) return next(new AppError("Testimonial not found", 404));

    if(testimonial.image_key)
      await cloudinary.uploader.destroy(testimonial.image_key);

    // Delete the testimonial
    await Testimonial.deleteTestimonial(req.params.id);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete testimonial
export const removeAllTestimonial: RequestHandler = async (req, res, next) => {
  try {
    // Get delete key
    const { delete_key } = <TestimonialRequest.IDeleteAllTestimonialInput>req.value;

    // Check the validity of the delete key
    if (configs.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 401));

    const testimonials = await Testimonial.getAll();

    testimonials.forEach(async (testimonial: any)=>{
      await cloudinary.uploader.destroy(testimonial.image_key);
    })

    // Delete all of the Testimonials
    await Testimonial.removeAllTestimonials();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All Testimonials deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
