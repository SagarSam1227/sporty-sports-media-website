import { setUser } from "../redux/Slices/userSlice"



export const handleItem = (email: string, username: string,dispatch:any)=> {
  dispatch(setUser({ email: email, username: username }))
}

