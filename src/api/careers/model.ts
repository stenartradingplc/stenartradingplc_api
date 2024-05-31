import ICareersDoc from "./dto";
import mongoose, { Schema, mongo } from "mongoose";

const careersSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      minlength: [5, "Title must have at least 5 characters"],
      maxlength: [250, "Title can have a maximum of 250 characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      minlength: [3, "Description must have at least 3 characters"],
      maxlength: [1000, "Description can have a maximum of 250 characters"],
    },
    experience: {
      type: String,
      required: [true, "Experience level is required"],
      minlength: [3, "Experience must have at least 3 characters"],
      maxlength: [250, "Experience can have a maximum of 1000 characters"],
    },
    employement_type: {
      type: String,
      required: [true, "Employment type is required"],
      enum: {
        values: [
          "Full-time",
          "Part-time",
          "Contractual",
          "Unpaid-internship",
          "Paid-internship",
          "Intership",
        ],
        message: "Unknown employment type selected",
      },
    },
    responsibilities: {
      type: String,
      required: [true, "Responsibility of the employee is required"],
    },
    qualifications: {
      type: String,
      required: [
        true,
        "Qualifications the applicant should possess are required",
      ],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      enum: {
        values: ["On-site", "Remote", "Hybrid"],
      },
    },
    salary: Number,
    deadline: Date,
    quantity: Number,
    is_published: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Active",
      enum: {
        values: ["Active", "Closed", "Filled"],
        message: "Unknown status of vacant position selected",
      },
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
    },
    updated_by: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
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

// Populate selected field of admin
careersSchema.pre(/^find/, function (this: ICareersDoc, next) {
  this.populate({
    path: "created_by",
    select: "first_name last_name role",
  });
  next();
});

careersSchema.pre(/^find/, function (this: ICareersDoc, next) {
  this.populate({
    path: "updated_by",
    select: "first_name last_name role",
  });
  next();
});

// Create the model from ICareersDoc
const Careers = mongoose.model<ICareersDoc>("Careers", careersSchema);

export default Careers; // Export the model
