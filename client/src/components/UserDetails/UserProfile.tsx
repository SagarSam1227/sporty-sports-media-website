import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useContext } from "react";
import DarkModeContext from "../../utils/DarkModeContext";
import { darkmodeInterface } from "../../vite-env";

function UserProfile() {
  const userDetails: any = useSelector<RootState>((store) => store.user);

  const username = userDetails.items?.username;
  const { isDarkmode }: darkmodeInterface = useContext(DarkModeContext);

  if (isDarkmode) {
    return (
        <>
      <div className="h-28 text-center">
        <div className="rounded-full bg-[url('/public/assets/avatar-svgrepo-com.png')] h-28 w-28 mx-[6rem] bg-repeat-round"></div>
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
      <div className="h-28 text-center">
        <div className="rounded-full bg-[url('/public/assets/avatar-svgrepo-com.png')] h-28 w-28 mx-[6rem] bg-repeat-round"></div>
      </div>
      <div className="h-[1.5rem]">
        <h1 className="font-bold text-lg text-center mt-[1rem] text-gray-950">
          {username}
        </h1>
        <hr className="w-[14rem] mx-[2.5rem] mt-[2rem] mb-3" />
      </div>
      <button className="h-12 w-full hover:bg-[#f8feff] mt-[3rem]">
        <h1 className="font-semibold text-[#808080] hover:text-black">
          Posts 0
        </h1>
      </button>
      <button className="h-12 w-full hover:bg-[#f8feff]">
        <h1 className="font-semibold text-[#808080] hover:text-black">
          Followers 0
        </h1>
      </button>
      <button className="h-12 w-full hover:bg-[#f8feff]">
        <h1 className="font-semibold text-[#808080] hover:text-black">
          Following 0
        </h1>
      </button>
    </>
  );
}

export default UserProfile;
