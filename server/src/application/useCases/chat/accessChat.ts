import { chatDbInterface } from "../../repositories/chatDbRepository";

const accessingChat=(senderId:String,recieverId:String,repository:ReturnType<chatDbInterface>)=>{
    console.log('useCase');
    
        return repository.accessChat(senderId,recieverId)
}

export default accessingChat;