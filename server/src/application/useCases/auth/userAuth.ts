import { payloadInterface } from "../../../types/userInterface";
import { ValidationErr } from "../../../frameworks/webserver/errors/validationErr";


const userAuth = async(email: string, password: string, userDbRepository: any, userAuthService: any) => {

  return await userDbRepository.getUserByEmail(email).then(async (user: any) => {
    if (!user) {
      throw new ValidationErr('Enter valid email')
    }
    console.log(user,'............userrrrrrrrrr');
    
    const isPasswordMatched =await userAuthService.comparePassword(password, user.password)
    
    if (!isPasswordMatched) {
      throw new ValidationErr('enter valid password')
    }

    if(user.blocked){
      throw new ValidationErr('you have been blocked by admin')
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
 


export default userAuth;