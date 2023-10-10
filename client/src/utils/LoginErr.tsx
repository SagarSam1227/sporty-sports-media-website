import {useState} from "react"
import Login from "../components/UserLogin/Login"


function LoginInvoke(){
    const [open,setOpen] = useState(true)

    return(
        <>
   <Login open={open} setOpen={setOpen}/>
    </>
    )
}


export default LoginInvoke;