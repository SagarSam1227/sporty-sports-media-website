import Login from "../UserLogin/Login";
import {useState} from 'react'
import {Link} from "react-router-dom"

function LandingPage() {
    const [open,setOpen] = useState(false)
    const [isSignupPage,setIsSignupPage] =useState(false)
    const [isLoginClicked, setIsLoginClicked] = useState(false)
    return (
        <>
            <div className="absolute flex w-full">
                <div className=" w-9/12 flex-none">
                   <button> <img className=" w-20 mt-7 ml-7" src="/assets/logo_transparent.png" alt="" /></button>
                </div>
                <div className=" flex-auto">
                    <div className=" float-left mt-11 ml-20">
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className=" text-[#faebd7] rounded-full bg-[#00000073] font-roboto" >
                            <h4 onClick={()=>{
                                setIsLoginClicked(true)
                                setOpen(true)
                            }} className="text-xs mx-4 my-1">Sign In</h4>
                        </button>
                    </div>
                    <div className="  float-left mt-11 ml-4">
                        <button className=" text-[#faebd7] rounded-full bg-[#00000073]">
                        <Link className="mx-4 my-1 text-xs" to={"/home"}>Home</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute mt-52
              font-bold text-center" >
                <h1 className="text-[#faebd7] text-8xl">You were meant</h1>
                <h1 className="text-9xl">to be here.</h1>
                <h1 className="text-[#faebd7] text-8xl">This moment is</h1>
                <h1 className="text-9xl">yours</h1>
            </div>
            {isLoginClicked ? <Login open={open} setOpen={setOpen} isSignupPage={isSignupPage} setIsSignupPage={setIsSignupPage}/> : null}
            <img 
            className=""
             src="https://images.pexels.com/photos/1564868/pexels-photo-1564868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        </>
    )
}


export default LandingPage;




