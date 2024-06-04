import BlogModel from "./model";
import IBlogDoc from "./dto";

// Data access layer for blog data
export default class Blog {
  // Create blog content
  static async createBlog(
    data: BlogRequest.ICreateBlogInput
  ): Promise<IBlogDoc> {
    try {
      const blog = await BlogModel.create(data);

      // Return create blog
      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Get all blogs
  static async getAll(): Promise<IBlogDoc[]> {
    try {
      const blog = await BlogModel.find();
      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Get all published blogs
  static async getAllPublished(): Promise<IBlogDoc[]> {
    try {
      const blog = await BlogModel.find({ is_published: true });
      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Find by id
  static async getById(id: string): Promise<IBlogDoc | null> {
    try {
      const blog = await BlogModel.findById(id);
      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Find by id
  static async getBySlugTitle(slug_title: string): Promise<IBlogDoc | null> {
    try {
      const blog = await BlogModel.findOne({ slug_title });
      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Update blog
  static async updateBlog(
    id: string,
    data: BlogRequest.IUpdateBlogInput
  ): Promise<IBlogDoc | null> {
    try {
      const blog = await BlogModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Publish blog
  static async publishBlog(
    data: BlogRequest.IPublishBlog
  ): Promise<IBlogDoc | null> {
    try {
      const blog = BlogModel.findByIdAndUpdate(
        data.id,
        { is_published: data.is_published },
        { new: true }
      );
      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Update status
  static async updateBlogImage(
    blog: IBlogDoc,
    newImageData: { image_url: string; image_public_id: string }
  ): Promise<IBlogDoc> {
    try {
      blog.image_url = newImageData.image_url;
      blog.image_public_id = newImageData.image_public_id;
      await blog.save();
      return blog;
    } catch (error) {
      throw error;
    }
  }

  // Delete single blog
  static async deleteBlog(id: string) {
    try {
      await BlogModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  // Delete all blogs
  static async removeAllBlogs() {
    try {
      await BlogModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}
