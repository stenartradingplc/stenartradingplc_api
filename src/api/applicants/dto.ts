import { Document } from "mongoose";

export default interface IApplicantDoc extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  field_of_strudy: string;
  experience: number;
  education_level: string;
  cv_secure_url: string;
  cv_cloudinary_public_id: string;
  address: string;
  job_applied: string;
  status: boolean;
}

declare global {
  namespace ApplicantRequest {
    interface ICreateApplicantInput {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      field_of_strudy: string;
      experience: number;
      education_level: string;
      cv_secure_url: string;
      cv_cloudinary_public_id: string;
      address: string;
      job_applied: string;
      status?: boolean;
      status_updated_by: string;
    }
    interface IUpdateStatusInput {
      id: string;
      status: string;
      status_updated_by: string;
    }
    interface IDeleteAllApplicants {
      delete_key: string;
    }
  }
}
