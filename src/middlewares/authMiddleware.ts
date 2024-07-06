import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaInstance";
import { CustomError } from "../helpers/CustomError";
import { checkToken } from "../services/jwt.service";
declare global {
  namespace Express {
    interface Request {
      session?: Record<any, any>;
    }
  }
}
export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    let token: any = req.headers.authorization;

    console.log(token);
    if (!token) {
      throw new CustomError("Authorization header is not present", 401);
    }

    token = token?.split(" ")[1];

    if (!token) {
      // If the Authorization header is not present, return an error response
      throw new CustomError("Authorization header is not present", 401);
    }

    // Verify the JWT token and decode the payload
    const decodedToken: any = checkToken(token);

    if (!decodedToken) {
      // If the token is invalid or expired, return an error response
      throw new CustomError("Invalid or expired token", 401);
    }

    // Add the decoded payload to the request object
    const session: any = await prisma.sessions.findFirst({
      where: {
        id: decodedToken?.session_id,
        isExpired: false,
      },
      include: {
        user: true
      },
    });
    // If the user is not found, return an error response
    if (!session) {
      res.status(401).json({
        ok: false,
        message: "Session isn't found",
      });
    } else {
      // If the user is found, add the user to the request object
      req.session = session;
      next();
    }
  } catch (error) {
    // If the token is invalid or expired, return an error response
    next(error);
    new CustomError("Invalid or expired token", 401);
  }
}


export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user?.role !== "ADMIN") {
    return res.status(403).json({
      ok: false,
      message: "You are not authorized to perform this action",
    });
  }
  next();
}