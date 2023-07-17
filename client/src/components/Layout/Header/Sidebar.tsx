import { useState } from "react";
import Login from "../../UserLogin/Login";

function Sidebar() {

    const [isMouseOver1, setIsMouseOver1] = useState(false)
    const [isMouseOver2, setIsMouseOver2] = useState(false)
    const [isMouseOver3, setIsMouseOver3] = useState(false)
    const [isMouseOver4, setIsMouseOver4] = useState(false)

    const [open, setOpen] = useState(false)
    const [isLoginClicked, setIsLoginClicked] = useState(false)


    return (
        <>

            <button className="md:hidden fixed top-0 left-0 w-16 ml-4 h-14 bg-[#f5f5f5] text-center">
                <img className="w-10 mt-4" src="/assets/logo-green.png" alt="cycle" />
            </button>

            <div className="md:float-left md:pb-56 md:w-56 h-14 md:h-auto w-4/5 mx-auto md:mx-0 flex flex-row md:fixed md:flex-col text-center sticky md:top-0 mt-full top-3/4 drop-shadow-2xl bg-[#f5f5f5] rounded-lg pt-4 pb-6">
                <button className="md:mb-12 hidden self-center md:flex flex-none "> <img className=" w-20 mt-4 " src="/assets/logo-green.png" alt="cycle" /></button>

                <button
                    onMouseOver={() => {
                        setIsMouseOver1(true);
                    }}
                    onMouseLeave={() => {
                        setIsMouseOver1(false);
                    }}
                    className={`md:py-4 py-0 w-40 md:w-auto self-center ml-5 flex md:mx-0 ${isMouseOver1 ? 'md:bg-[#f8feff]' : ''}`}
                >
                    <div className="flex-1 self-center">
                        <img className={`md:ml-16 ml-3 ${isMouseOver1 ? 'w-9' : 'w-8'}`} src="/assets/house.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12 text-[#808080]">Home</h4>
                </button>
                {isMouseOver1 ? <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr> : null}


                <button onMouseOver={() => {
                    setIsMouseOver2(true)
                }} onMouseLeave={() => {
                    setIsMouseOver2(false)
                }} className={`md:py-4 py-0 w-40 md:w-auto self-center flex md:mx-0  ${isMouseOver2 ? 'md:bg-[#f8feff]' : ''}`}>
                    <div className=" flex-1">
                        <img className={`md:ml-16 ml-3 ${isMouseOver2 ? 'w-9' : 'w-8'}`} src="/assets/news.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12  text-[#808080]">News</h4>


                </button>
                {isMouseOver2 ? <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr> : null}
                <button onMouseOver={() => {
                    setIsMouseOver3(true)
                }} onMouseLeave={() => {
                    setIsMouseOver3(false)
                }} className={`md:py-4 py-0 w-40 md:w-auto self-center flex md:mx-0  ${isMouseOver3 ? 'md:bg-[#f8feff]' : ''}`}>
                    <div className=" flex-1">
                        <img className={`md:ml-16 ml-3 ${isMouseOver3 ? 'w-9' : 'w-8'}`} src="/assets/create.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12 text-[#808080]">Create</h4>


                </button>
                {isMouseOver3 ? <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr> : null}
                <button onClick={() => {
                    setIsLoginClicked(true)
                    setOpen(true)
                }} onMouseOver={() => {
                    setIsMouseOver4(true)
                }} onMouseLeave={() => {
                    setIsMouseOver4(false)
                }} className={`md:py-4 py-0 w-40 md:w-auto self-center mr-7 flex md:mx-0  ${isMouseOver4 ? 'md:bg-[#f8feff]' : ''}`}>
                    <div className=" flex-1">
                        <img className={`md:ml-16 ml-3 ${isMouseOver4 ? 'w-9' : 'w-8'}`} src="/assets/services.png" alt="" />
                    </div>
                    <h4 className="font-semibold mr-10 flex-1 md:flex hidden ml-12 text-[#808080]">Services</h4>
                </button>
                {isMouseOver4 ? <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr> : null}
            </div>

            {isLoginClicked ? <Login open={open} setOpen={setOpen} /> : null}
           
        </>




    )
}

export default Sidebar;



