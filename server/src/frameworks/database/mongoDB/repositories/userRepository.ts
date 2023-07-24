import { userInterface } from "../../../../types/userInterface";
import User from "../models/userModel";

export const userRepository = () => {
    const addUser = async (user:userInterface) => {
        return await User.create(user)
    }

    const getUserByEmail = async (email: String) => {
        const user: userInterface | null = await User.findOne({ email: email })
        if(user){
            return user;
        }else{
            console.log('data cannot fetched');
            
        }

    }

    return {
        getUserByEmail,
        addUser,
    }
}

export type userRepository = typeof userRepository;