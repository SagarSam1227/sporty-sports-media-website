import { AuthServiceReturn } from "../../frameworks/services/authServices"


export const authServiceInterface = (service: AuthServiceReturn) => {

    const encryptPassword = (password: string) => service.encryptPassword(password)

    const comparePassword = (password: string, hashedPassword: string) =>
        service.comparePassword(password, hashedPassword);

    const verifyToken = (token: string) => service.verifyToken(token)

    const generateToken = (payload: string) => service.generateToken(payload);

    return {
        encryptPassword,
         comparePassword,
         verifyToken,
         generateToken
    };

}

export type authServiceInterfaceType = typeof authServiceInterface