import { chatRepository } from "../../frameworks/database/mongoDB/repositories/chatRepository";



export const chatDbRepository = (repository:ReturnType<chatRepository>)=>{


    const accessChat = async(senderId:String,recieverId:String)=> await repository.chatAccess(senderId,recieverId)
    
    const findChats = async(id:string)=> await repository.getChat(id)


    return{
        accessChat,
        findChats
    }
}

export type chatDbInterface = typeof chatDbRepository;