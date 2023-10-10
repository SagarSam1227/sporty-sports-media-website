import userController from "../../../adapters/controllers/userController";
import express  from "express"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepository } from "../../database/mongoDB/repositories/userRepository";
import { authService } from "../../services/authServices"
import { authServiceInterface } from "../../../application/services/authServiceInterface"
import uploadsMulter from "../middlewares/multer";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";
import adminController from "../../../adapters/controllers/adminController";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { postRepository } from "../../database/mongoDB/repositories/postRepository";
uploadsMulter


const adminRouter = ()=>{

    const router = express.Router()

    const controller = adminController(postDbRepository,postRepository,userDbRepository,userRepository,authServiceInterface,authService)

    router.post('/login',controller.adminLogin);
    router.post('/block-user',controller.adminStatus)
    router.post('/block-post',controller.blockPost)



    return router
}   

export default adminRouter;  