// import User from "../models/userModel";
import { commentInterface, likesInterface } from "../../../../types/postInterface";
import Post from "../models/postModel"
import Comment from "../models/commentModel";

export const postRepository = () => {
    const addPost = async (image: string, id: string) => {
        const newPost = new Post({
            userid: id,
            image: image
        })

        return newPost.save();

    }

    const findAllPost = async () => {
        const response = await Post.find({ "private": false }).sort({ createdAt: -1 })
        if (response) {
            return response
        }
        return false
    }


    const findRestPost = async (image: string) => {
        const response = await Post.aggregate([
            {
                $match: { "private": false }
            },
            {
                $match:{"image":{$ne:image}}
            },
            {
                $addFields: {
                    userIdObjectId: { $toObjectId: "$userid" } // Convert userId to ObjectId
                }
            },
            {
                $lookup: {
                    from: "users",         // Target collection
                    localField: "userIdObjectId", // Field in the 'post' collection
                    foreignField: "_id",  // Field in the 'user' collection
                    as: "userDetails"     // New array field in the 'post' documents
                }
            },
            {
              $unwind: "$userDetails" // Convert the 'userDetails' array into separate documents
            },
            {
              $project: {
                _id: 1,
                image: 1,
                private: 1,
                likes:1,
                userDetails: {
                  username: 1,
                  profile_picture:1
                }
              }
            }
        ])

        if (response) {
            return response;
        }
        return false;
    }


    const editLikes=async(data:likesInterface)=>{
        console.log(data);
        if(data.action==='like'){
            return new Promise(async(resolve,reject)=>{
                const response = Post.updateOne({image:data.image},{
                    $push:{likes:data.username}
                })
                if(!response){
                    reject('error')
                }
                resolve(response)
            })
        }else{
            return new Promise(async(resolve,reject)=>{
                const response =await Post.updateOne({image:data.image},{
                    $pull:{likes:data.username}
                })
                if(!response){
                    reject('error')
                }
                resolve(response)
            })
        }
        
    }

    const findComments = async(post:string)=>{
        return new Promise(async(resolve,reject)=>{
            const response =await Comment.findOne({image:post}).sort({ date: -1 })
            console.log(response,'resssssssssssss');
            
            if(!response){
                reject('errror')
            }else{

                resolve(response)
            }
        })
    }

    const createCommentBox = async(post:String)=>{

        const commentData = {
            image: post, 
            comments: []
        };

        return new Promise(async(resolve,reject)=>{
        const response = await Comment.create(commentData);
            if(!response){
                reject('error')
            }else{
                resolve(response)
            }
        })
    }

    const updateComments = async(data:commentInterface)=>{

        const {post,username,profile,comment} = data


        const commentData =   {
            username: username,
            userProfile: profile,
            comment: comment,
            replies: [] 
        }
        return new Promise(async(resolve,reject)=>{
            const response = await Comment.updateOne({
                image:post
            },{$push:{comments:commentData}})

            if(!response){
                reject('error')
            }else{
                resolve(response)
            }
        })
    }


    return {
        addPost,
        findAllPost,
        findRestPost,
        editLikes,
        findComments,
        updateComments,
        createCommentBox
    }

}


export type postRepository = typeof postRepository;