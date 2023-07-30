import userController from "../../../adapters/controllers/userController";
import express  from "express"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepository } from "../../database/mongoDB/repositories/userRepository";
import { authService } from "../../services/authServices"
import { authServiceInterface } from "../../../application/services/authServiceInterface"

const userRouter = ()=>{

    const router = express.Router()

    const controller = userController(userDbRepository,userRepository,authServiceInterface,authService)

    router.post('/add-user',controller.createUser);

    return router
}   

export default userRouter;  