import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useEffect, useState } from "react";
import { accessChatUrl, fetchMyPostUrl, followUserUrl } from "../../api/axiosConnection";
import { useLocation, useNavigate} from "react-router-dom";
import LoginInvoke from "../../utils/LoginErr";
import { handleAddFollowing,handleRemoveFollowing } from "../../redux/handleRedux";
import { useDispatch } from "react-redux";
import EachPost from "./posts/EachPost";


function OthersProfile() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const userName = userDetails.items?.username;
  const userDp = userDetails.items?.image;
  const posts = userDetails.items?.posts;
  const followers = userDetails.items?.followers;
  const following = userDetails.items?.following;
  const profile = userDetails.items?.image;

  const [isMyProfile,setIsMyProfile] = useState<boolean>(false)
  const navigate = useNavigate()
  
  
  
  const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{
    postDetails: {hide:boolean}[];
    followers: string[];
    following: string[];
    username: string;
    profile_picture: string;
    _id:string;
  }>();

  console.log(userInfo,'uesrInfoo');
  
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
console.log(isFollowing,userName,'isFollowing');

  const location = useLocation();
  const dispatch = useDispatch()
  const [error, setError] = useState<string>();
  // const [chat,setChat] = useState<object>({})

  const CLOUD_NAME = process.env.VITE_CLOUD_NAME;

  const user = location.state;
  console.log(user);


  const handleMessage=async ()=>{
    if(userInfo){

      await accessChatUrl(userInfo?._id).then((response)=>{
        navigate('/inbox',{state:response})

      })
    }
  }

  const handleFollowing = () => {
    if (isFollowing) {
      if(userInfo){
      followUserUrl("unfollow", userInfo?.username, userName)
      .then(() => {
        setIsFollowing(false);
        handleRemoveFollowing(userInfo?.username,dispatch)
          userInfo.followers.length = userInfo?.followers?.length - 1
        });
      }
    } else {
      if(userInfo){
      followUserUrl("follow", userInfo?.username, userName).
      then(() => {
        setIsFollowing(true);
        handleAddFollowing(userInfo?.username,dispatch)
          userInfo.followers.length = userInfo?.followers?.length + 1
        });
      }
    }
  };

  const findLength=()=>{
    interface PostDetails {

      hide: boolean;
      
    }
    const postArray: PostDetails[] | undefined= userInfo?.postDetails?.filter((post:PostDetails) => !post.hide);
    return postArray?.length

  }


  console.log(userInfo, "infoooooo");

  let profilePic;
  if(userInfo?.profile_picture){
    console.log('ifcase');
    
    profilePic = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${userInfo?.profile_picture}.jpg`;
  }else{
    console.log('elsecase');
    
    profilePic = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${userDp}.jpg`;

  }
  console.log(profilePic, "profile");

  useEffect(() => {
    fetchMyPostUrl(user, setUserInfo).then((response)=>{
        console.log(response,'response....');
      if(response.username==userName){
        setIsMyProfile(true)
      }
        
    }).catch((error) => {
      setError(error);
    });
  }, []);

  useEffect(()=>{
    setIsFollowing(userInfo?.followers?.some((user) => user === userName) ?? false)
    console.log(isFollowing,userName,'isFollowingNow');
  },[userInfo])

  return (
    <>
      <div
        className={`rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-5 w-full`}
      >
        <div className="flex h-[10rem] mt-7 w-full">
          <div className=" w-2/3">
            {userInfo?.profile_picture || userDp ? (
              isMyProfile?
              <div
                className="w-40 rounded-full mx-10 border h-40 bg-center bg-contain bg-no-repeat"
                style={{
                  // backgroundImage: `url(${profilePic})`,
                  backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${profile}.jpg')`,

                }}
              ></div>:
              <div
                className="w-40 rounded-full mx-10 border h-40 bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${profilePic})`,
                }}
              ></div>
            ) : (
              <div
                className="w-40 rounded-full mx-10 border h-40 bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url('/public/assets/avatar-svgrepo-com.png')`,
                }}
              ></div>
            )}
          </div>
          <div className="w-full flex-row">
            <div className="flex gap-7">
              <h1 className="font-semibold text-xl">{userInfo?.username}</h1>
              {isFollowing?
            <div
            className={`h-full rounded-full font-semibold text-xs pt-1 pb-1 mt-1 cursor-pointer text-white bg-black w-24 text-center ${
              userName == userInfo?.username ? "hidden" : null
            }`}
          >
            following
          </div>: 

              <div
                onClick={() => {
                  handleFollowing();
                }}
                className={`h-full rounded-full font-semibold text-xs pt-1 pb-1 mt-1 cursor-pointer text-white bg-black w-24 text-center ${
                  isMyProfile? "hidden" : null
                }`}
              >
                follow
              </div>
            }
              {isFollowing ? (
                <div
                  onMouseOver={() => {
                    setIsOptionsSelected(true);
                  }}
                  className="flex-col mt-[0.3rem]"
                >
                  <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
                  <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
                  <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
                </div>
              ) : null}
              {isOptionsSelected ? (
                <div
                  onMouseOver={() => {
                    setIsOptionsSelected(true);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      setIsOptionsSelected(false);
                    }, 2000);
                  }}
                  className="pb-2 w-[8rem] mt-[2rem] bg-[#f8f8ff] rounded-md shadow-lg absolute ml-[9rem]"
                >
                  <button
                    onClick={() => {
                      handleFollowing();
                      setIsOptionsSelected(false);
                    }}
                    className="w-full text-sm font-medium hover:bg-[#ebebf1bf]"
                  >
                    unfollow
                  </button>
                  <button className="w-full text-sm font-medium hover:bg-[#ebebf1bf]">
                    report
                  </button>
                  <button onClick={()=>{
                    handleMessage()
                  }} className="w-full text-sm font-medium hover:bg-[#ebebf1bf]">
                    message
                  </button>
                </div>
              ) : null}
            </div>
            <div className=" w-full h-10 mt-5 flex gap-8">
              <div className="flex gap-1">
                {isMyProfile?
                <>
                <button className="font-semibold">
                  {posts?.length}
                </button>
                <button className="text-sm">
                  {posts?.length == 1 ? "post" : "posts"}
                </button>
                </>
                :
                <>
                 <button className="font-semibold">
                 {findLength()}
               </button>
               <button className="text-sm">
                 {findLength() == 1 ? "post" : "posts"}
               </button>
                </>
                }
              </div>
              <div className="flex gap-1">
                {isMyProfile?
                <>
                <button className="font-semibold">
                  {followers?.length}
                </button>
                <button className="text-sm">
                  {followers?.length == 1 ? "follower" : "followers"}
                </button>
                </>:
                <>
                <button className="font-semibold">
                  {userInfo?.followers?.length}
                </button>
                <button className="text-sm">
                  {userInfo?.followers?.length == 1 ? "follower" : "followers"}
                </button>
                </>
                }
              </div>
              <div className="flex gap-1">
                {
                  isMyProfile?
                <button className="font-semibold">
                  {following?.length}
                </button>:
                <button className="font-semibold">
                {userInfo?.following?.length}
              </button>

                }
                <button className="text-sm">following</button>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-8 mb-14" />
        {isMyProfile?
        posts.length != 0 ? (
          <div className="w-full h-full grid gap-1 grid-cols-2">
            {posts.map((data: any) => {
              return (
                <EachPost data={data} username={userName} />
              );
            })}
          </div>
        ) : (
          <h1 className="text-center mt-[7rem] font-bold text-2xl">
            No Posts Yet
          </h1>
        ):
        userInfo?.postDetails.length != 0 ? (
          <div className="w-full h-full grid gap-1 grid-cols-2">
            {userInfo?.postDetails.map((data: any) => {
              return (
                <EachPost data={data} username={userInfo.username} />
              );
            })}
          </div>
        ) : (
          <h1 className="text-center mt-[7rem] font-bold text-2xl">
            No Posts Yet
          </h1>
        )
        }
      </div>
      {error ? <LoginInvoke /> : null}
    </>
  );
}

export default OthersProfile;
