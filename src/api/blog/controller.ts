import { RequestHandler } from "express";
import Blog from "./dal";
import AppError from "../../utils/app_error";
import cloudinary from "../../utils/cloudinary";
import configs from "../../configs";
import slugifer from "../../utils/slugfier";

// Create blog
export const createBlog: RequestHandler = async (req, res, next) => {
  try {
    // Request body
    const blogContents = <BlogRequest.ICreateBlogInput>req.value;

    blogContents.slug_title = slugifer(blogContents.title);

    // Insert blog content
    const blog = await Blog.createBlog(blogContents);

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "New Blog content created successfully",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Find all
export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const blog = await Blog.getAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: blog.length,
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Find all published blogs
export const getAllPublished: RequestHandler = async (req, res, next) => {
  try {
    const publishedBlog = await Blog.getAllPublished();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: publishedBlog.length,
      data: {
        publishedBlog,
      },
    });
  } catch (error) {
    next(error);
  }
};


// Find by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    // Find blog and check if it exists
    const blog = await Blog.getById(req.params.id);
    if (!blog) return next(new AppError("Blog not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Find by title
export const getByTitle: RequestHandler = async (req, res, next) => {
  try {
    // Find blog and check if it exists
    const blog = await Blog.getBySlugTitle(req.params.title);
    if (!blog) return next(new AppError("Blog not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update blog
export const updateBlog: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <BlogRequest.IUpdateBlogInput>req.value;
    const id: string = req.params.id;

    // Update blog. Also check if the dal method returns null
    const blog = await Blog.updateBlog(id, data);
    if (!blog) return next(new AppError("Blog not found", 404));

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "Blog updated successfully",
      data: { blog },
    });
  } catch (error) {
    next(error);
  }
};

// Publish blog
export const publishBlog: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <BlogRequest.IPublishBlog>req.value;
    data.id = req.params.id; // Add blog id to "data"

    const blog = await Blog.publishBlog(data);
    if (!blog) return next(new AppError("Blog does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Blog published successfully",
      data: { blog },
    });
  } catch (error) {
    next(error);
  }
};

// Update blog Image
export const updateBlogImage: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;

    const { image_url, image_public_id } = <BlogRequest.IUpdateImage>req.value;

    const blog = await Blog.getById(id);

    if (!blog) {
      return next(
        new AppError("No blog found with the provided blog id!", 404)
      );
    }

    await cloudinary.uploader.destroy(blog.image_public_id);

    // Update blog. Also check if the dal method returns null
    const updatedBlog = await Blog.updateBlogImage(blog, {
      image_url,
      image_public_id,
    });

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "Blog updated successfully",
      data: { blog: updatedBlog },
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog
export const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    // Check if blog content exists
    const blog = await Blog.getById(req.params.id);
    if (!blog) return next(new AppError("Blog not found", 404));

    // Delete the blog
    await Blog.deleteBlog(req.params.id);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog
export const removeAllBlog: RequestHandler = async (req, res, next) => {
  try {
    // Get delete key
    const { delete_key } = <BlogRequest.IDeleteAllBlogInput>req.value;

    // Check the validity of the delete key
    if (configs.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 401));

    // Delete all of the Blogs
    await Blog.removeAllBlogs();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All Blogs deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
