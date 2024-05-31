import ApplicantModel from "./model";
import IApplicantDoc from "./dto";

// Data access layer class for applicants
export default class Applicant {
  // Create applicant
  static async createApplicant(
    data: ApplicantRequest.ICreateApplicantInput
  ): Promise<IApplicantDoc> {
    try {
      // Create applicant
      const applicant = await ApplicantModel.create({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        field_of_strudy: data.field_of_strudy,
        experience: data.experience,
        education_level: data.education_level,
        cv_secure_url: data.cv_secure_url,
        cv_cloudinary_public_id: data.cv_cloudinary_public_id,
        address: data.address,
        job_applied: data.job_applied,
        status: data.status,
      });

      return applicant; // Return applicant data
    } catch (error) {
      throw error;
    }
  }

  // Get all applicants
  static async getAllApplicants(): Promise<IApplicantDoc[]> {
    try {
      const applicants = await ApplicantModel.find();

      return applicants;
    } catch (error) {
      throw error;
    }
  }

  // Get applicant by id
  static async getApplicant(id: string): Promise<IApplicantDoc | null> {
    try {
      // Find applicant and if found, return it else return null
      const applicant = await ApplicantModel.findById(id);
      // if (applicant) return applicant;

      return applicant;
    } catch (error) {
      throw error;
    }
  }

  // Update applicant status
  static async updateApplicantStatus(
    data: ApplicantRequest.IUpdateStatusInput
  ): Promise<IApplicantDoc | null> {
    try {
      // Find and update applicant data. If it exists, return the updated value. Else return null
      const applicant = await ApplicantModel.findByIdAndUpdate(
        data.id,
        {
          status: data.status,
          status_updated_by: data.status_updated_by,
        },
        { runValidators: true, new: true }
      );
      if (applicant) return applicant;

      return null; // Return null if applicant data does not exist.
    } catch (error) {
      throw error;
    }
  }

  // Delete applicant data
  static async deleteApplicant(id: string): Promise<IApplicantDoc | null> {
    try {
      // Find and delete applicant. If it exists, return it. Else return null
      const applicant = await ApplicantModel.findByIdAndDelete(id);
      if (applicant) return applicant;

      return null; // Return null if applicant data not found
    } catch (error) {
      throw error;
    }
  }

  // Delete all apllicants
  static async deleteAllApplicants(deleteKey: string) {
    try {
      // Delete all applicants
      await ApplicantModel.deleteMany();
    } catch (error) {
      throw error;
    }
  }
}
