import ContactUsModel from "./model";
import IContactUsDoc from "./dto";

// Data access layer for contactUs data
export default class ContactUs {
  // Create contact us
  static async createContactUs(
    data: ContactUsRequest.ICreateContactUsInput
  ): Promise<IContactUsDoc> {
    try {

      const contactUs= await ContactUsModel.create(data);

      // Return create contact us
      return contactUs;
    } catch (error) {
      throw error;
    }
  }

  // Get all contact us
  static async getAll(): Promise<IContactUsDoc[]> {
    try {
      const contactUs = await ContactUsModel.find();
      return contactUs;
    } catch (error) {
      throw error;
    }
  }

  // Find by id
  static async getById(id: string): Promise<IContactUsDoc | null> {
    try {
      const contactUs = await ContactUsModel.findById(id);
      if (contactUs) return contactUs;

      return null;
    } catch (error) {
      throw error;
    }
  }


  static async updateContactUsStatus(adminName: string, contactUsId: string){
    try {
      await ContactUsModel.findByIdAndUpdate(contactUsId, 
        {read_status: "Old"})
    } catch (error) {
      throw error;
    }
  }

    // check if current contact us is read or not and update
    static async checkAndUpdateReadStatus(adminName: string, id: string): Promise<void> {
      try {
        const contactUs = await ContactUsModel.findOne({ id});
        
        if(!contactUs){
          await this.updateContactUsStatus(adminName, id);
        }
  
      } catch (error) {
        throw error;
      }
    }

  // Delete contact us by id
  static async deleteContactUs(id: string) {
    try {
      await ContactUsModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  // Delete contact us
  static async removeAllContactUs() {
    try {
      await ContactUsModel.deleteMany();
    } catch (error) {
      throw error;
    }
  }
}
