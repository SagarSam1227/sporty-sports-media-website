import { payloadInterface } from "../../../types/userInterface";


const userAuth = async(email: string, password: string, userDbRepository: any, userAuthService: any) => {

  return userDbRepository.getUserByEmail(email).then(async (user: any) => {
    if (!user) {
      throw new Error('Enter valid email')
    }
    console.log(user,'............userrrrrrrrrr');
    
    const isMatch =await userAuthService.comparePassword(password, user.password)
    console.log(isMatch,'booleaaaannn');
    
    if (!isMatch) {
      throw new Error('enter valid password')
    }

    const payload: payloadInterface = {
      user: {
        id: user._id
      }
    };
    const token = userAuthService.generateToken(payload)
    return {
      token,
      user
    }

  })
      
}
 


export default userAuth;