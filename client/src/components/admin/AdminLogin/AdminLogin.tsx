
import { Fragment, useRef, useState, useEffect } from "react";
import { adminLoginUrl } from "../../../api/axiosConnection";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader/Header";
import UserNotFound from "../../../utils/modal/UserNotFound";


function AdminLogin(){

    const [password,setPassword] = useState<string>('')
    const [admin,setAdmin] = useState<string>('')
    const [isAdminNotExist,setIsAdminNotExist] = useState<boolean>(false)
    const [adminLoginErr,setAdminLoginErr] = useState<string >('')
    const [isLoginClicked,setIsLoginClicked] = useState<boolean>(false)
    const [isDashBoard,setIsDashBoard] = useState<boolean>(localStorage.getItem('adminToken')?true:false)
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    const handleSubmit = ()=>{
        setIsLoginClicked(true)
    }

    const dismissUserNotFound: ()=>void=()=>{
        setIsAdminNotExist(false)
    }
    
    useEffect(()=>{
        if(isLoginClicked){
            adminLoginUrl(admin,password,setIsAdminNotExist,setAdminLoginErr,setIsDashBoard)
        }
    },[isLoginClicked])

    if(isDashBoard){
        return (
            <>
            <AdminHeader setIsDashBoard={setIsDashBoard}/>
            </>
        )
    }

    return (
       
        <>

<div className="bg-black">
    <div className="mt-10 fixed pin flex items-center">
        <div className="fixed pin bg-black opacity-75 z-10"></div>

        <div className="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3 z-20 m-8">
            <div className="shadow-lg mx-[13rem] bg-[#ffffff9b] rounded-lg p-8 w-[22rem]">
                <div className="flex justify-end mb-6">
                </div>

                <h1 className="text-center text-lg font-semibold text-green-dark">LOGIN</h1>

                <form className="pt-6 pb-2 my-2">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input onChange={(e)=>{
                            setAdmin(e.target.value)
                        }} className="appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="Email Address"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input onChange={(e)=>{
                            setPassword(e.target.value)
                        }} className=" appearance-none border rounded-full w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="Password" />
                    </div>
                    <div className="block md:flex items-center justify-between">
                        <div className="w-full">
                            <button onClick={()=>{
                                handleSubmit()
                            }} className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 bg-black w-full rounded-full border-b-4 border-green-darkest" type="button">
                                Sign In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
{isAdminNotExist ? <UserNotFound message1={'User not found '} message2={adminLoginErr} onUserDismiss={dismissUserNotFound} /> : null}

    </>
    )
}


export default AdminLogin;