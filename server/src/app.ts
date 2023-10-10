import express from 'express';
import {Server} from 'socket.io'
import { Application } from 'express'
import http from 'http';
import connectDB from './frameworks/database/mongoDB/connection';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
import cloudinaryConfig from './frameworks/webserver/connections/cloudinary';
// import cors from 'cors';

const app: Application = express();

const server = http.createServer(app)

// const io = new Server(server,{
//     cors:{
//         origin:'http://localhost:3000',
//         methods:["GET","POST"]
//     }
// })

// app.use(cors())

connectDB()

cloudinaryConfig()

expressConfig(app)

serverConfig(server).startServer()

routes(app)

app.use(errorHandlingMiddleware)