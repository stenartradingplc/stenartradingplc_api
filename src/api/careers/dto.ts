import { Document } from "mongoose";

export default interface ICareersDoc extends Document {
  title: string;
  description: string;
  experience: string;
  employement_type: string;
  responsibilities: string;
  qualifications: string;
  location: string;
  salary: number;
  quantity: number;
  deadline: Date;
  is_published: boolean;
  status: string;
}

declare global {
  namespace CareerRequest {
    interface ICreateCareerInput {
      title: string;
      description: string;
      experience: string;
      employement_type: string;
      responsibilities: string;
      qualifications: string;
      location: string;
      salary: number;
      quantity: number;
      deadline: Date;
      is_published: boolean;
      status: string;
    }
    interface IUpdateCareerInput {
      id: string;
      title?: string;
      description?: string;
      experience?: string;
      responsibilities?: string;
      qualifications?: string;
      location?: string;
      salary?: number;
      quantity?: number;
      deadline?: Date;
    }
    interface IUpdateEmployementType {
      id: string;
      employement_type: string;
    }
    interface IUpdateIsPublished {
      id: string;
      is_published: string;
    }
    interface IUpdateVacancyStatus {
      id: string;
      status?: string;
    }
    interface IDeleteAllCareers {
      delete_key: string;
    }
  }
}
