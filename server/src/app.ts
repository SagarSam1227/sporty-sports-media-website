import express from 'express';
import { Application } from 'express'
import http from 'http';
import connectDB from './frameworks/database/mongoDB/connection';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';

const app: Application = express();

const server = http.createServer(app)

connectDB()

expressConfig(app)

serverConfig(server).startServer()

routes(app)

