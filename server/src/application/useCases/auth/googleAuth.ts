import { googleAuth, payloadInterface } from "../../../types/userInterface";

const googleAuth = async(data:googleAuth,userDbRepository: any, userAuthService: any)=>{

    const user = await userDbRepository.googleAuth(data)
    console.log(user,'saveddd...');
    
    
    const payload: payloadInterface = {
        user: {
          id: user._id
        }
      };
      const token =await userAuthService.generateToken(payload)
      return {
        token,
        user
      }
}

export default googleAuth;