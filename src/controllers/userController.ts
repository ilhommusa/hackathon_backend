import { Request, Response, RequestHandler, NextFunction } from "express";
import prisma from "../utils/prismaInstance";
import { Validations } from "../validation/user.validation";
import { CustomError } from "../helpers/CustomError";
import { sendMail } from "../services/email.service";
import { checkToken, generateToken } from "../services/jwt.service";
import Stripe from "stripe";
import { getStripeCustomerId } from "../lib/paymentHelper";
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2023-10-16",
});
// Register user controller
export const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email }: any = await Validations.LoginWithEmailValidation(req.body);

    let user: any = await prisma.user.findFirst({
      where: { email },
      include: {
        subscription: {
          include: {
            plans: true,
          },
        },
      },
    });

    if (!user || user?.status == "INACTIVE") {
      throw new CustomError("User not found", 401);
    }

    const token = await generateToken({
      email,
    });

    await sendMail(email, token);

    return res.status(200).json({
      message: "Send email to your email to reset password",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const confirmedLogin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    const decoded: any = await checkToken(token);

    if (!decoded) {
      throw new CustomError("Invalid token", 401);
    }

    const user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
      },
    });

    const session = await prisma.sessions.create({
      data: {
        userId: decoded.user_id,
        useragent: req.headers["user-agent"],
      },
      include: {
        user: true,
      },
    });

    const authToken = await generateToken({
      session,
    });

    return res.status(200).json({
      message: "Login successful",
      authToken,
    });
  } catch (err) {
    next(err);
  }
};

export const submitTool: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url, email, planId, categoryId }: any = req.body;
    if (!url || !email || !planId) {
      throw new CustomError("All fields are required", 400);
    }

    const stripeCustomerId = await getStripeCustomerId(email);

    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        email,
      },
      create: {
        email,
        stripeCustomerId,
      },
    });

    let tool = await prisma.tool.upsert({
      update: {
        url,
        categoryId,
        userId: user.id,
      },
      create: {
        url,
        categoryId,
        userId: user.id,
      },
      where: {
        url,
      },
    });

    const plan: any = await prisma.plan.findFirst({
      where: {
        id: planId,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer: stripeCustomerId,
      metadata: {
        toolUrl: url,
        planId: plan.id,
      },
      success_url: `https://hackathon-nine-silk.vercel.app/submit`,
      cancel_url: `https://hackathon-nine-silk.vercel.app/failed`,
    });

    return res.status(200).json({ sessionUrl: stripeSession.url });
  } catch (err) {
    next(err);
  }
};

export const getTools: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = req.session;
    const tools = await prisma.tool.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return res.status(200).json({ tools });
  } catch (err) {
    next(err);
  }
};
