import Joi from "joi";
import { CustomError } from "../helpers/CustomError";

export class Validations {
  static async BlogValidation(data: any) {
    return await Joi.object({
      title: Joi.string().required().error(new CustomError("Title is invalid", 400)),
      price: Joi.number().required().error(new CustomError("Title is invalid", 400)),
      body: Joi.string().required().error(new CustomError("Body is invalid", 400)),
      tags: Joi.string().required().error(new CustomError("Tags is invalid", 400)),
      blueprint: Joi.string().required().error(new CustomError("Flow is invalid", 400)),
      type: Joi.string().valid('PAID', 'FREE').required().error(new CustomError("Type is invalid", 400)),
    }).validateAsync(data);
  }
}