import { useContext, useEffect, useState } from "react";
import DarkModeContext from "../../../utils/DarkModeContext";
import { fetchChatListUrl } from "../../../api/axiosConnection";
import SingleChatList from "./SingeChatList";
import { chatInterface } from "../../../vite-env";



function ChatList() {

    const { isDarkmode } = useContext(DarkModeContext)
    const [chatList,setChatList] = useState<Array<chatInterface>>()

    useEffect(()=>{
        fetchChatListUrl(setChatList).then((response)=>{
            console.log(response);
            
        }).catch((error)=>{
            console.log(error);
            
        })
        
    },[])

    

    if(isDarkmode) {
        return (
            <>
                <div className="w-full h-[26rem] bg-[#21252b] overflow-y-scroll no-scrollbar">
                    <div className="max-w-md mx-auto shadow-lg  overflow-hidden md:max-w-lg">
                        <div className="md:flex">
                            <div className="w-full p-4">
                                <div className="relative">
                                    <input type="text" className="w-full h-12 rounded focus:outline-none bg-[#15181b] px-3 focus:shadow-md" placeholder="Search..." /> <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i> </div>
                                <ul>
                                    <li className="flex justify-between items-center bg-[#21252b] mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                        <div className="flex ml-2"> <img src="https://i.imgur.com/aq39RMA.jpg" width="40" height="40" className="rounded-full" />
                                            <div className="flex flex-col ml-2"> <span className="font-medium text-[#c3bbbb]">Jessica Koel</span> <span className="text-sm text-gray-400 truncate w-32">Hey, Joel, I here to help you out please tell me</span> </div>
                                        </div>
                                        <div className="flex flex-col items-center"> <span className="text-gray-300">11:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                    </li>
                                    <hr className=" border-[#15181b] my-2" />

                                    <li className="flex justify-between items-center bg-[#21252b] mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                        <div className="flex ml-2"> <img src="https://i.imgur.com/eMaYwXn.jpg" width="40" height="40" className="rounded-full" />
                                            <div className="flex flex-col ml-2"> <span className="font-medium text-[#c3bbbb]">Komeial Bolger</span> <span className="text-sm text-gray-400 truncate w-32">I will send you all documents as soon as possible</span> </div>
                                        </div>
                                        <div className="flex flex-col items-center"> <span className="text-gray-300">12:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                    </li>
                                    <hr className=" border-[#15181b] my-2" />

                                    <li className="flex justify-between items-center bg-[#21252b] mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                        <div className="flex ml-2"> <img src="https://i.imgur.com/zQZSWrt.jpg" width="40" height="40" className="rounded-full" />
                                            <div className="flex flex-col ml-2"> <span className="font-medium text-[#c3bbbb]">Tamaara Suiale</span> <span className="text-sm text-gray-400 truncate w-32">Are you going to business trip next week</span> </div>
                                        </div>
                                        <div className="flex flex-col items-center"> <span className="text-gray-300">8:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                    </li>
                                    <hr className=" border-[#15181b] my-2" />

                                    <li className="flex justify-between items-center bg-[#21252b] mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                        <div className="flex ml-2"> <img src="https://i.imgur.com/agRGhBc.jpg" width="40" height="40" className="rounded-full" />
                                            <div className="flex flex-col ml-2"> <span className="font-medium text-[#c3bbbb]">Sam Nielson</span> <span className="text-sm text-gray-400 truncate w-32">I suggest to start new business soon</span> </div>
                                        </div>
                                        <div className="flex flex-col items-center"> <span className="text-gray-300">7:16</span> <i className="fa fa-star text-green-400"></i> </div>
                                    </li>
                                    <hr className=" border-[#15181b] my-2" />

                                    <li className="flex justify-between items-center bg-[#21252b] mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                        <div className="flex ml-2"> <img src="https://i.imgur.com/uIgDDDd.jpg" width="40" height="40" className="rounded-full" />
                                            <div className="flex flex-col ml-2"> <span className="font-medium text-[#c3bbbb]">Caroline Nexon</span> <span className="text-sm text-gray-400 truncate w-32">We need to start new reseatch center.</span> </div>
                                        </div>
                                        <div className="flex flex-col items-center"> <span className="text-gray-300">9:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                    </li>
                                    <hr className=" border-[#15181b] my-2" />

                                    <li className="flex justify-between items-center bg-[#21252b] mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                        <div className="flex ml-2"> <img src="https://i.imgur.com/tT8rjKC.jpg" width="40" height="40" className="rounded-full" />
                                            <div className="flex flex-col ml-2"> <span className="font-medium text-[#c3bbbb]">Patrick Koeler</span> <span className="text-sm text-gray-400 truncate w-32">May be yes</span> </div>
                                        </div>
                                        <div className="flex flex-col items-center"> <span className="text-gray-300">3:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                    </li>
                                    <hr className=" border-[#15181b] my-2" />

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
    } return (
        <>
            <div className="w-full h-[26rem] bg-gray-100 overflow-y-scroll no-scrollbar">
                <div className="max-w-md mx-auto  overflow-hidden md:max-w-lg">
                    <div className="md:flex">
                        <div className="w-full p-4">
                            <div className="relative">
                                <input type="text" className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md" placeholder="Search..." /> <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i> </div>
                            <ul>

                            {chatList?.map((chat)=>{
                                return(
                                    <>
                                    <SingleChatList chat={chat} />
                                    </>
                                )
                            })}


                                {/* <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex ml-2"> <img src="https://i.imgur.com/eMaYwXn.jpg" width="40" height="40" className="rounded-full" />
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">Komeial Bolger</span> <span className="text-sm text-gray-400 truncate w-32">I will send you all documents as soon as possible</span> </div>
                                    </div>
                                    <div className="flex flex-col items-center"> <span className="text-gray-300">12:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                </li>

                                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex ml-2"> <img src="https://i.imgur.com/zQZSWrt.jpg" width="40" height="40" className="rounded-full" />
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">Tamaara Suiale</span> <span className="text-sm text-gray-400 truncate w-32">Are you going to business trip next week</span> </div>
                                    </div>
                                    <div className="flex flex-col items-center"> <span className="text-gray-300">8:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                </li>

                                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex ml-2"> <img src="https://i.imgur.com/agRGhBc.jpg" width="40" height="40" className="rounded-full" />
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">Sam Nielson</span> <span className="text-sm text-gray-400 truncate w-32">I suggest to start new business soon</span> </div>
                                    </div>
                                    <div className="flex flex-col items-center"> <span className="text-gray-300">7:16</span> <i className="fa fa-star text-green-400"></i> </div>
                                </li>

                                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex ml-2"> <img src="https://i.imgur.com/uIgDDDd.jpg" width="40" height="40" className="rounded-full" />
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">Caroline Nexon</span> <span className="text-sm text-gray-400 truncate w-32">We need to start new reseatch center.</span> </div>
                                    </div>
                                    <div className="flex flex-col items-center"> <span className="text-gray-300">9:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                </li>

                                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex ml-2"> <img src="https://i.imgur.com/tT8rjKC.jpg" width="40" height="40" className="rounded-full" />
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">Patrick Koeler</span> <span className="text-sm text-gray-400 truncate w-32">May be yes</span> </div>
                                    </div>
                                    <div className="flex flex-col items-center"> <span className="text-gray-300">3:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                </li> */}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ChatList;
       