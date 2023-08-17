import { setUser } from "../redux/Slices/userSlice"



export const handleItem = (email: string, username: string,image:string | null,dispatch:any)=> {
  dispatch(setUser({ email: email, username: username ,image:image}))
}

