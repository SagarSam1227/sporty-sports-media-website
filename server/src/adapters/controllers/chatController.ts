import { chatDbInterface } from "../../application/repositories/chatDbRepository";
import asyncHandler from "express-async-handler"
import { chatRepository } from "../../frameworks/database/mongoDB/repositories/chatRepository";
import { NextFunction, Response, Request } from "express";
import accessingChat from "../../application/useCases/chat/accessChat";
import findAllChats from "../../application/useCases/chat/findAllChat";
import createNewMessage from "../../application/useCases/chat/createNewMessage";
import fetchAllMessage from "../../application/useCases/chat/fetchAllMessages";

const chatController = (dbInterface: chatDbInterface, dbRepository: chatRepository) => {

    const repository = dbInterface(dbRepository())

    const accessChat = asyncHandler((req: Request, res: Response, next: NextFunction) => {

        console.log('body....', req.body);
        console.log('payload...', req.payload);
        const senderId: String = JSON.parse(JSON.stringify(req.body.userId))
        let recieverId: String = req.payload.user.id

        accessingChat(senderId, recieverId, repository).then((response: any) => {
            console.log(response, 'response');
            res.json(response)

        }).catch((err: object) => {
            next()
        })


    })

    const findAllChat = asyncHandler((req: Request, res: Response, next: NextFunction) => {

        const id = req.payload.user.id


        findAllChats(id, repository).then((response) => {
            res.json(response)
        }).catch((err: object) => {
            next()
        })
    })


    const createMessage = asyncHandler((req: Request, res: Response, next: NextFunction) => {

        const id = req.payload.user.id
        const chat: string = req.body.chat
        const message: string = req.body.message


        createNewMessage(id, chat, message, repository).then((response) => {
            res.json(response)
        }).catch((err: object) => {
            next()
        })
    })

    const fetchMessages = asyncHandler((req: Request, res: Response, next: NextFunction) => {


        const chat: string | any= req.query?.chat
        console.log(chat,1234567890);
        


        fetchAllMessage(chat, repository).then((response) => {
            res.json(response)
        }).catch((err: object) => {
            next()
        })
    })


    return {
        accessChat,
        findAllChat,
        createMessage,
        fetchMessages

    }
}

export default chatController;