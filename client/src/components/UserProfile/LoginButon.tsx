import {useState} from "react"
import Login from "../UserLogin/Login"


function LogInButton(){
    const [isLoginClicked, setIsLoginClicked] = useState(false)
    const [open,setOpen] = useState(false)

    return(
        <>
        <button onClick={() => {
            setIsLoginClicked(true)
            setOpen(true)
        }} className="w-[5rem] mx-8 h-[2rem] hidden md:block drop-shadow-2xl bg-[#000000] rounded-2xl float-right text-blue-50 text-sm fixed ml-[70rem] mt-[0.25rem]">
            LOGIN
    </button> 
    {isLoginClicked ? <Login open={open} setOpen={setOpen} /> : null}
    </>
    )
}


export default LogInButton;