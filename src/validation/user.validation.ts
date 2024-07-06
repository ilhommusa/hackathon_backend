import Joi from "joi";
import { CustomError } from "../helpers/CustomError";

export class Validations {
  static async RegisterWithEmailValidation(data: any) {
    return await Joi.object({
      email: Joi.string()
        .required()
        .pattern(
          new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        )
        .error(new CustomError("Email must be in the format", 400)),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
        )
        .error(
          new CustomError(
            "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter and one number",
            400
          )
        ),
      companyName: Joi.string().required().error(new CustomError("Company name is invalid", 400)),
    }).validateAsync(data);
  }
  static async PhoneNumberValidation(data: any) {
    return await Joi.object({
      username: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(\+998)?(\s)?\d{2}(\s)?\d{3}(\s)?\d{2}(\s)?\d{2}$/)
        )
        .error(
          new CustomError(
            "Phone number must be in the format +9989xxxxxxxxx",
            400
          )
        ),
    }).validateAsync(data);
  }
  static async EmailValidation(data: any) {
    return await Joi.object({
      email: Joi.string()
        .required()
        .pattern(
          new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        )
        .error(new CustomError("Email must be in the format", 400)),
    }).validateAsync(data);
  }
  static async LoginFieldValidation(data: any) {
    return await Joi.object({
      username: Joi.string()
        .required()
        .error(
          new CustomError(
            "Username is required, You have to send phone_number or email",
            400
          )
        ),
      password: Joi.string()
        .regex(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
        )
        .required()
        .error(new CustomError("Password is invalid", 400)),
      field: Joi.string()
        .valid("email", "phone_number")
        .error(
          new CustomError(
            "field is invalid, You have to send phone_number or email",
            400
          )
        ),
    }).validateAsync(data);
  }
  static async LoginWithPhoneValidation(data: any) {
    return await Joi.object({
      email: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(\+998)?(\s)?\d{2}(\s)?\d{3}(\s)?\d{2}(\s)?\d{2}$/)
        )
        .error(
          new CustomError(
            "Phone number must be in the format +9989xxxxxxxxx",
            400
          )
        ),
      password: Joi.string()
        .required()
        .error(new CustomError("Password is invalid", 400)),
      field: Joi.string()
        .valid("email", "phone_number")
        .error(
          new CustomError(
            "field is invalid, You have to send phone_number or email",
            400
          )
        ),
    }).validateAsync(data);
  }
  static async LoginWithEmailValidation(data: any) {
    return await Joi.object({
      email: Joi.string()
        .required()
        .pattern(
          new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        )
        .error(new CustomError("Email must be in the format", 400)),
      password: Joi.string()
        .required()
        .error(new CustomError("Password is invalid", 400)),
    }).validateAsync(data);
  }
  static async HashValidation(data: any) {
    return await Joi.object({
      hash: Joi.string()
        .required()
        .pattern(new RegExp(/^\d{6}$/))
        .error(new CustomError("Hash must be 6 characters long", 400)),
      attempt_id: Joi.string()
        .uuid()
        .required()
        .error(new CustomError("Attempt id is invalid", 400)),
    }).validateAsync(data);
  }

  static async ParamUuidValidationOptional(data: any) {
    return await Joi.object({
      id: Joi.string()
        .uuid()
        .required()
        .error(new CustomError("Id is invalid", 400)),
    }).validateAsync(data);
  }

  static async PatchUserValidation(data: any) {
    return await Joi.object({
      firstName: Joi.string()
        .min(3)
        .error(
          new CustomError("First name must be longer than 3 letters", 400)
        ),
      lastName: Joi.string()
        .min(3)
        .error(new CustomError("Last name must be longer than 3 letters", 400)),
    }).validateAsync(data);
  }
  static async ForgotPasswordValidation(data: any) {
    return await Joi.object({
      hash: Joi.string()
        .required()
        .error(new CustomError("Hash is invalid", 400)),
      new_password: Joi.string()
        .required()
        .error(new CustomError("New password is invalid", 400)),
    }).validateAsync(data);
  }

  static async ChangePasswordValidation(data: any) {
    return await Joi.object({
      old_password: Joi.string()
        .allow("")
        .required()
        .error(new CustomError("Old password is invalid", 400)),
      new_password: Joi.string()
        .required()
        .error(new CustomError("New password is invalid", 400)),
    }).validateAsync(data);
  }

  static async AddTeamMemberValidation(data: any) {
    return await Joi.object({
      email: Joi.string()
        .required()
        .pattern(
          new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        )
        .error(new CustomError("Email must be in the format", 400)),
    }).validateAsync(data);
  }

  static async StartValidation(data: any) {
    return await Joi.object({
      carrierId: Joi.string()
        .required()
        .error(new CustomError("Carrier Id is invalid", 400)),
      customerId: Joi.string()
        .required()
        .error(new CustomError("Customer Id is invalid", 400)),
      company_name:  Joi.string().required().error(new CustomError("Company name is invalid", 400)),
    }).validateAsync(data);
  } 
}