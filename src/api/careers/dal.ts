import APIFeatures from "../../utils/api_features";
import IApplicantDoc from "../applicants/dto";
import ApplicantModel from "../applicants/model";
import ICareersDoc from "./dto";
import CareersModel from "./model";

export default class Careers {
  // Create career
  static async createCareer(
    data: CareerRequest.ICreateCareerInput
  ): Promise<ICareersDoc> {
    try {
      const career = await CareersModel.create({
        title: data.title,
        description: data.description,
        experience: data.experience,
        employement_type: data.employement_type,
        responsibilities: data.responsibilities,
        qualifications: data.qualifications,
        location: data.location,
        salary: data.salary,
        deadline: data.deadline,
        quantity: data.quantity,
        is_published: data.is_published,
      });

      return career;
    } catch (error) {
      throw error;
    }
  }

  // Get all careers/vacant positions
  static async getAllCareers(query?: RequestQuery): Promise<ICareersDoc[]> {
    try {
      const apiFeatures = new APIFeatures<ICareersDoc>(
        CareersModel.find(),
        query
      )
        .sort()
        .filter()
        .project()
        .paginate();

      const careers = await apiFeatures.dbQuery;
      return careers;
    } catch (error) {
      throw error;
    }
  }

  // Get detail of a career/ vacant position
  static async getCareer(id: string): Promise<ICareersDoc | null> {
    try {
      // Find job. If it exists, return it. Else return null
      const career = await CareersModel.findById(id);
      return career;
    } catch (error) {
      throw error;
    }
  }

  // Update a career
  static async updateCareer(
    data: CareerRequest.IUpdateCareerInput
  ): Promise<ICareersDoc | null> {
    try {
      // Find by id and update
      const career = await CareersModel.findByIdAndUpdate(
        data.id,
        {
          title: data.title,
          description: data.description,
          experience: data.experience,
          responsibilities: data.responsibilities,
          qualifications: data.qualifications,
          location: data.location,
          salary: data.salary,
          quantity: data.quantity,
          deadline: data.deadline,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      return career;
    } catch (error) {
      throw error;
    }
  }

  // Delete a career
  static async deleteCareer(id: string): Promise<ICareersDoc | null> {
    try {
      // Find by id and delete. If it exists, return the deleted career else return null
      const career = await CareersModel.findByIdAndDelete(id);
      if (career) return career;

      return null; // Return null if career not found.
    } catch (error) {
      throw error;
    }
  }

  // Delete all careers
  static async deleteAllCareers() {
    try {
      await CareersModel.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Update employement type
  static async updateEmploymentType(
    data: CareerRequest.IUpdateEmployementType
  ): Promise<ICareersDoc | null> {
    try {
      // Find and update career. If it exists, return its value. Else return null
      const career = await CareersModel.findByIdAndUpdate(
        data.id,
        {
          employement_type: data.employement_type,
        },
        { runValidators: true, new: true }
      );

      return career;
    } catch (error) {
      throw error;
    }
  }

  // Update is_published
  static async updateIsPublished(
    data: CareerRequest.IUpdateIsPublished
  ): Promise<ICareersDoc | null> {
    try {
      // Find and career and if found, update it. Else return null
      const career = await CareersModel.findByIdAndUpdate(
        data.id,
        {
          is_published: data.is_published,
        },
        { runValidators: true, new: true }
      );
      if (career) return career;

      return null; // Return null if career not found
    } catch (error) {
      throw error;
    }
  }

  // Update vacancy status
  static async updateVacancyStatus(
    data: CareerRequest.IUpdateVacancyStatus
  ): Promise<ICareersDoc | null> {
    try {
      // Find and update career. If it exists, return its value. Else return null.
      const career = await CareersModel.findByIdAndUpdate(
        data.id,
        {
          status: data.status,
        },
        { runValidators: true, new: true }
      );
      if (career) return career;

      return null; // Return null if career does not exist
    } catch (error) {
      throw error;
    }
  }

  // Find all applicants of a career
  static async getApplicantsOfACareer(id: string): Promise<IApplicantDoc[]> {
    try {
      // Find applicants of a job. And return array of applicants
      const applicants = await ApplicantModel.find({ job_applied: id });
      return applicants;
    } catch (error) {
      throw error;
    }
  }

  // Get published careers
  static async getPublishedCareers(): Promise<ICareersDoc[]> {
    try {
      const publishedCareers = await CareersModel.find({ is_published: true });
      return publishedCareers;
    } catch (error) {
      throw error;
    }
  }

  // Get drafted careers
  static async getDraftedCareers(): Promise<ICareersDoc[]> {
    try {
      const draftedCareers = await CareersModel.find({ is_published: false });
      return draftedCareers;
    } catch (error) {
      throw error;
    }
  }
}
