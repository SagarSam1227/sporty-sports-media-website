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

    router.get('/get-my-post',userAuthMiddleware,controller.fetchSomeOnesPost)

    router.get('/get-profile',userAuthMiddleware,controller.getProfileDetails)

    router.post('/follow',userAuthMiddleware,controller.setFollower)

    router.get('/',controller.getAllUsers)

    router.post('/save-post',userAuthMiddleware,controller.addToFavorites)



    return router
}   

export default userRouter;  