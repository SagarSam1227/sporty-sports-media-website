import { useDispatch } from "react-redux";
import { RootState } from "../../vite-env";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clearUserDetails } from "../../redux/Slices/userSlice";



function UserProfile() {

    const userDetails:any= useSelector<RootState>((store) => store.user);

    const username = userDetails.items?.username

    const dispatch = useDispatch()

    const handleItem = () => {
        dispatch(clearUserDetails())
    }


    
    


    return (

        <>
            <div className="w-[19rem] mx-8 h-[32rem] hidden md:block drop-shadow-2xl bg-[#f5f5f5] rounded-2xl float-right">
                <div className=" h-10">
                    <div className="w-[1.5rem] h-[1.5rem] float-right mt-[0.5rem] mr-[1rem]">
                        <img src="https://img.icons8.com/?size=512&id=UlOVIfVgfNz1&format=png" alt="" />
                    </div>
                </div>
                <div className="h-28 text-center">
                    <div className="rounded-full bg-[url('/public/assets/linkedInmain.png')] h-28 w-28 mx-[6rem] bg-repeat-round">
                    </div>
                </div>
                <div className="h-[1.5rem]">
                    <h1 className="font-bold text-lg text-center mt-[1rem] text-gray-950">{username}</h1>
                <hr className="w-[14rem] mx-[2.5rem] mt-[2rem] mb-3" />
                </div>
                <button className="h-16 w-full hover:bg-[#f8feff] mt-[3rem]">
                    <h1 className="font-semibold text-[#808080] hover:text-black">My Profile</h1>
                </button>
                <button className="h-16 w-full hover:bg-[#f8feff]">
                    <h1 className="font-semibold text-[#808080] hover:text-black">Messages</h1>
                </button>
                <button className="h-16 w-full hover:bg-[#f8feff]">
                    <h1 className="font-semibold text-[#808080] hover:text-black">Favorites</h1>
                </button>
                <button  onClick={()=>{
                    handleItem()
                }} className="h-16 w-full hover:bg-[#f8feff]">
                    <h1 className="font-semibold text-[#808080] hover:text-[#196180]">Logout</h1>
                </button>
            </div> 

        </>
    )
}

export default UserProfile;

