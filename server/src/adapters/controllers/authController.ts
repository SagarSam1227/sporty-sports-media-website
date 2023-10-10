import { userDbInterface } from "../../application/repositories/userDbRepository";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository";
import { AuthService } from "../../frameworks/services/authServices";
import asyncHandler from "express-async-handler";
import { NextFunction, Request } from "express";
import { Response } from "express";
import userAuth from "../../application/useCases/auth/userAuth";
import googleAuth from "../../application/useCases/auth/googleAuth";

const authController = (
  userDbRepositoryInterface: userDbInterface,
  userDbReposImp: userRepository,
  authServiceInterface: authServiceInterfaceType,
  authServiceImp: AuthService) => {

  const repository = userDbRepositoryInterface(userDbReposImp())
  const services = authServiceInterface(authServiceImp())

  const userLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    console.log('checkpoint 1',req.body);
    
  await userAuth(email, password, repository, services)
      .then((result: any) => {
        res.json(result)
      })
      .catch((error: any) => {
        next(error)
      });
  })

  const userGoogleAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body,'33333111');
    await googleAuth(req.body,repository,services).then((result: any) => {
      res.json(result)
    })
    .catch((error: any) => {
      next(error)
    });
    
  })

  return {
    userLogin,
    userGoogleAuth
  }

}
export default authController;