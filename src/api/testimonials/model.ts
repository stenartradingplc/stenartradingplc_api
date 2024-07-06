import mongoose, { Schema } from "mongoose";
import ITestimonialDoc from "./dto";

const testimonialSchema: Schema = new Schema(
  {
    person_name: {
      type: String,
      unique: true,
      required: [true, "person_name is required"],
    },
    image_url: {
      type: String,
      required: [true, "please provide the image url"],
    },
    image_key: {
      type: String,
      required: [true, "please provide the image public id value"],
    },
    position: {
      type: String,
      required: [true, "please provide the position"],
    },
    description: {
      type: String,
      required: [true, "please provide the description"],
    },
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

// Create the model
const Testimonial = mongoose.model<ITestimonialDoc>("Testimonial", testimonialSchema);

export default Testimonial;
