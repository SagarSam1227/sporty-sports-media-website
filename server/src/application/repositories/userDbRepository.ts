import { entityInterface, googleAuth} from "../../types/userInterface";
import { userRepository } from "../../frameworks/database/mongoDB/repositories/userRepository";

export const userDbRepository = (repository: ReturnType<userRepository>) => {

    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email)

    const registerUser = async (user: entityInterface) => await repository.addUser(user)

    const getUserById = async (id:string) => await repository.findUserById(id)

    const getUserByProperty = async(key:string,value:string) => await repository.findByProperty(key,value)

    const profileUpdate = async(id: string, username: string | undefined, image: string | undefined) => repository.updateProfile(id,username,image)

    const getSomeOnesPost = async(username:string) => await repository.findSomeOnesPost(username)

    const googleAuth = async(data:googleAuth)=> await repository.userGoogleAuth(data)

    const getAdmin = async (email: string) => await repository.findAdmin(email)

    const fetchUsers = async () => await repository.findAllUser()

    const updateStatus = async(email:string,status:boolean) => await repository.setStatus(email,status)

    const updateFollower = async(flag:string,follower:string,username:string) => await repository.modifyFollower(flag,follower,username)

    const updateFavorites = async(flag:string,image:string,username:string) => await repository.modifyFavorites(flag,image,username)

    return {
        getUserByEmail,
        registerUser,
        getUserById,
        getUserByProperty,
        profileUpdate,
        getSomeOnesPost,
        googleAuth,
        getAdmin,
        fetchUsers,
        updateStatus,
        updateFollower,
        updateFavorites
    }
}

export type userDbInterface = typeof userDbRepository;