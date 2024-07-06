import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helpers/CustomError";



export function IsRoleMiddleware(role: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.session && role.includes(req.session.user.role)) {
        return next();
      }
      res.status(403).json({ statusCode: 403, message: "Forbidden" });
    } catch (error) {
      next(error);
      new CustomError("Forbidden error", 500);
    }
  };
}
