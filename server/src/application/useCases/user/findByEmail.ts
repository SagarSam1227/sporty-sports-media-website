import { userDbInterface } from "../../../application/repositories/userDbRepository"


export const findByEmail = async(email:string,dbRepositoryUser:ReturnType<userDbInterface>)=>{
    const user = await dbRepositoryUser.getUserByEmail(email)
    if(user){
        console.log('user: ',user);
        return user
    }else{
        console.log('no user with emailId - ',email);
    }
}