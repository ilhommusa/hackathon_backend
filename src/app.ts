import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import routes from "./routes/routes";
import errorMiddleware from './middlewares/CustomErrorMiddleware';
import path from 'path';

dotenv.config();
let dirname = path.resolve(path.dirname(""));


try {
    const PORT = process.env.PORT || 3000;
    const app: Express = express();
    app.use(cors({origin: "*", allowedHeaders: ['Content-Type', 'Authorization']}));    


    app.use(
        `/images`,
        express.static(path.join(dirname, "src", "public", "images"))
    );
    
    app.use(
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ): void => {
            console.log()
            if (req.originalUrl.startsWith('/api/v1/payment/webhook')) {
                next();
            } else {
                express.json({limit: '10mb'})(req, res, next);
            }
        }
    );

    app.use((req: Request, res: Response, next: NextFunction) => {
        // console.log(req.ip + " " + req.method + " " + req.url);
        console.log(
            req.headers["x-forwarded-for"] +
            " " +
            req.socket.remoteAddress +
            " " +
            req.method +
            " " +
            req.url
        );
        next();
    });


    app.use(express.urlencoded({extended: false}));

    app.use((req: Request, res: Response, next: NextFunction) => {
        // log full request url
        console.log('Request URL:', req.originalUrl);
        next();
    });

    try {
        app.use('/api/v1', routes);
    } finally {
        app.use(errorMiddleware)
    }

    let server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });


} catch (error) {
    console.log(error, 'error');
} finally {
    console.log('finally');
}