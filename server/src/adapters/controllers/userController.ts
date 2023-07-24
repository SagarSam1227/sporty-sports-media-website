import asyncHandler from "express-async-handler"
import { Request,Response } from "express"
import { findByEmail } from "../../application/useCases/user/findByEmail"
import {createUser} from "../../application/useCases/user/createUser"
import { userDbInterface} from "../../application/repositories/userDbRepository"
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository"
import { userInterface } from "../../types/userInterface"

const userController = (
    userDbRepository:userDbInterface,
    userDbRepositoryImp:userRepository)=>{
    const dbRepositoryUser = userDbRepository(userDbRepositoryImp())

    const getUserByEmail = asyncHandler(async(req:Request,res:Response)=>{
        const {email} = req.body
        const user = await findByEmail(email,dbRepositoryUser)
        res.json(user)

        
    })

    const registerUser = asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body);
        
        const user:userInterface = req.body
       await createUser(user,dbRepositoryUser)
       
       res.json({
        status:'success'
       })

    })

    return {
        getUserByEmail,
        registerUser
    }

}

export default userController;