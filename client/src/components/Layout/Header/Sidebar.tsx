import { Link } from "react-router-dom";
import DarkModeContext from "../../../utils/DarkModeContext";
import { useState, useContext } from "react";

function Sidebar() {
    const { isDarkmode } = useContext(DarkModeContext)
    const [isMouseOver1, setIsMouseOver1] = useState(false)
    const [isMouseOver2, setIsMouseOver2] = useState(false)
    const [isMouseOver3, setIsMouseOver3] = useState(false)
    const [isMouseOver4, setIsMouseOver4] = useState(false)

    const [buttonClicked, setButtonClicked] = useState('home')



    if (isDarkmode) {
        return (
            <>

                <button className="md:hidden fixed top-0 left-0 w-16 ml-4 h-14 bg-[#f5f5f5] text-center">
                    <img className="w-10 mt-4" src="/assets/logo-green.png" alt="cycle" />
                </button>
                <div className=" md:hidden drop-shadow-lg fixed ml-24 md:pb-56 md:w-56 h-14 w-1/2 md:h-auto md:mx-0 flex md:fixed md:flex-col md:top-0 mt-full  rounded-lg pt-4 pb-6">
                    <input
                        type="search"
                        className="flex-1 w-1 rounded-xl p-2 h-6"
                        aria-label="Search"
                        aria-describedby="button-addon2" />
                    <button className="">
                        <img className="flex-1 mx-2 h-5" src="https://img.icons8.com/?size=512&id=Y6AAeSVIcpWt&format=png" alt="" />
                    </button>

                </div>

                <div className="md:float-left md:pb-56 md:w-56 h-14 md:h-auto w-4/5 mx-auto md:mx-0 flex flex-row md:fixed md:flex-col text-center sticky md:top-0 mt-full top-3/4 drop-shadow-2xl bg-[#21252b] rounded-lg pt-4 pb-6">
                    <button className="md:mb-12 hidden self-center md:flex flex-none "> <img className=" w-20 mt-4 " src="/assets/logo-darkmode.png" alt="cycle" /></button>
                   
                    <Link to="/home">
                        <button
                            onMouseOver={() => {
                                setIsMouseOver1(true);
                            }}
                            onMouseLeave={() => {
                                setIsMouseOver1(false);
                            }}

                            onClick={() => {
                                setButtonClicked('home')
                            }}

                            className={`md:py-4 py-0 w-40 md:w-auto self-center ml-5 flex md:mx-0 ${buttonClicked === 'home' || isMouseOver1 ? 'md:bg-[#0000005c]' : ''}`}
                        >
                            <div className="flex-1 self-center">
                                <img className={`md:ml-16 ml-3 ${isMouseOver1 || buttonClicked === 'home' ? 'w-9' : 'w-8'}`} src="/assets/home-darkmode.png" alt="" />
                            </div>
                            <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver1 || buttonClicked === 'home' ? "text-white" : "text-[#c6c4c4]"}`}>Home</h4>
                        </button>
                    </Link>
                    
                    {isMouseOver1 || buttonClicked === 'home' ? <hr className="h-0.5 bg-[#1c0000] border-0 dark:bg-gray-700"></hr> : null}

                    <Link to="/news">
                        <button onMouseOver={() => {
                            setIsMouseOver2(true)
                        }} onMouseLeave={() => {
                            setIsMouseOver2(false)
                        }}
                            onClick={() => {
                                setButtonClicked('news')
                            }} className={`md:py-4 py-0 w-40 md:w-auto self-center flex md:mx-0  ${buttonClicked === 'news' || isMouseOver2 ? 'md:bg-[#0000005c]' : ''}`}>
                            <div className=" flex-1">
                                <img className={`md:ml-16 ml-3 ${isMouseOver2 || buttonClicked === 'news' ? 'w-9' : 'w-8'}`} src="/assets/news.png" alt="" />
                            </div>
                            <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver2 || buttonClicked === 'news' ? "text-white" : "text-[#c6c4c4]"}`}>News</h4>


                        </button>
                    </Link>
                   
                    {isMouseOver2 || buttonClicked === 'news' ? <hr className="h-0.5 bg-[#1c0000] border-0 dark:bg-gray-700"></hr> : null}
                   
                    <Link to="/create">
                        <button onMouseOver={() => {
                            setIsMouseOver3(true)
                        }} onMouseLeave={() => {
                            setIsMouseOver3(false)
                        }}
                            onClick={() => {
                                setButtonClicked('create')
                            }} className={`md:py-4 py-0 w-40 md:w-auto self-center flex md:mx-0  ${buttonClicked === 'create' || isMouseOver3 ? 'md:bg-[#0000005c]' : ''}`}>
                            <div className=" flex-1">
                                <img className={`md:ml-16 ml-3 ${isMouseOver3 || buttonClicked === 'create' ? 'w-9' : 'w-8'}`} src="/assets/create.png" alt="" />
                            </div>
                            <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver3 || buttonClicked === 'create' ? "text-white" : "text-[#c6c4c4]"}`}>Create</h4>


                        </button>
                    </Link>
                    
                    {isMouseOver3 || buttonClicked === 'create' ? <hr className="h-0.5 bg-[#1c0000] border-0 dark:bg-gray-700"></hr> : null}
                   
                    <button onMouseOver={() => {
                        setIsMouseOver4(true)
                    }} onMouseLeave={() => {
                        setIsMouseOver4(false)
                    }}
                        onClick={() => {
                            setButtonClicked('services')
                        }} className={`md:py-4 py-0 w-40 md:w-auto self-center mr-7 flex md:mx-0  ${buttonClicked === 'services' || isMouseOver4 ? 'md:bg-[#0000005c]' : ''}`}>
                        <div className=" flex-1">
                            <img className={`md:ml-16 ml-3 ${isMouseOver4 || buttonClicked === 'services' ? 'w-9' : 'w-8'}`} src="/assets/services.png" alt="" />
                        </div>
                        <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver4 || buttonClicked === 'services' ? "text-white" : "text-[#c6c4c4]"}`}>Services</h4>
                    </button>
                    {isMouseOver4 || buttonClicked === 'services' ? <hr className="h-0.5 bg-[#1c0000] border-0 dark:bg-gray-700"></hr> : null}
                </div>


            </>

        )
    }
    return (
        <>

            <button className="md:hidden fixed top-0 left-0 w-16 ml-4 h-14 bg-[#f5f5f5] text-center">
                <img className="w-10 mt-4" src="/assets/logo-green.png" alt="cycle" />
            </button>
            <div className=" md:hidden drop-shadow-lg fixed ml-24 md:pb-56 md:w-56 h-14 w-1/2 md:h-auto md:mx-0 flex md:fixed md:flex-col md:top-0 mt-full  rounded-lg pt-4 pb-6">
                <input
                    type="search"
                    className="flex-1 w-1 rounded-xl p-2 h-6"
                    aria-label="Search"
                    aria-describedby="button-addon2" />
                <button className="">
                    <img className="flex-1 mx-2 h-5" src="https://img.icons8.com/?size=512&id=Y6AAeSVIcpWt&format=png" alt="" />
                </button>

            </div>

            <div className="md:float-left md:pb-56 md:w-56 h-14 md:h-auto w-4/5 mx-auto md:mx-0 flex flex-row md:fixed md:flex-col text-center sticky md:top-0 mt-full top-3/4 drop-shadow-2xl bg-[#f5f5f5] rounded-lg pt-4 pb-6">
                <button className="md:mb-12 hidden self-center md:flex flex-none "> <img className=" w-20 mt-4 " src="/assets/logo-green.png" alt="cycle" /></button>
                <Link to="/home">
                    <button
                        onMouseOver={() => {
                            setIsMouseOver1(true);
                        }}
                        onMouseLeave={() => {
                            setIsMouseOver1(false);
                        }}

                        onClick={() => {
                            setButtonClicked('home')
                        }} className={`md:py-4 py-0 w-40 md:w-auto self-center ml-5 flex md:mx-0 ${buttonClicked === 'home' || isMouseOver1 ? 'md:bg-[#f8feff]' : ''}`}
                    >
                        <div className="flex-1 self-center">
                            <img className={`md:ml-16 ml-3 ${isMouseOver1 || buttonClicked === 'home' ? 'w-9' : 'w-8'}`} src="/assets/house.png" alt="" />
                        </div>
                        <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver1 || buttonClicked === 'home' ? "text-slate-900" : "text-[#808080]"}`}>Home</h4>
                    </button>
                </Link>
                {isMouseOver1 || buttonClicked === 'home' ? <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr> : null}

                <Link to="/news">
                    <button onMouseOver={() => {
                        setIsMouseOver2(true)
                    }} onMouseLeave={() => {
                        setIsMouseOver2(false)
                    }}
                        onClick={() => {
                            setButtonClicked('news')
                        }} className={`md:py-4 py-0 w-40 md:w-auto self-center flex md:mx-0  ${buttonClicked === 'news' || isMouseOver2 ? 'md:bg-[#f8feff]' : ''}`}>
                        <div className=" flex-1">
                            <img className={`md:ml-16 ml-3 ${isMouseOver2 || buttonClicked === 'news' ? 'w-9' : 'w-8'}`} src="/assets/news.png" alt="" />
                        </div>
                        <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver2 || buttonClicked === 'news' ? "text-slate-900" : "text-[#808080]"}`}>News</h4>
                    </button>
                </Link>

                {isMouseOver2 || buttonClicked === 'news' ? <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr> : null}

                <Link to="create">
                    <button onMouseOver={() => {
                        setIsMouseOver3(true)
                    }} onMouseLeave={() => {
                        setIsMouseOver3(false)
                    }}
                        onClick={() => {
                            setButtonClicked('create')
                        }} className={`md:py-4 py-0 w-40 md:w-auto self-center flex md:mx-0  ${buttonClicked === 'create' || isMouseOver3 ? 'md:bg-[#f8feff]' : ''}`}>
                        <div className=" flex-1">
                            <img className={`md:ml-16 ml-3 ${isMouseOver3 || buttonClicked === 'create' ? 'w-9' : 'w-8'}`} src="/assets/create.png" alt="" />
                        </div>
                        <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver3 || buttonClicked === 'create' ? "text-slate-900" : "text-[#808080]"}`}>Create</h4>


                    </button>
                </Link>
                {isMouseOver3 || buttonClicked === 'create' ? <hr className="h-0.5 bg-[#e6e6e6] border-0  dark:bg-gray-700"></hr> : null}
                <button onMouseOver={() => {
                    setIsMouseOver4(true)
                }} onMouseLeave={() => {
                    setIsMouseOver4(false)
                }}
                    onClick={() => {
                        setButtonClicked('services')
                    }} className={`md:py-4 py-0 w-40 md:w-auto self-center mr-7 flex md:mx-0   ${buttonClicked === 'services' || isMouseOver4 ? 'md:bg-[#f8feff]' : ''}`}>
                    <div className=" flex-1">
                        <img className={`md:ml-16 ml-3 ${isMouseOver4 || buttonClicked === 'services' ? 'w-9' : 'w-8'}`} src="/assets/services.png" alt="" />
                    </div>
                    <h4 className={`font-semibold mr-10 flex-1 md:flex hidden ml-12  ${isMouseOver4 || buttonClicked === 'services' ? "text-slate-900" : "text-[#808080]"}`}>Services</h4>
                </button>
                {isMouseOver4 || buttonClicked === 'services' ? <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr> : null}
            </div>

        </>




    )
}

export default Sidebar;



