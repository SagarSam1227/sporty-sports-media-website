import asyncHandler from "express-async-handler"
import { NextFunction, Request, Response } from "express"
import registerUser from "../../application/useCases/user/register"
import { userDbInterface } from "../../application/repositories/userDbRepository"
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository"
import { authServiceInterfaceType } from "../../application/services/authServiceInterface"
import { AuthService } from "../../frameworks/services/authServices"
import findById from "../../application/useCases/user/findById"


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

    const getUserDetails = (req: Request, res: Response) => {
        const { user } = req.payload
        console.log(user);
        findById(user.id, repository).then((response: object) => {
            res.json(response)
        })

    }


    return {
        createUser,
        getUserDetails
    }

}

export default userController;