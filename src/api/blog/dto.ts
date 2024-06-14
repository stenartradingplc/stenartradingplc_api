import { Document } from "mongoose";

export default interface IBlogDoc extends Document {
  title: string;
  image_url: string;
  image_key: string;
  content: string;
  slug_title: string;
  is_published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace BlogRequest {
    interface ICreateBlogInput {
      title: string;
      content: string;
      slug_title?: string;
      is_published?: boolean;
      image_url: string;
      image_key: string;
    }

    interface IUpdateBlogInput {
      title?: string;
      content?: string;
    }

    interface IDeleteAllBlogInput {
      delete_key: string;
    }

    interface IUpdateImage {
      image_url: string;
      image_key: string;
    }
    interface IPublishBlog {
      id: string;
      is_published: string;
    }
  }
}
