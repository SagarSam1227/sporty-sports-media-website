import { Link } from "react-router-dom";
import { chatInterface } from "../../../vite-env";



function SingleChatList({chat}:{chat:chatInterface}){

    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

    let profilePic

    if(chat?.members[0]?.membersId?.profile_picture){

        profilePic = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${chat?.members[0]?.membersId?.profile_picture}.jpg`;
    }else{
        profilePic = '/public/assets/avatar-svgrepo-com.png'
    }


    return (
        <>
        <Link to='/inbox'>
                                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex ml-2"> <img src={profilePic} width="40" height="40" className="rounded-full" />
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">{chat?.members[0]?.membersId?.username}</span> <span className="text-sm text-gray-400 truncate w-32">{chat?.members[0]?.membersId?.username}</span> </div>
                                    </div>
                                    <div className="flex flex-col items-center"> <span className="text-gray-300">11:26</span> <i className="fa fa-star text-green-400"></i> </div>
                                </li>
                                </Link>
        </>
    )
}

export default SingleChatList;