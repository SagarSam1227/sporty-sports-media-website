import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useContext } from "react";
import DarkModeContext from "../../utils/DarkModeContext";
import { darkmodeInterface } from "../../vite-env";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const username = userDetails.items?.username;
  const image = userDetails.items?.image;
  // const [buttonClicked,setButtonClicked] = useState<string>('')
  const { isDarkmode }: darkmodeInterface = useContext(DarkModeContext);
  const CLOUD_NAME = process.env.VITE_CLOUD_NAME as string;
  
  const myPosts = userDetails.items?.posts
    const following = userDetails.items?.following
    const followers = userDetails.items?.followers
  const navigate = useNavigate()

  console.log(userDetails.items,'favoritesss');
  



  let profilePic = ""
  console.log(image);
  
  if(image){
    console.log(true);
    
    if(image.includes('google')){
      console.log('trueeeeeee');
      profilePic = '/public/assets/avatar-svgrepo-com.png'
     
      
    }else{
      profilePic = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${image}.jpg`
    }
  }else{
    profilePic = '/public/assets/avatar-svgrepo-com.png'
  }



  if (isDarkmode) {
    return (
        <>
      <div className="h-28 text-center">
      <div className="rounded-full h-28 w-28 mx-[6rem] bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url('${profilePic}')` }}></div>
      </div>
      <div className="h-[1.5rem]">
        <h1 className="font-bold text-lg text-center mt-[1rem] text-white">
          {username}
        </h1>
        <hr className="w-[14rem] mx-[2.5rem] mt-[2rem] mb-3" />
      </div>
      <button className="h-12 w-full  hover:bg-[black] mt-[3rem]">
        <h1 className="font-semibold text-[#c6c4c4]">Posts 0</h1>
      </button>
      <button className="h-12 w-full hover:bg-[black]">
        <h1 className="font-semibold text-[#c6c4c4]">Followers 0</h1>
      </button>
      <button className="h-12 w-full hover:bg-[black]">
        <h1 className="font-semibold text-[#c6c4c4]">Following 0</h1>
      </button>
    </>
    )
  }
  return (
    <>
      <div onClick={()=>{
        navigate('/user-info',{state:username})
      }} className="h-28 text-center">
      <div className="rounded-full h-28 w-28 mx-[6rem] bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url('${profilePic}')` }}></div>
      </div>
      <div onClick={()=>{
        navigate('/user-info',{state:username})
      }} className="h-[1.5rem]">
        <h1 className="font-bold text-lg text-center mt-[1rem] text-gray-950">
          {username}
        </h1>
        <hr className="w-[14rem] mx-[2.5rem] mt-[2rem] mb-3" />
      </div>
      <button onClick={()=>{
        // setButtonClicked('post')
      }} className="h-12 w-full hover:bg-[#f8feff] mt-[3rem]">
        {myPosts?
        <h1 className="font-semibold text-[#808080] hover:text-black">
       {myPosts?.length==1?'1 Post':`${myPosts.length} Posts`} 
      </h1>:
      <h1 className="font-semibold text-[#808080] hover:text-black">
      Posts
    </h1>
    }
      </button>
      <button className="h-12 w-full hover:bg-[#f8feff]">
      {followers?
        <h1 className="font-semibold text-[#808080] hover:text-black">
       {followers?.length==1?'1 follower':`${followers.length} Follwers`}  
      </h1>:
      <h1 className="font-semibold text-[#808080] hover:text-black">
     no followers
    </h1>
    }
      </button>
      <button className="h-12 w-full hover:bg-[#f8feff]">
      {following?
        <h1 className="font-semibold text-[#808080] hover:text-black">
       {following?.length} Following 
      </h1>:
      <h1 className="font-semibold text-[#808080] hover:text-black">
      no following
    </h1>
    }
      </button>
    </>
  );
}

export default UserProfile;
