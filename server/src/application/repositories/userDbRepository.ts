import { entityInterface, userInterface } from "../../types/userInterface";
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository";

export const userDbRepository = (repository: ReturnType<userRepository>) => {

    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email)

    const registerUser = async (user: entityInterface) => await repository.addUser(user)

    const getUserById = async (id:string) => await repository.findUserById(id)

    const getUserByProperty = async(key:string,value:string) => await repository.findByProperty(key,value)

    return {
        getUserByEmail,
        registerUser,
        getUserById,
        getUserByProperty
    }
}

export type userDbInterface = typeof userDbRepository;