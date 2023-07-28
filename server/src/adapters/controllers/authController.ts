import { userDbInterface } from "../../application/repositories/userDbRepository";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository";
import { AuthService } from "../../frameworks/services/authServices";
import asyncHandler from "express-async-handler";
import { NextFunction, Request } from "express";
import { Response } from "express";
import userAuth from "../../application/useCases/auth/userAuth";

const authController = (
  userDbRepositoryInterface: userDbInterface,
  userDbReposImp: userRepository,
  authServiceInterface: authServiceInterfaceType,
  authServiceImp: AuthService) => {

  const repository = userDbRepositoryInterface(userDbReposImp())
  const services = authServiceInterface(authServiceImp())

  const userLogin= asyncHandler(async (req: Request, res: Response ,next:NextFunction) => {
    const { email,password } = req.body
    console.log(req.body,'req.bodyyyyyyyyyyyy');
    

    
     userAuth(email, password, repository, services)
     .then((result:any) =>{
      res.json(result)
    })
     .catch((error:any) => {
      next(error)
    });
}) 

return {
  userLogin,
}

}
export default authController;