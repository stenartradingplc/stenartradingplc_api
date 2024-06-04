import ProjectModel from "./model";
import IProjectDoc from "./dto";

export default class Project {
  // Create project
  static async createProject(
    data: ProjectRequest.ICreateProjectInput
  ): Promise<IProjectDoc> {
    try {
      const project = await ProjectModel.create({
        name: data.name,
        client_name: data.client_name,
        description: data.description,
        problem: data.problem,
        approach: data.approach,
        time_taken: data.time_taken,
        color: data.color,
        img_secure_url: data.img_secure_url,
        img_cloudinary_public_id: data.img_cloudinary_public_id,
        is_published: data.is_published,
      });

      return project;
    } catch (error) {
      throw error;
    }
  }

  // Get all projects
  static async getAllProjects(): Promise<IProjectDoc[]> {
    try {
      const projects = await ProjectModel.find();
      return projects;
    } catch (error) {
      throw error;
    }
  }

  // Get all published projects
  static async getPublishedProjects(): Promise<IProjectDoc[]> {
    try {
      const projects = await ProjectModel.find({ is_published: true });
      return projects;
    } catch (error) {
      throw error;
    }
  }

  // Get project by id
  static async getProject(id: string): Promise<IProjectDoc | null> {
    try {
      const project = await ProjectModel.findById(id);
      return project;
    } catch (error) {
      throw error;
    }
  }

  // Update project detail
  static async updateProjectInfo(
    data: ProjectRequest.IUpdateProjectInput
  ): Promise<IProjectDoc | null> {
    try {
      // Find and update project.
      const project = await ProjectModel.findByIdAndUpdate(
        data.id,
        {
          name: data.name,
          client_name: data.client_name,
          description: data.description,
          problem: data.problem,
          approach: data.approach,
          time_taken: data.time_taken,
          color: data.color,
        },
        { runValidators: true, new: true }
      );

      return project;
    } catch (error) {
      throw error;
    }
  }

  // Update publish status
  static async publishProject(
    data: ProjectRequest.IPublishProject
  ): Promise<IProjectDoc | null> {
    try {
      const project = await ProjectModel.findByIdAndUpdate(
        data.id,
        {
          is_published: data.is_published,
        },
        { runValidators: true, new: true }
      );

      return project;
    } catch (error) {
      throw error;
    }
  }

  // Delete project
  static async deleteProject(id: string): Promise<IProjectDoc | null> {
    try {
      const project = await ProjectModel.findByIdAndDelete(id);
      return project;
    } catch (error) {
      throw error;
    }
  }

  // Delete all projects
  static async deleteAllProjects() {
    try {
      await ProjectModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  }

  // Update project image
  static async updateProjectImg(
    data: ProjectRequest.IUpdateProjectImg
  ): Promise<IProjectDoc | null> {
    try {
      const project = await ProjectModel.findByIdAndUpdate(
        data.id,
        {
          img_secure_url: data.img_secure_url,
          img_cloudinary_public_id: data.img_cloudinary_public_id,
        },
        { runValidators: true, new: true }
      );
      return project;
    } catch (error) {
      throw error;
    }
  }
}
