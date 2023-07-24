import { AuthServiceReturn } from "../../../frameworks/services/authServices";
import { userInterface } from "../../../types/userInterface";
import { userDbInterface } from "../../repositories/userDbRepository";
import { authServiceInterface } from "../../services/authServiceInterface";

export const userRegister = async (
    user:userInterface,
    userRepository:ReturnType<userDbInterface>,
    authService:ReturnType<authServiceInterface>
)=>{
    user.email = user.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email)

    if(isExistingEmail){
            console.log('email exists...!');
            
    }else{
        user.password = await authService.encryptPassword(user.password);
        // const { _id: userId } = await userRepository.register User(user);
        // const token = authService.generateToken(userId.toString());
        // return token;
      

    }
}