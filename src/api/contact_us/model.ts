import mongoose, { Schema } from "mongoose";
import IContactUsDoc from "./dto";
import validator from "validator";

const ContactUsSchema: Schema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "first name is required"],
      min: [3, "first name must have at least 3 characters"],
      max: [50, "first name must have less than 50 characters"],
    },
    message: {
      type: String,
      min: [10, "last name must have at least 3 characters"],
      max: [500, "last name must have less than 50 characters"],
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
      required: [true, "Phone number is required"],
      maxlength: [20, "Phone number can not exceed 20 characters"],
      minlength: [10, "Phone number can not be less than 10 characters"],
    },
    read_status: {
      type: String,
      default: "New",
      enum: {
        values: ["New", "Old"],
        message: "Invalid Read Status",
      },
    }
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
const ContactUs = mongoose.model<IContactUsDoc>("ContactUs", ContactUsSchema);

export default ContactUs;
