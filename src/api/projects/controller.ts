import Project from "./dal";
import AppError from "../../utils/app_error";
import { RequestHandler } from "express";
import configs from "../../configs";

// Create project
export const createProject: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <ProjectRequest.ICreateProjectInput>req.value;

    // Create project
    const project = await Project.createProject(data);

    // Response
    res.status(201).json({
      status: "SUCCESS",
      message: "Project created successfully",
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

// Get all projects
export const getAllProjects: RequestHandler = async (req, res, next) => {
  try {
    const projects = await Project.getAllProjects();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: projects.length,
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
};

// Get all published projects
export const getPublishedProjects: RequestHandler = async (req, res, next) => {
  try {
    const publishedProjects = await Project.getPublishedProjects();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: publishedProjects.length,
      data: { publishedProjects },
    });
  } catch (error) {
    next(error);
  }
};

// Get project by id
export const getProject: RequestHandler = async (req, res, next) => {
  try {
    // Find project by id
    const project = await Project.getProject(req.params.id);
    if (!project) return next(new AppError("Project does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

// Update project detail
export const updateProjectInfo: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <ProjectRequest.IUpdateProjectInput>req.value;
    data.id = req.params.id; // Add project id to "data"

    // Upddate project
    const project = await Project.updateProjectInfo(data);
    if (!project) return next(new AppError("Project does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Project updated successfully",
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

// Publish project
export const publishProject: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <ProjectRequest.IPublishProject>req.value;

    // Publish
    const project = await Project.publishProject(data);
    if (!project) return next(new AppError("Project does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Project published successfully",
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteProject: RequestHandler = async (req, res, next) => {
  try {
    const project = await Project.deleteProject(req.params.id);
    if (!project) return next(new AppError("Project does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all projects
export const deleteAllProjects: RequestHandler = async (req, res, next) => {
  try {
    const { delete_key } = <ProjectRequest.IDeleteAllProjects>req.value;

    if (configs.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 400));

    // Delete all projects
    await Project.deleteAllProjects();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All projects have been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


// Update project image
export const updateProjectImg: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <ProjectRequest.IUpdateProjectImg>req.value;

    const project = await Project.updateProjectImg(data);
    if (!project) return next(new AppError("Project does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Project image have been updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
