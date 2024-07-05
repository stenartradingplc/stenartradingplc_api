import TestimonialModel from "./model";
import ITestimonialDoc from "./dto";

// Data access layer for testimonial data
export default class Testimonial {
  // Create testimonial content
  static async createTestimonial(
    data: TestimonialRequest.ICreateTestimonialInput
  ): Promise<ITestimonialDoc> {
    try {
      const testimonial = await TestimonialModel.create(data);

      // Return create testimonial
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  // Get all testimonials
  static async getAll(): Promise<ITestimonialDoc[]> {
    try {
      const testimonial = await TestimonialModel.find();
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  // Find by id
  static async getById(id: string): Promise<ITestimonialDoc | null> {
    try {
      const testimonial = await TestimonialModel.findById(id);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  // Update testimonial
  static async updateTestimonial(
    id: string,
    data: TestimonialRequest.IUpdateTestimonialInput
  ): Promise<ITestimonialDoc | null> {
    try {
      const testimonial = await TestimonialModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  // Update status
  static async updateTestimonialImage(
    testimonial: ITestimonialDoc,
    newImageData: { image_url: string; image_key: string }
  ): Promise<ITestimonialDoc> {
    try {
      testimonial.image_url = newImageData.image_url;
      testimonial.image_key = newImageData.image_key;
      await testimonial.save();
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  // Delete single testimonial
  static async deleteTestimonial(id: string) {
    try {
      await TestimonialModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  // Delete all testimonials
  static async removeAllTestimonials() {
    try {
      await TestimonialModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}
