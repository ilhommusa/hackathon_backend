import {NextFunction, Request, Response} from 'express';
import {getDecodedToken} from "../lib/helper";
import { CustomError } from '../helpers/CustomError';

export async function ownerMiddleware(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password;
    if (password) {
        if (password === process.env.PASSWORD_OWNER) {
            next();
        } else {
            throw new CustomError("Forbidden", 401)

        }
    } else {
        res.status(401).send("Forbidden");
    }
}