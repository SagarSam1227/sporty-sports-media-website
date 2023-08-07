import { useDispatch } from "react-redux"
import { setUser } from "../redux/Slices/userSlice"




export const handleItem = (email: string, username: string) => {

    const dispatch = useDispatch()

  dispatch(setUser({ email: email, username: username }))
}

