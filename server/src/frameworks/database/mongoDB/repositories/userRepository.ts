import { userInterface } from "../../../../types/userInterface";
import User from "../models/userModel";
import mongoose from "mongoose";
import { entityInterface } from "../../../../types/userInterface";

export const userRepository = () => {
    const addUser = (userEntity: entityInterface) => {
        const newUser = new User({
            email: userEntity.getEmail(),
            username: userEntity.getUsername(),
            password: userEntity.getPassword(),
            contact: userEntity.getContact()
        });
        return newUser.save();
    };

    const getUserByEmail = async (email: String) => {
        const user: userInterface | null = await User.findOne({ email: email })
        if (user) {
            return user;
        } else {
            return null;

        }

    }

    const findByProperty = async (key: string, value: string) => {
        const query: { [key: string]: string } = {};
        query[key] = value
        console.log(query, 333333333333333);

        const user: Array<userInterface> | null = await User.find(query)
        console.log('user fetched from databasee.....', user);

        return user
    }

    const findUserById = async (id: string) => {
        const objectId = new mongoose.Types.ObjectId(id)
        const user: userInterface | null = await User.findOne({ _id: objectId })
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    const updateProfile = async (id: string, username: string | undefined, image: string | undefined) => {
        const objectId = new mongoose.Types.ObjectId(id)
        let userObject = {}
        const imageUrl = image==='removed'?null:image

        console.log(id);
        console.log(username);
        console.log(image);
        
        
        
        if(username && image){
           userObject = {
            username:username,
            profile_picture:imageUrl
          }
        }else if(username){
            userObject = {
                username:username
              }
        }else{
            userObject = {
                profile_picture:imageUrl
              }
        }

        return new Promise(async (resolve, reject) => {

            const result = await User.findByIdAndUpdate(
                objectId,
                userObject,
                { new: true }
            )
            if(!result){
                reject(false)
            }
            resolve(result)
        })
    }

    return {
        getUserByEmail,
        addUser,
        findUserById,
        findByProperty,
        updateProfile
    }
}

export type userRepository = typeof userRepository;