import { chatDbInterface } from "../../repositories/chatDbRepository";

const createNewMessage=(senderId:String,chat:string,message:string,repository:ReturnType<chatDbInterface>)=>{
    console.log('useCase');
    
        return repository.postMessage(senderId,chat,message)
}

export default createNewMessage;