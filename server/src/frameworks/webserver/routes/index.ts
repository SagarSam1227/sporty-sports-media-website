import { Application } from "express"
import userRouter from "./user";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";
import authRouter from "./auth";
import homeRouter from "./home";

const routes = (app:Application)=>{
    app.use('/api/user',userRouter());
    app.use('/api/auth',authRouter());
    app.use('/api/home',userAuthMiddleware,homeRouter())
}

export default routes;