import asyncHandler from "express-async-handler"
import { NextFunction, Request, Response} from "express"
import registerUser from "../../application/useCases/user/register"
import { userDbInterface } from "../../application/repositories/userDbRepository"
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository"
import { authServiceInterfaceType } from "../../application/services/authServiceInterface"
import { AuthService } from "../../frameworks/services/authServices"
import findById from "../../application/useCases/user/findById"
import profileUpdate from "../../application/useCases/user/profileUpdate"
import findSomeOnesPost from "../../application/useCases/user/findSomeOnesPost"
import fetchUsers from "../../application/useCases/user/findAllUser"
import updateFollower from "../../application/useCases/user/updateFollower"
import updateFavorites from "../../application/useCases/user/updateFavorites"


const userController = (
    userDbRepositoryInterface: userDbInterface,
    userDbReposImp: userRepository,
    authServiceInterface: authServiceInterfaceType,
    authServiceImp: AuthService) => {
    const repository = userDbRepositoryInterface(userDbReposImp())
    const services = authServiceInterface(authServiceImp())

    const createUser = asyncHandler((req: Request, res: Response, next: NextFunction) => {
        const { username, password, email, contact } = req.body;
        console.log(req.body);
        console.log(username);
        registerUser(username, email, password, contact, repository, services).then((result: object) => {
            res.json(result)
        }).catch((err: Error) => {
            next(err)
        });
    })

    const getProfileDetails = asyncHandler((req: Request, res: Response,next: NextFunction) => {
        const  userId:any = req.query?.userId
        console.log(userId,'userIdddddd');
        findById(userId, repository).then((response: object) => {
            console.log(response,'haaaaaaalooooo');
            res.json(response)
        }).catch((err: Error) => {
            next(err)
        });

    })

    const getUserDetails = asyncHandler((req: Request, res: Response,next: NextFunction) => {
        const { user } = req.payload
        console.log(user);
        findById(user.id, repository).then((response: object) => {
            console.log(response,'responsesssssssssss');
            
            res.json(response)
        }).catch((err: Error) => {
            next(err)
        });

    })

    const uploadProfile = asyncHandler((req: Request,res:Response,next: NextFunction) =>{
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
        }).catch((err: Error) => {
            next(err)
        });
        
    })


    const fetchSomeOnesPost = asyncHandler((req:Request,res:Response,next:NextFunction)=>{
        console.log(req.query.username,'username');
        const username:any = req?.query?.username

       findSomeOnesPost(username,repository).then((response:any)=>{
        console.log(response,'0000000');
        res.json(response)
        
       }).catch((error:Error)=>{
        next(error)
       })
        
    })

    const getAllUsers = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
        await fetchUsers(repository).then((response:any)=>{
              res.json(response)
          }).catch((error:any)=>{
            next(error)
          })
      })

      const setFollower = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
        console.log(req.body);
        const {flag,follower,username} = req.body
        await updateFollower(flag,follower,username,repository).then((response:any)=>{
            console.log(response);
            
              res.json(response)
          }).catch((error:any)=>{
            next(error)
          })
      })

      const addToFavorites = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
        console.log(req.body);
        const {flag,image,username} = req.body
        await updateFavorites(flag,image,username,repository).then((response:any)=>{
            console.log(response);
            
              res.json(response)
          }).catch((error:any)=>{
            next(error)
          })
      })


    return {
        createUser,
        getUserDetails,
        uploadProfile,
        getProfileDetails,
        fetchSomeOnesPost,
        getAllUsers,
        setFollower,
        addToFavorites
    }

}

export default userController;