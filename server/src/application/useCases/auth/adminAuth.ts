import { ValidationErr } from "../../../frameworks/webserver/errors/validationErr";
import { googleAuth, payloadInterface } from "../../../types/userInterface";

const adminAuth = async(email: string, password: string, userDbRepository: any, userAuthService: any) => {

    return await userDbRepository.getAdmin(email).then(async (user: any) => {
      if (!user) {
        throw new ValidationErr('Enter valid email')
      }
      console.log(user,'............userrrrrrrrrr');
      
      
      if (password!=user.password) {
        throw new ValidationErr('enter valid password')
      }
  
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
  
    })
        
  }


  export default adminAuth;