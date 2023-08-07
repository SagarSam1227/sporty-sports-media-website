import { NextFunction, response } from "express";
import { Request, Response } from "express";
import { postDbInterface } from "../../application/repositories/postDbRepository";
import { postRepository } from "../../frameworks/database/mongoDB/repositories/postRepository";
import addPost from "../../application/useCases/post/addPost";
import fetchPost from "../../application/useCases/post/fetchPost";

const postController = (
    postDbRepositoryInterface: postDbInterface,
    postDbReposImp: postRepository) => {
    const repository = postDbRepositoryInterface(postDbReposImp())

    const uploadPost = (req:Request, res: Response) => {
        console.log(req.file);
        const { filename } = req.file || {}
        const {id} = req.payload.user
        
      if (filename) {
            addPost(filename,id,repository).then((response:object)=>{
               res.json(response)
            })
        } 
    }

    const getPost = (req:Request,res:Response) => {
        fetchPost(repository).then((response:any)=>{
            res.json(response)
            // console.log(response);
        })
    }


    return {
        uploadPost,
        getPost
    }

}


export default postController;