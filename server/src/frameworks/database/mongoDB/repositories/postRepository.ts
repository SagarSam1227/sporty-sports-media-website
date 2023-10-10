// import User from "../models/userModel";
import { commentInterface, likesInterface } from "../../../../types/postInterface";
import Post from "../models/postModel"
import Comment from "../models/commentModel";
import { PostErr } from "../../../webserver/errors/postErr";
import { GetErr } from "../../../webserver/errors/getErr";
import { PutErr } from "../../../webserver/errors/putErr";

export const postRepository = () => {


    const addPost = async (image: string, id: string) => {

        try {
            const newPost = await new Post({
                userid: id,
                image: image
            })
            return newPost.save();
        } catch (error) {
            throw new PostErr('Failed to create a new post')
        }

    }

    const findAllPost = async () => {
        try {
            const response = await Post.find({ "private": false}).sort({ createdAt: -1 })
            return response
        } catch (error) {
            throw new GetErr('Failed to fetch posts')
        }
    }


    const findRestPost = async (image: string) => {
        try {
            const response = await Post.aggregate([
                {
                    $match: { "private": false }
                },
                {
                    $match: { "image": { $ne: image } }
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
                        likes: 1,
                        hide:1,
                        blocked:1,
                        userDetails: {
                            username: 1,
                            profile_picture: 1
                        }
                    }
                }
            ])
            return response;
        } catch (error) {
            throw new GetErr('Failed to fetch posts')
        }

    }


    const editLikes = async (data: likesInterface) => {
        try {
            if (data.action === 'like') {
                return new Promise(async (resolve, reject) => {
                    const response = Post.updateOne({ image: data.image }, {
                        $push: { likes: data.username }
                    })
                    if (!response) {
                        reject('error')
                    }
                    resolve(response)
                })
            } else {
                return new Promise(async (resolve, reject) => {
                    const response = await Post.updateOne({ image: data.image }, {
                        $pull: { likes: data.username }
                    })
                    if (!response) {
                        reject('error')
                    }
                    resolve(response)
                })
            }
        } catch (error) {
            throw new PutErr('Failed to like the post')
        }

    }

    const findComments = async (post: string) => {

        try {
            const response = await Comment.findOne({ image: post }).sort({ date: -1 })
            console.log(response, 'resssssssssssss');
            return response
        } catch (error) {
            throw new GetErr('Failed to fetch comments')
        }


    }

    const createCommentBox = async (post: String) => {

        try {
            const commentData = {
                image: post,
                comments: []
            };

            const response = await Comment.create(commentData);
            return response
        } catch (error) {
            throw new PostErr('Failed to create comment')
        }
    }

    const updateComments = async (data: commentInterface) => {

        try {
            const { post, username, profile, comment } = data


            const commentData = {
                username: username,
                userProfile: profile,
                comment: comment,
                replies: []
            }
            const response = await Comment.updateOne({
                image: post
            }, { $push: { comments: commentData } })

            return response
        } catch (error) {
            throw new PutErr('Failed to add comment')
        }
    }


    const updateReport = async (reason: string, image: string,user:string) => {
        try {

            const data = {
                reason:reason,
                email:user
            }
            const response = Post.updateOne({
                image: image
            }, { $push: { reports:data } })
            console.log(response);
            
            return response;
        } catch (error) {
            throw new PutErr('Failed to report the post')
        }
    }


    const findOnePost = async (image: string) => {

        try {
            const response = await Post.findOne({ image:image })
            console.log(response, 'resssssssssssss');
            return response
        } catch (error) {
            throw new GetErr('Failed to fetch post')
        }


    }

    const updateBlock = async (hide:boolean,image:string) => {
        
        try {
        
          const post = await Post.findOne({ image:image });
      
          if (!post) {
            throw new Error('User not found');
          }
      
          post.hide = hide;
          await post.save();
      
          console.log(post,'3333333');
          
      
        } catch (error) {
          console.error(error);
          throw new PostErr('Failed to update status');
        }
      };
    




    return {
        addPost,
        findAllPost,
        findRestPost,
        editLikes,
        findComments,
        updateComments,
        createCommentBox,
        updateReport,
        findOnePost,
        updateBlock
    }


}




export type postRepository = typeof postRepository;