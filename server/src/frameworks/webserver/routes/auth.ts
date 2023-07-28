import express from "express"
import authController from "../../../adapters/controllers/authController"
import { userDbRepository } from "../../../application/repositories/userDbRepository"
import { userRepository } from "../../database/mongoDB/repositories/userRepository"
import { authService } from "../../services/authServices"
import { authServiceInterface } from "../../../application/services/authServiceInterface"

const authRouter = ()=>{

    const router = express.Router()

    const controller = authController(userDbRepository,userRepository,authServiceInterface,authService)

    router.post('/login',controller.userLogin);

    return router;


}

export default authRouter;