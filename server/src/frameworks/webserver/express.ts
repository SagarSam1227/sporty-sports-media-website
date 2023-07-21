import { Application } from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';


const expressConfig = (app: Application) => {

    app.use(cors({
        credentials: true,
    }));
    app.use(compression())
    app.use(cookieParser())
    app.use(bodyParser.json());
}


export default expressConfig;