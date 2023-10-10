import { adminInterface, googleAuth, userInterface } from "../../../../types/userInterface";
import User from "../models/userModel";
import mongoose from "mongoose";
import { entityInterface } from "../../../../types/userInterface";
import { PostErr } from "../../../webserver/errors/postErr";
import {GetErr} from "../../../webserver/errors/getErr"
import {PutErr} from "../../../webserver/errors/putErr"

export const userRepository = () => {
    const addUser = async(userEntity: entityInterface) => {
        try{
            const newUser = new User({
                email: userEntity.getEmail(),
                username: userEntity.getUsername(),
                password: userEntity.getPassword(),
                contact: userEntity.getContact()
            });
            return newUser.save();
        }catch(error){
            throw new PostErr('Failed to signup')
        }
    };

    const getUserByEmail = async (email: String) => {
        try{
            const user: userInterface | null = await User.findOne({ email: email })
        return user
        }catch(error){
            throw new GetErr('Failed to fetch user')
        }

    }

    const findAdmin = async (email: String) => {
        try{
            const admin: adminInterface | null = await User.findOne({ admin: email })
        return admin
        }catch(error){
            throw new GetErr('Failed to fetch admin')
        }

    }

    const findByProperty = async (key: string, value: string) => {
       try{
        const query: { [key: string]: string } = {};
        query[key] = value
        console.log(query, 333333333333333);

        const user: Array<userInterface> | null = await User.find(query)
        console.log('user fetched from databasee.....', user);

        return user
       }catch(error){
        throw new GetErr('Failed to fetch user')
       }
    }

    const findUserById = async (id: string) => {
        try{
            const objectId = new mongoose.Types.ObjectId(id)
            // const user: userInterface | null = await User.findOne({ _id: objectId })
            //     return user;
            const response = await User.aggregate([
                {
                    $match:{_id:objectId}
                },
                {
                    $addFields: {
                        userIdString: { $toString: "$_id" }
                    }
                },
                {
                    $lookup:{
                        from:'posts',
                        localField:'userIdString',
                        foreignField:'userid',
                        as:'postDetails'

                    }
                }
            ])
  
            return response

            
            
        }catch(error){
            throw new GetErr('Failed to fetch user')
           }
    }

    const updateProfile = async (id: string, username: string | undefined, image: string | undefined) => {
       try{
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

            const result = await User.findByIdAndUpdate(
                objectId,
                userObject,
                { new: true }
            )
          
            return result
       }catch(error){
        throw new PutErr('Failed to update profile')
       }
    }

    const findSomeOnesPost = async (username:string) => {
        try {

            const response = await User.aggregate([
                {
                    $match:{username:username}
                },
                {
                    $addFields: {
                        userIdString: { $toString: "$_id" }
                    }
                },
                {
                    $lookup:{
                        from:'posts',
                        localField:'userIdString',
                        foreignField:'userid',
                        as:'postDetails'

                    }
                }
            ])
  
            return response
            
            
        }catch(error){
            throw new GetErr('Failed to fetch posts')
        }
    }



    const userGoogleAuth = async(data:googleAuth)=>{
        try{
            const {email} = data

            const user = await User.findOne({email:email})
            console.log(user);
            if(!user){

                const newUser = new User({
                        username:data.username,
                        email:data.email,
                        profile_picture:data.image,
                        following:data.following,
                        followers:data.followers,
                        google:true
                    });
                    return newUser.save();
            }
            return user;
            
        }catch(error){
            throw new PostErr('Failed to signup')
        }
    }

    const findAllUser = async () => {
        try {
            const response = await User.find()
            return response
        } catch (error) {
            throw new GetErr('Failed to fetch posts')
        }
    }

    const setStatus = async (email:string, status:boolean) => {
        console.log(email,status,'3333333333333333333333');
        
        try {
        
          const user = await User.findOne({ email });
      
          if (!user) {
            throw new Error('User not found');
          }
      
          user.blocked = status;
          await user.save();
      
          console.log(user, 'user'); // Log the updated user object
      
        } catch (error) {
          console.error(error);
          throw new PostErr('Failed to update status');
        }
      };
      

      const modifyFollower = async(flag:string,friend:string,username:string)=>{
        try{
            if(flag=='follow'){

                const resOne = await User.updateOne({
                    username:username
                },{$push:{following:friend}})
                
                 const resTwo = await User.updateOne({
                    username:friend
                },{$push:{followers:username}})

                if(resOne && resTwo){
                    return {
                        following:resOne,
                        followers:resTwo
                    }
                }
            }else{
                const resOne = await User.updateOne({
                    username:username
                },{$pull:{following:friend}})
                
                 const resTwo = await User.updateOne({
                    username:friend
                },{$pull:{followers:username}})

                if(resOne && resTwo){
                    return {
                        following:resOne,
                        followers:resTwo
                    }
                }
            }
            console.log('you are on right track');
            
        }catch(err){
            throw new PostErr('Failed to update follower');
        }
      }


      const modifyFavorites=async(flag:string,image:string,username:string)=>{
        try{
            if(flag=='add'){
                console.log(image,username,'hahaha');
                const response = await User.updateOne({
                    email:username
                },{
                    $push:{favorites:image}
                })

                return response
            }else{
                console.log(image,username,'hahaha');
                const response = await User.updateOne({
                    email:username
                },{
                    $pull:{favorites:image}
                })

                return response
            }
            
            
        }catch(err){
            throw new PostErr('Failed to update favorites');
        }
      }



    return {
        getUserByEmail,
        addUser,
        findUserById,
        findByProperty,
        updateProfile,
        findSomeOnesPost,
        userGoogleAuth,
        findAdmin,
        findAllUser,
        setStatus,
        modifyFollower,
        modifyFavorites
    }
}

export type userRepository = typeof userRepository;