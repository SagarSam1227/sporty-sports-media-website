import { userDbInterface } from "../../application/repositories/userDbRepository";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import adminAuth from "../../application/useCases/auth/adminAuth";
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository";
import { AuthService } from "../../frameworks/services/authServices";
import asyncHandler from "express-async-handler";
import { NextFunction, Request } from "express";
import { Response } from "express";
import updateStatus from "../../application/useCases/user/updateStatus";
import { postDbInterface } from "../../application/repositories/postDbRepository";
import { postRepository } from "../../frameworks/database/mongoDB/repositories/postRepository";
import updatePostBlock from "../../application/useCases/post/updatePostBlock";


const adminController = (
  postDbRepositoryInterface:postDbInterface,
  postDbReposImp:postRepository,
    userDbRepositoryInterface: userDbInterface,
  userDbReposImp: userRepository,
  authServiceInterface: authServiceInterfaceType,
  authServiceImp: AuthService)=>{

    const postRepository = postDbRepositoryInterface(postDbReposImp())
    const repository = userDbRepositoryInterface(userDbReposImp())
  const services = authServiceInterface(authServiceImp())



  const adminLogin = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    console.log(req.body,'33333111');
    const {email,password} = req.body
    await adminAuth(email,password,repository,services).then((result: any) => {
      res.json(result)
    })
    .catch((error: any) => {
      next(error)
    });

  })

  const adminStatus = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {block,email} = req.body
    console.log(req.body,"rrrr");
    
      await updateStatus(email,block,repository).then((result: any) => {
        res.json(result)
      })
      .catch((error: any) => {
        next(error)
      });
  })


  const blockPost = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {hide,image} = req.body
    console.log(req.body,"rrrr");
    
      await updatePostBlock(hide,image,postRepository).then((result: any) => {
        res.json(result)
      })
      .catch((error: any) => {
        next(error)
      });
  })

  


  return {
    adminLogin,
    adminStatus,
    blockPost
  }

}

export default adminController