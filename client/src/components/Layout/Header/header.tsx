import { useState } from "react";
import Login from "../../UserLogin/Login";

function Header() {

    const [isMouseOver1,setIsMouseOver1] = useState(false)
    const [isMouseOver2,setIsMouseOver2] = useState(false)
    const [isMouseOver3,setIsMouseOver3] = useState(false)
    const [isMouseOver4,setIsMouseOver4] = useState(false)

    const [open,setOpen] = useState(false)
    const [isLoginClicked,setIsLoginClicked] = useState(false)


    return (

        <>
            <div className="md:w-56 h-14 md:h-auto w-full flex flex-row md:flex-col text-center sticky top-0 drop-shadow-2xl bg-[#f5f5f5] rounded-lg pt-4  pb-6 ">
                <button className="mb-12"> <img className=" w-20 mt-4" src="/assets/logo-green.png" alt="cycle" /></button>
                <button onMouseOver={()=>{
                    setIsMouseOver1(true)
                }} onMouseLeave={()=>{
                    setIsMouseOver1(false)
                }} className={`md:py-4 py-0 flex  ${isMouseOver1?'bg-[#f8feff]':''}`}>
                    <div className=" flex-1">
                    <img className={`md:ml-16 ml-3 ${isMouseOver1?'w-9':'w-8'}`} src="/assets/house.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12 text-[#808080]">Home</h4>
                </button>
                {isMouseOver1?<hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>:null}
                <button onMouseOver={()=>{
                    setIsMouseOver2(true)
                }} onMouseLeave={()=>{
                    setIsMouseOver2(false)
                }} className={`md:py-4 py-0 flex  ${isMouseOver2?'bg-[#f8feff]' :''}`}>
                    <div className=" flex-1">
                    <img className={`md:ml-16 ml-3 ${isMouseOver2?'w-9':'w-8'}`} src="/assets/news.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12  text-[#808080]">News</h4>
                   
                    
                </button>
                {isMouseOver2?<hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>:null}
                <button onMouseOver={()=>{
                    setIsMouseOver3(true)
                }} onMouseLeave={()=>{
                    setIsMouseOver3(false)
                }} className={`md:py-4 py-0 flex  ${isMouseOver3?'bg-[#f8feff]':''}`}>
                    <div className=" flex-1">
                    <img className={`md:ml-16 ml-3 ${isMouseOver3?'w-9':'w-8'}`} src="/assets/create.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12 text-[#808080]">Create</h4>
                   
                    
                </button>
                {isMouseOver3?<hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>:null}
                <button onClick={()=>{
                    setIsLoginClicked(true)
                    setOpen(true)
                }} onMouseOver={()=>{
                    setIsMouseOver4(true)
                }} onMouseLeave={()=>{
                    setIsMouseOver4(false)
                }} className={`md:py-4 py-0 flex  ${isMouseOver4?'bg-[#f8feff]':''}`}>
                    <div className=" flex-1">
                    <img className={`md:ml-16 ml-3 ${isMouseOver4?'w-9':'w-8'}`} src="/assets/services.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12 text-[#808080]">Services</h4>
                </button>
                {isMouseOver4?<hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>:null}
            </div>
            {isLoginClicked ? <Login open={open} setOpen={setOpen}/> : null}

        </>


       

    )
}

export default Header;



