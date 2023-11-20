import { chatRepository } from "../../frameworks/database/mongoDB/repositories/chatRepository";



export const chatDbRepository = (repository:ReturnType<chatRepository>)=>{


    const accessChat = async(senderId:String,recieverId:String)=> await repository.chatAccess(senderId,recieverId)
    
    const findChats = async(id:string)=> await repository.getChat(id)

    const postMessage = async(senderId:String,chat:string,message:string)=> await repository.postNewMessage(senderId,chat,message)

    const getMessages = async(chat:string)=> await repository.getAllMessages(chat)


    return{ 
        accessChat,
        findChats,
        postMessage,
        getMessages
    }
}

export type chatDbInterface = typeof chatDbRepository;