import Joi from "joi";
import { CustomError } from "../helpers/CustomError";

export class Validations {
  static async ProductValidation(data: any) {
    return await Joi.object({
      name: Joi.string().required().error(new CustomError("Product name is invalid", 400)),
      description: Joi.string().required().error(new CustomError("Description is invalid", 400)),
      modules: Joi.string().required().error(new CustomError("Modules is invalid", 400)),
      installation: Joi.string().required().error(new CustomError("Installation is invalid", 400)),
      shortDesc: Joi.string().required().error(new CustomError("Short description is invalid", 400)),
      price: Joi.number().required().error(new CustomError("Price is invalid", 400)),
      developer: Joi.string().error(new CustomError("Developer is invalid", 400)),
      support: Joi.string().required().error(new CustomError("Support is invalid", 400)),
      status: Joi.string().required().valid('ACTIVE', 'INACTIVE', 'PENDING', 'CANCELED', 'DELETED').error(new CustomError("Status is invalid", 400)),
      intro: Joi.string().required().pattern(new RegExp(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+/)).error(new CustomError("Intro link is invalid & Youtube link", 400)),
      password: Joi.string().error(new CustomError("Password is invalid", 400)),
    }).validateAsync(data);
  }
}