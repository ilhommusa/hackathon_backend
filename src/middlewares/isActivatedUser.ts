
import {NextFunction, Request, Response} from 'express';
import {getDecodedToken} from "../lib/helper";
import prisma from '../utils/prismaInstance';
import { CustomError } from '../helpers/CustomError';

export async function isActivateMiddleware(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    console.log(email);
    
    if (email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user?.status === "ACTIVATE") {
            next();
        } else {
            throw new CustomError("You are still on the waitlist, wait for us to activate you, we will send you an email as soon as we activate you", 401)
        }
    } else {
        res.status(401).send("Forbidden");
    }
}