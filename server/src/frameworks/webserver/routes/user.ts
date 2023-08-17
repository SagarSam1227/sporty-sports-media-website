import userController from "../../../adapters/controllers/userController";
import express  from "express"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepository } from "../../database/mongoDB/repositories/userRepository";
import { authService } from "../../services/authServices"
import { authServiceInterface } from "../../../application/services/authServiceInterface"
import uploadsMulter from "../middlewares/multer";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";
uploadsMulter


const userRouter = ()=>{

    const router = express.Router()

    const controller = userController(userDbRepository,userRepository,authServiceInterface,authService)

    router.post('/add-user',controller.createUser);

    router.post('/upload-profile',userAuthMiddleware,uploadsMulter,controller.uploadProfile)

    router.get('/get-profile',controller.getProfileDetails)


    return router
}   

export default userRouter;  