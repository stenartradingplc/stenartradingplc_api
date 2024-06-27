import AdminModel from "./model";
import IAdminDoc from "./dto";
import generatePassword, {generateAdminPassword} from "../../utils/generate_password";
import APIFeatures from "../../utils/api_features";

export default class Admin {
  // create the first admin
  static async createFirstAdmin(data: AdminRequest.ICreateFirstAdminInput) {
    try {
      // Default password
      const first_account_default_password = "stenartrading1234";

      // Create an admin
      const newAdmin = await AdminModel.create({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        role: "Super-admin",
        first_account: data.first_account,
        default_password: first_account_default_password,
        password: first_account_default_password,
        password_confirm: first_account_default_password,
      });

      return newAdmin;
    } catch (error) {
      throw error;
    }
  }

  // Create an admin
  static async createAdmin(
    data: AdminRequest.ICreateAdminInput
  ): Promise<IAdminDoc> {
    try {
      // Generate password
      const default_password = generateAdminPassword();

      const newAdmin = await AdminModel.create({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        role: data.role,
        default_password,
        password: default_password,
        password_confirm: default_password,
      });

      return newAdmin;
    } catch (error) {
      throw error;
    }
  }

  // Admin login
  static async getAdminByEmailOrPhoneNumber(
    email_or_phone: string
  ): Promise<IAdminDoc | null> {
    const admin = await AdminModel.findOne({
      $or: [{ email: email_or_phone }, { phone_number: email_or_phone }],
    });
    return admin;
  }

  // get by otp code
  static async getByOTPCode(
    otp: string
  ): Promise<IAdminDoc | null> {
    const admin = await AdminModel.findOne({otp});
    return admin;
  }

  // Get all admins
  static async getAllAdmins(query?: RequestQuery): Promise<IAdminDoc[]> {
    try {
      // const admins = await AdminModel.find();
      const apiFeature = new APIFeatures<IAdminDoc>(AdminModel.find(), query)
        .filter()
        .sort()
        .project()
        .paginate();
      const admins = await apiFeature.dbQuery;
      return admins;
    } catch (error) {
      throw error;
    }
  }

  // Get an admin
  static async getAdmin(id: string): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findById(id);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update default password
  static async updateDefaultPassword(
    admin: IAdminDoc,
    password: string,
    password_confirm: string
  ): Promise<IAdminDoc> {
    try {
      admin.password = password;
      admin.password_confirm = password_confirm;
      admin.is_default_password = false;
      admin.default_password = undefined;
      await admin.save();

      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update email_phone_number changed at to false
  static async updateEmailOrPhoneNumberChangedAt(
    id: string
  ): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { email_phone_number_changed_at: false },
        { runValidators: true, new: true }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update admin password
  static async updateAdminPassword(
    admin: IAdminDoc,
    password: string,
  ): Promise<IAdminDoc | null> {
    try {
      admin.password = password;
      await admin.save();

      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update otp
  static async updateOTP(
    id: string,
    otp: string,
  ): Promise<void> {
    try {
      await AdminModel.updateOne({_id: id}, {$set: {otp}});
    } catch (error) {
      throw error;
    }
  }

  // Update Admin details
  static async updateAccount(
    id: string,
    information: AdminRequest.IUpdateAdminInfo,
  ): Promise<void> {
    try {
      await AdminModel.updateOne({_id: id}, {$set: {...information}});
    } catch (error) {
      throw error;
    }
  }


  // Update admin account status
  static async updateAdminAccountStatus(
    id: string,
    account_status: boolean
  ): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndUpdate(
        id,
        { account_status },
        { runValidators: true, new: true }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Delete an admin permanently
  static async deleteAdmin(id: string): Promise<IAdminDoc | null> {
    try {
      const admin = await AdminModel.findByIdAndDelete(id);
      if (admin) return admin;
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Delete all admins
  static async deleteAllAdmins() {
    try {
      await AdminModel.deleteMany({ first_account: { $ne: true } });
    } catch (error) {
      throw error;
    }
  }
}
