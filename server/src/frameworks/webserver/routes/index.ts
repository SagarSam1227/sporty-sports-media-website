import { Application } from "express";
import userRouter from "./user";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";
import authRouter from "./auth";
import homeRouter from "./home";
import postRouter from "./post";
import adminRouter from "./admin";
import chatRouter from "./chat";

const routes = (app: Application) => {
  app.use('/api/auth', authRouter());
  app.use('/api/user', userRouter());
  app.use('/api/post',postRouter());
  app.use('/api/check-auth', userAuthMiddleware, homeRouter());
  app.use('/api/admin',adminRouter());
  app.use('/api/chat',userAuthMiddleware,chatRouter())
};

export default routes;
