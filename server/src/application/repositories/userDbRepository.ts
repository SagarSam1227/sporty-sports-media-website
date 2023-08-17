import { entityInterface} from "../../types/userInterface";
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository";

export const userDbRepository = (repository: ReturnType<userRepository>) => {

    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email)

    const registerUser = async (user: entityInterface) => await repository.addUser(user)

    const getUserById = async (id:string) => await repository.findUserById(id)

    const getUserByProperty = async(key:string,value:string) => await repository.findByProperty(key,value)

    const profileUpdate = async(id: string, username: string | undefined, image: string | undefined) => repository.updateProfile(id,username,image)

    return {
        getUserByEmail,
        registerUser,
        getUserById,
        getUserByProperty,
        profileUpdate
    }
}

export type userDbInterface = typeof userDbRepository;