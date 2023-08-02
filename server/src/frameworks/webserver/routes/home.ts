import express from "express"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepository } from "../../database/mongoDB/repositories/userRepository";
import { authService } from "../../services/authServices"
import { authServiceInterface } from "../../../application/services/authServiceInterface"
import userController from "../../../adapters/controllers/userController"
import postController from "../../../adapters/controllers/postController";

const homeRouter = ()=>{

    const router = express.Router()

    const user_controller = userController(userDbRepository,userRepository,authServiceInterface,authService)
    const post_controller = postController()

    router.get('/',user_controller.getUserDetails)
    // router.post('/upload',post_controller.uploadPost)

    return router;

}

export default homeRouter;