import mongoose, { Schema } from "mongoose";
import IBlogDoc from "./dto";

const blogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Content is required"],
      minlength: [10, "Content must have at least 10 characters"],
      maxlength: [500, "Content must have less than 500 characters"],
    },
    image_url: {
      type: String,
      required: [true, "please provide the image url"],
    },
    image_key: {
      type: String,
      required: [true, "please provide the image public id value"],
    },
    content: {
      type: String,
      required: [true, "please provide the content section"],
    },
    slug_title: {
      type: String,
      required: [true, "please provide the slugified title"],
      unique: true,
    },
    is_published: {
      type: String,
      default: false,
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
const Blog = mongoose.model<IBlogDoc>("Blog", blogSchema);

export default Blog;
