import { Document } from "mongoose";

export default interface IProjectDoc extends Document {
  name: string;
  client_name: string;
  description: string;
  problem: string;
  approach: string;
  time_taken: string;
  img_secure_url: string;
  img_cloudinary_public_id: string;
  is_published: boolean;
}

declare global {
  namespace ProjectRequest {
    interface ICreateProjectInput {
      name: string;
      client_name: string;
      description: string;
      problem: string;
      approach: string;
      time_taken: string;
      color: string;
      img_secure_url: string;
      img_cloudinary_public_id: string;
      is_published?: boolean;
    }
    interface IUpdateProjectInput {
      id: string;
      name?: string;
      client_name?: string;
      description?: string;
      problem?: string;
      approach?: string;
      time_taken?: string;
      color?: string;
    }
    interface IPublishProject {
      id: string;
      is_published: boolean;
    }
    interface IDeleteAllProjects {
      delete_key: string;
    }
    interface IUpdateProjectImg {
      id: string;
      img_secure_url: string;
      img_cloudinary_public_id: string;
    }
  }
}
