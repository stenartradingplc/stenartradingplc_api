import EventModel from "./model";
import IEventDoc from "./dto";
import APIFeatures from "../../utils/api_features";

export default class Event {
  // Create event
  static async createEvent(
    data: EventRequest.ICreateEventInput
  ): Promise<IEventDoc> {
    try {
      // Create event data
      const event = await EventModel.create({
        title: data.title,
        content: data.content,
        event_date: data.event_date,
        event_location: data.event_location,
        is_published: data.is_published,
        image_url: data.image_url,
        image_key: data.image_key,
        youtube_link: data.youtube_link,
      });

      // Return the newly create event
      return event;
    } catch (error) {
      throw error;
    }
  }

  // Get all events
  static async getEvents(query?: RequestQuery): Promise<IEventDoc[]> {
    try {
      const apiFatures = new APIFeatures<IEventDoc>(EventModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .project();

      const events = await apiFatures.dbQuery;
      return events;
    } catch (error) {
      throw error;
    }
  }

  // Get an event
  static async getEvent(id: string): Promise<IEventDoc | null> {
    try {
      // Find event and if it exists, return it. Else return null
      const event = await EventModel.findById(id);
      if (event) return event;

      return null; // Return null if no event found.
    } catch (error) {
      throw error;
    }
  }

  // Delete an event
  static async deleteEvent(id: string): Promise<IEventDoc | null> {
    try {
      // Find event and if it exists, delete it
      const event = await EventModel.findByIdAndDelete(id);
      if (event) return event;

      return null; // Return null if event does not exist
    } catch (error) {
      throw error;
    }
  }

  // Update an event
  static async updateEvent(
    data: EventRequest.IUpdateEventInput
  ): Promise<IEventDoc | null> {
    try {
      // Find event and if it exists, update and return it. Else return null
      const event = await EventModel.findByIdAndUpdate(
        data.id,
        {
          title: data.title,
          content: data.content,
          event_date: data.event_date,
          event_location: data.event_location,
          image_url: data.image_url,
          im_cloudinary_public_id: data.image_key,
          youtube_link: data.youtube_link,
        },
        { runValidators: true, new: true }
      );

      return event;
    } catch (error) {
      throw error;
    }
  }

  // Update is_publish
  static async updateIsPublished(
    data: EventRequest.IUpdateIsPublished
  ): Promise<IEventDoc | null> {
    try {
      // Find and update event. If it exists, return the updated data. Else return null
      const event = await EventModel.findByIdAndUpdate(
        data.id,
        {
          is_published: data.is_published,
        },
        { runValidators: true, new: true }
      );

      return event;
    } catch (error) {
      throw error;
    }
  }

  // Get published events
  static async getPublishedEvents(): Promise<IEventDoc[]> {
    try {
      const events = await EventModel.find({ is_published: true });
      return events;
    } catch (error) {
      throw error;
    }
  }

  // Delete all events
  static async deleteAllEvents() {
    try {
      await EventModel.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Update image
  static async updateImage(id: string, data: EventRequest.IUpdateImage) {
    try {
      const event = await EventModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      return event;
    } catch (error) {
      throw error;
    }
  }
}
