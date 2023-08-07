import express from "express"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepository } from "../../database/mongoDB/repositories/userRepository";
import { authService } from "../../services/authServices"
import { authServiceInterface } from "../../../application/services/authServiceInterface"
import userController from "../../../adapters/controllers/userController";


const homeRouter = ()=>{

    const router = express.Router()

    const user_controller = userController(userDbRepository,userRepository,authServiceInterface,authService)

    router.get('/',user_controller.getUserDetails)

    return router;

}

export default homeRouter;