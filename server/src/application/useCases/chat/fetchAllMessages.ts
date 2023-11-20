import { chatDbInterface } from "../../repositories/chatDbRepository";

const fetchAllMessage=(chat:string,repository:ReturnType<chatDbInterface>)=>{
  
        return repository.getMessages(chat)
}

export default fetchAllMessage;