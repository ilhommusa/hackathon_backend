import { NextFunction, Request, RequestHandler, Response } from "express";
import prisma from "../utils/prismaInstance";

export const getCategories: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name }: any = req.query;
    // search by name
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};
