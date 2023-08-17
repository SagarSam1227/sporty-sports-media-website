import { NextFunction, response } from "express";
import { Request, Response } from "express";
import { postDbInterface } from "../../application/repositories/postDbRepository";
import { postRepository } from "../../frameworks/database/mongoDB/repositories/postRepository";
import addPost from "../../application/useCases/post/addPost";
import fetchPost from "../../application/useCases/post/fetchPost";
import fetchRemainingPost from "../../application/useCases/post/fetchRemainingPost";
import updateLikes from "../../application/useCases/post/updateLikes";
import fetchComments from "../../application/useCases/post/getComments";
import postComments from "../../application/useCases/post/addComment";
import createComment from "../../application/useCases/post/createComment";


const postController = (
    postDbRepositoryInterface: postDbInterface,
    postDbReposImp: postRepository) => {
    const repository = postDbRepositoryInterface(postDbReposImp())

    const uploadPost =async(req:Request, res: Response) => {
        const { filename } = req?.file || {}
        const {id} = req?.payload?.user
        
      if (filename) {
        await createComment(repository,filename)
            addPost(filename,id,repository).then((response:object)=>{
               res.json(response)
               
            })
        } 
    }

    const getPost = async (req:Request,res:Response) => {
      await fetchPost(repository).then((response:any)=>{
            res.json(response)
        })
    }

    const getRemainingPost = async (req:Request,res:Response) => {
        console.log(req.query,'hahahahhahahahah');
        
            const image:any = req.query?.image
        await fetchRemainingPost(repository,image).then((response:any)=>{
              res.json(response)
          })
      }

      const updateLike = async (req:Request,res:Response)=>{
        
        console.log(req.body);
        
        await updateLikes(repository,req.body).then((response:object)=>{
           console.log(response,'this is response');
           res.json(response)
           
        })
      }


      const getComments = async (req:Request,res:Response)=>{
        const post:any = req.query?.post
        console.log(post,'postsssssssaaa');
        
        await fetchComments(repository,post).then((response:object)=>{
          console.log(response);
          res.json(response)
        })
      }


      const addComments = async (req:Request,res:Response)=>{
          const data = req.body

        await postComments(repository,data).then((response:object)=>{
          console.log(response);
        })
      }

    return {
        uploadPost,
        getPost,
        getRemainingPost,
        updateLike,
        getComments,
        addComments
    }

}


export default postController;