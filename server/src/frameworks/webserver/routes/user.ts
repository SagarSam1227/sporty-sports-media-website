import userController from "../../../adapters/controllers/userController";
import express  from "express"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepository } from "../../database/mongoDB/repositories/userRepository";

const userRouter = ()=>{

    const router = express.Router()

    const controller = userController(userDbRepository,userRepository)

    router.post('/get-by-email',controller.getUserByEmail);

    router.post('/add-user',controller.registerUser)

    return router
}   

export default userRouter;  