import { userInterface } from "../../../../types/userInterface";
import User from "../models/userModel";
import mongoose from "mongoose";
import { entityInterface } from "../../../../types/userInterface";

export const userRepository = () => {
    const addUser = (userEntity:entityInterface) => {
        const newUser = new User({
            email: userEntity.getEmail(),
          username: userEntity.getUsername(),
          password: userEntity.getPassword(),
          contact:userEntity.getContact()
        });
        return newUser.save();
      };

    const getUserByEmail = async (email: String) => {
        const user: userInterface | null = await User.findOne({ email: email })
        if(user){
            return user;
        }else{
            return null;
            
        }

    }

    const findByProperty = async (key:string,value:string)=>{
        const query: { [key: string]: string } = {};
        query[key] = value
        console.log(query,333333333333333);
        
        const user:Array<userInterface> | null = await User.find(query)
        console.log('user fetched from databasee.....',user);
        
        return user
    }

    const findUserById = async (id:string)=>{
        const objectId =  new mongoose.Types.ObjectId(id)
        const user:userInterface | null = await User.findOne({_id:objectId})
        if(user){
            return user;
        }else{
            return null;
        }
    }

    return {
        getUserByEmail,
        addUser,
        findUserById,
        findByProperty
    }
}

export type userRepository = typeof userRepository;