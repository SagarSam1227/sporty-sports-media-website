import express from 'express';
import { Application } from 'express'
import http from 'http';
import connectDB from './frameworks/database/mongoDB/connection';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
import cloudinaryConfig from './frameworks/webserver/connections/cloudinary';
import socketIoConfig from './frameworks/webserver/connections/socketIo';
// import cors from 'cors';

const app: Application = express();

export const server = http.createServer(app)

socketIoConfig()

connectDB()

cloudinaryConfig()

expressConfig(app)
 
serverConfig(server).startServer()

routes(app)

app.use(errorHandlingMiddleware)