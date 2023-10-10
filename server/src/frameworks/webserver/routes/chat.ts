import express from "express"
import chatController from "../../../adapters/controllers/chatController"
import { chatDbRepository } from "../../../application/repositories/chatDbRepository"
import { chatRepository } from "../../database/mongoDB/repositories/chatRepository"



const chatRouter = ()=>{

    const router = express.Router()

    const controller = chatController(chatDbRepository,chatRepository)

    router.get('/',controller.findAllChat)
    router.post('/access',controller.accessChat)

    return router;
 
}

export default chatRouter;