import { Document } from "mongoose";

export default interface IEventDoc extends Document {
  title: string;
  content: string;
  event_date: string;
  event_location: string;
  is_published: boolean;
  image_url: string;
  image_key: string;
  youtube_link: string;
}

declare global {
  namespace EventRequest {
    interface ICreateEventInput {
      title: string;
      content: string;
      event_date: Date;
      event_location: string;
      is_published: boolean;
      image_url: string;
      image_key: string;
      youtube_link: string;
    }

    interface IUpdateEventInput {
      id: string;
      title?: string;
      content?: string;
      event_date?: Date;
      event_location?: string;
      image_url?: string;
      image_key?: string;
      youtube_link?: string;
    }

    interface IUpdateIsPublished {
      id: string;
      is_published: boolean;
    }
    interface IDeleteAllEvents {
      delete_key: string;
    }
    interface IUpdateImage {
      image_url: string;
      image_key: string;
    }
  }
}
