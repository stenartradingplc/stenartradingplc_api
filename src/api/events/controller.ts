import Event from "./dal";
import AppError from "../../utils/app_error";
import { RequestHandler } from "express";
import configs from "../../configs";
import cloudinaryConfig from "../../utils/cloudinary";
import cloudinary from "../../utils/cloudinary";

// Create event
export const createEvent: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <EventRequest.ICreateEventInput>req.value;

    const image: any = req.file;
    if (!image) {
      return next(new AppError("Please upload event image.", 400));
    }

      await cloudinary.uploader.upload(image?.path).then((response: any) => {
            data.image_url = response.secure_url;
            data.image_key = response.public_id;
      });

    const event = await Event.createEvent(data); // Create event

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "New event created successfully",
      data: { event },
    });
  } catch (error) {
    next(error);
  }
};

// Get all events
export const getAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await Event.getEvents(<RequestQuery>req.query);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: events.length,
      data: { events },
    });
  } catch (error) {
    next(error);
  }
};

// Get an event
export const getEvent: RequestHandler = async (req, res, next) => {
  try {
    // Find event by id and check if it exists
    const event = await Event.getEvent(req.params.id);
    if (!event) return next(new AppError("Event not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { event },
    });
  } catch (error) {
    next(error);
  }
};

// Delete an event
export const deleteEvent: RequestHandler = async (req, res, next) => {
  try {
    // Delete event. Check if it existed before it was being deleted
    const event = await Event.deleteEvent(req.params.id);

    if (!event) return next(new AppError("Event not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update an event
export const updateEventDetail: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <EventRequest.IUpdateEventInput>req.value;
    data.id = req.params.id; // Add id from the request params to "data"

    // Update event detail
    const event = await Event.updateEvent(data);
    if (!event) return next(new AppError("Event does not exist", 400));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Event updated successfully",
      data: { event },
    });
  } catch (error) {
    next(error);
  }
};

// Publish event
export const publishEvent: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <EventRequest.IUpdateIsPublished>req.value;

    // Update event. If method returns null, throw error
    const event = await Event.updateIsPublished(data);
    if (!event) return next(new AppError("Event does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Event published",
      data: { event },
    });
  } catch (error) {
    next(error);
  }
};

// Get all published events
export const getPublishedEvents: RequestHandler = async (req, res, next) => {
  try {
    const publishedEvents = await Event.getPublishedEvents();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: publishedEvents.length,
      data: { publishedEvents },
    });
  } catch (error) {
    next(error);
  }
};


// Delete all events
export const deleteAllEvents: RequestHandler = async (req, res, next) => {
  try {
    // Delete key
    const { delete_key } = <EventRequest.IDeleteAllEvents>req.value;

    // Check delete key
    if (configs.delete_key !== delete_key) {
      return next(new AppError("Invalid delete key", 400));
    }

    // Delete events
    await Event.deleteAllEvents();

    // Response
    res.status(200).json({
      status: "Success",
      message: "All events deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Update image
export const updateImage: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <EventRequest.IUpdateImage>req.value;
    const id = req.params.id;

    const event = await Event.getEvent(id);
    if(!event){
      return next(new AppError("No event found.", 404));
    }

    const image: any = req.file;
    if (!image) {
      return next(new AppError("Please upload event image.", 400));
    }

    await cloudinary.uploader.upload(image?.path).then((response: any) => {
      data.image_url = response.secure_url;
      data.image_key = response.public_id;
    });

    // Update event image
    const updatedEvent = await Event.updateImage(req.params.id, data);

    // Delete old image
    await cloudinaryConfig.uploader.destroy(event.image_key);

    // Response
    res.status(200).json({
      status: "Success",
      message: "Event image updated successfully",
      data: { event: updatedEvent },
    });
  } catch (error) {
    next(error);
  }
};
