import { Document } from "mongoose";

export default interface IContactUsDoc extends Document {
  full_name: string;
  email?: string;
  phone_number: string;
  message: string;
  read_status: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace ContactUsRequest {
    interface ICreateContactUsInput {
      full_name: string;
      email?: string;
      phone_number: string;
      message: string;
    }
    interface IDeleteAllContactUs {
      delete_key: string;
    }
  }
}
