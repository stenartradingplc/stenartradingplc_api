import mongoose, { Schema } from "mongoose";
import IApplicantDoc from "./dto";
import validator from "validator";

// Create the schema
const applicantSchema: Schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      requried: [true, "First name is required"],
    },
    last_name: {
      type: String,
      requried: [true, "Last name is required"],
    },
    email: {
      type: String,
      validate: {
        validator: () => {
          validator.isEmail;
        },
        message: "Invalid email address",
      },
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is requried"],
    },
    field_of_study: {
      type: String,
      requried: [true, "Field of study is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience (in years) is required"],
    },
    education_level: {
      type: String,
      required: [true, "Highest level of education achieved is required"],
      enum: {
        values: [
          "Primary School",
          "High School",
          "TVET",
          "Diploma",
          "Bachelors Degree",
          "Masters Degree",
          "PhD",
          "Others",
        ],
        message: "Unknown education level selected",
      },
    },
    cv_secure_url: {
      type: String,
      required: [true, "CV's secure url is required"],
    },
    cv_cloudinary_public_id: {
      type: String,
      required: [true, "CV's cloudinary public id is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    job_applied: {
      type: mongoose.Types.ObjectId,
      ref: "Careers",
    },
    status: {
      type: String,
      default: "Pending",
      enum: {
        values: ["Pending", "Screened", "Rejected", "Hired"],
      },
      message: "Unknown status selected",
    },
    status_updated_by: {
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

// Populate selected fields from "careers"
applicantSchema.pre(/^find/, function (this: IApplicantDoc, next) {
  this.populate({
    path: "job_applied",
    select: "title description experience employement_type",
  });
  next();
});

// Populate selected fields from "admins"
applicantSchema.pre(
  ["find", "findOne", "findOneAndUpdate"],
  function (this: IApplicantDoc, next) {
    this.populate({
      path: "status_updated_by",
      select: "first_name last_name",
    });
    next();
  }
);

// Create the model from the above schema with a type of "IApplicantDoc"
const Applicant = mongoose.model<IApplicantDoc>("Applicant", applicantSchema);

export default Applicant; // Export the applicant model
