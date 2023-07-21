import { userInterface } from "../../../types/userInterface"
import { userDbInterface } from "../../repositories/userDbRepository"

export const createUser =async(user:userInterface,dbRepositoryUser:ReturnType<userDbInterface>)=>{
    const status = await dbRepositoryUser.registerUser(user)
    if(status){
        console.log('successfully registered');
        
    }else{
        console.log('error.....');
        
    }
}
