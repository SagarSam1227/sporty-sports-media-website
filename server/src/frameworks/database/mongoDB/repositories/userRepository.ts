import { userInterface } from "../../../../types/userInterface";
import User from "../models/userModel";

export const userRepository = () => {
    const addUser = async (user: {
        username: string;
        email: string;
        password?: string;
    }) => {
        return await User.create(user)
    }

    const getUserByEmail = async (email: String) => {
        const user: userInterface | null = await User.findOne({ email: email })
        return user;

    }

    return {
        getUserByEmail,
        addUser,
    }
}

export type userRepository = typeof userRepository;