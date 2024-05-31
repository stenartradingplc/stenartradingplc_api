import IEventDoc from "./dto";
import mongoose, { Schema } from "mongoose";

const eventSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      min: [1, "Title must contain at least one character"],
      max: [100, "Title can not contain more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      min: [10, "Content mut contain at least 10 characters"],
    },
    event_date: Date,
    event_location: String,
    is_published: {
      type: Boolean,
      default: false,
    },
    img: String,
    img_cloudinary_public_id: String,
    youtube_link: String,
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Create the model with a generic type of "IEventDoc"
const Event = mongoose.model<IEventDoc>("Event", eventSchema);

export default Event;
