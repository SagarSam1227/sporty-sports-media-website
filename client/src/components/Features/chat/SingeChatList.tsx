import { Link, useNavigate } from "react-router-dom";
import { RootState, chatInterface } from "../../../vite-env";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleSetId } from "../../../redux/handleRedux";



function SingleChatList({chat}:{chat:chatInterface}){

    const userDetails: any = useSelector<RootState>((store) => store.user);
    const username = userDetails.items?.username;
    const currentChat: any = useSelector<RootState>((store) => store.currentChat);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hearer = chat?.members[0]?.membersId?.username==username?chat?.members[1]?.membersId:chat?.members[0]?.membersId;



    console.log(chat,'000000000');
    
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

    let profilePic

    if(hearer?.profile_picture){

        profilePic = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${hearer?.profile_picture}.jpg`;
    }else{
        profilePic = '/public/assets/avatar-svgrepo-com.png'
    }

    const chatClicked =async()=>{
        navigate('/inbox',{state:chat})
        console.log('in Chat list',currentChat);
       handleSetId(chat?.members[0]?.membersId?._id, dispatch)
        
    }

    const handleChatTime = ()=>{
        const time = chat?.latestMessage?.createdAt?chat?.latestMessage?.createdAt:chat?.createdAt
        if(time){
            const currDate = new Date()
            const date = new Date(time)
            if(currDate.getDate()!==date.getDate()){
                return date.toLocaleDateString()
            }else{
                return date.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                
            }
            
        }
        return 'df'
    }


    return (
        <>
        {/* <Link onClick={()=>{
            chatClicked()
        }} to='/inbox'> */}
                                <li onClick={()=>{
                                    chatClicked()
                                }} className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex ml-2"
                                     
                                    > 
                                      <div
              className="rounded-full h-10 w-10 bg-center bg-contain bg-no-repeat"
              style={{ backgroundImage: `url('${profilePic}')` }}
            ></div>

                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">{hearer?.username}</span> <span className="text-sm text-gray-400 truncate w-32">{chat?.latestMessage?.content}</span> </div>
                                    </div>
                                    <div className="flex flex-col items-center"> <span className="text-gray-300 text-xs">{handleChatTime()}</span> <i className="fa fa-star text-green-400"></i> </div>
                                </li>
                                {/* </Link> */}
        </>
    )
}

export default SingleChatList;