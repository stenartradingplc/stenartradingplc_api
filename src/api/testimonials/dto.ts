import { Document } from "mongoose";

export default interface ITestimonialDoc extends Document {
  person_name: string;
  image_url: string;
  image_key: string;
  position: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace TestimonialRequest {
    interface ICreateTestimonialInput {
      person_name: string;
      image_url: string;
      image_key: string;
      position: string;
      description: string;
    }

    interface IUpdateTestimonialInput {
      person_name: string;
      position: string;
      description: string;
    }

    interface IDeleteAllTestimonialInput {
      delete_key: string;
    }

    interface IUpdateImage {
      image_url: string;
      image_key: string;
    }
  }
}
