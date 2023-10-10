import { chatDbInterface } from "../../repositories/chatDbRepository";

const findAllChats=(id:string,repository:ReturnType<chatDbInterface>)=>{
    console.log('useCase');
    
        return repository.findChats(id)
}

export default findAllChats;