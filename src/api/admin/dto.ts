import { Document } from "mongoose";

export default interface IAdminDoc extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  default_password: string | undefined;
  is_default_password: boolean;
  otp: string;
  password: string;
  password_confirm: string | undefined;
  first_account: boolean;
  password_changed_at: Date;
  email_phone_number_changed_at: Boolean;
  account_status: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string, password: string) => boolean;
  checkPasswordChangedAt: (iat: number) => boolean;
}

declare global {
  namespace AdminRequest {
    interface ICreateFirstAdminInput {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      first_account: boolean;
    }
    interface ICreateAdminInput {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      role: string;
    }
    interface IAdminLogin {
      email_or_phone: string;
      password: string;
    }
    interface IUpdateDefaultPassword {
      default_password: string;
      password: string;
      password_confirm: string;
    }
    interface IResetPassword {
      otp: string;
      password: string;
    }
    interface IUpdateEmailOrPhoneNumber {
      email: string;
      phone_number: string;
    }
    interface IUpdateAdminRole {
      role: string;
      id: string;
    }
    interface IForgotPassword {
      email: string;
    }
    interface IForceResetPassword {
      email: string;
      password: string;
    }
    interface IResetAdminPassword {
      id: string;
    }
    interface IUpdateAccountStatus {
      id: string;
      account_status: boolean;
    }
    interface IDeleteAllAdmins {
      delete_key: string;
    }
    interface ICurrentAdmin {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      role: string;
      default_password: string | undefined;
      is_default_password: boolean;
      password: string;
      password_confirm: string | undefined;
      first_account: boolean;
      password_changed_at: Date;
      email_phone_number_changed_at: Boolean;
      account_status: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}
