import asyncHandler from "express-async-handler"
import { NextFunction, Request, Response } from "express"
import registerUser from "../../application/useCases/user/register"
import { userDbInterface } from "../../application/repositories/userDbRepository"
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository"
import { authServiceInterfaceType } from "../../application/services/authServiceInterface"
import { AuthService } from "../../frameworks/services/authServices"
import findById from "../../application/useCases/user/findById"
import profileUpdate from "../../application/useCases/user/profileUpdate"


const userController = (
    userDbRepositoryInterface: userDbInterface,
    userDbReposImp: userRepository,
    authServiceInterface: authServiceInterfaceType,
    authServiceImp: AuthService) => {
    const repository = userDbRepositoryInterface(userDbReposImp())
    const services = authServiceInterface(authServiceImp())

    const createUser = (req: Request, res: Response, next: NextFunction) => {
        const { username, password, email, contact } = req.body;
        console.log(req.body);
        console.log(username);




        registerUser(username, email, password, contact, repository, services).then((result: object) => {
            res.json(result)
        }).catch((err: Error) => {
            next(err)
        });
    }

    const getProfileDetails = (req: Request, res: Response) => {
        const  userId:any = req.query?.userId
        console.log(userId,'userIdddddd');
        findById(userId, repository).then((response: object) => {
            console.log(response,'haaaaaaalooooo');
            res.json(response)
        })

    }

    const getUserDetails = (req: Request, res: Response) => {
        const { user } = req.payload
        console.log(user);
        findById(user.id, repository).then((response: object) => {
            console.log(response,'responsesssssssssss');
            
            res.json(response)
        })

    }

    const uploadProfile = (req:Request,res:Response) =>{
        const {user} = req.payload
        const {username} = req.body
        let filename
        if(req.body.imageUrl){
filename = req.body.imageUrl
        }else{
            filename = req.file?.filename
        }
        console.log(user.id);
        console.log(username);
        console.log(req.body,'bodyyy');
        
        
        
        profileUpdate(user.id,username,filename,repository).then((response:object)=>{
            console.log(response);
            res.json(true)
        })
        
        
        
        
    }


    return {
        createUser,
        getUserDetails,
        uploadProfile,
        getProfileDetails
    }

}

export default userController;