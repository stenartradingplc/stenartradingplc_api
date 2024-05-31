import mongoose, { Schema } from "mongoose";
import IProjectDoc from "./dto";

const projectSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      minlength: [3, "Name must have at least 3 characters"],
    },
    client_name: {
      type: String,
      require: [true, "Client name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description must have at least 1000 characters"],
    },
    problem: {
      type: String,
      reqiured: [true, "Problem scope hast to be stated"],
      minlength: [3, "Problem must have at least 3 characters"],
      maxlength: [1000, "Problem can not contain more than 1000 characters"],
    },
    approach: {
      type: String,
      required: [
        true,
        "Please add technical approach you used to solve the problem",
      ],
    },
    time_taken: {
      type: String,
      required: [true, "Please add amount of time the project took to finish"],
    },
    color: String,
    img_secure_url: String,
    img_cloudinary_public_id: String,
    is_published: {
      type: Boolean,
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
const Project = mongoose.model<IProjectDoc>("Projects", projectSchema);

export default Project; // Export the model
