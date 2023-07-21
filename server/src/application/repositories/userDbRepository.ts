import { userInterface } from "../../types/userInterface";
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository";

export const userDbRepository = (repository: ReturnType<userRepository>) => {

    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email)

    const registerUser = async (user: userInterface) => await repository.addUser(user)

    return {
        getUserByEmail,
        registerUser
    }
}

export type userDbInterface = typeof userDbRepository;