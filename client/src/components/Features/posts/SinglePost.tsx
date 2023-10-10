import { useSelector } from "react-redux";
import { RootState } from "../../../vite-env";
import { useLocation} from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import DarkModeContext from "../../../utils/DarkModeContext";
import {
  findProfileUrl,
  remainingPostUrl,
} from "../../../api/axiosConnection";
import { MyDataType } from "../../../vite-env";
import RemainingPosts from "./RemainingPost";
import LoginInvoke from "../../../utils/LoginErr";

function SinglePost() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const [remainingData, setRemainingData] = useState<Array<MyDataType>>([]);
  const location = useLocation();
  const imageData = location.state;
  const { isDarkmode } = useContext(DarkModeContext);
  const [error, setError] = useState<string>();
  const [profileData, setProfileData] = useState<{
    username: string;
    profile_picture: string;
    email: string;
    userid: string;
    favorites: string[];
    userDetails: {};
  }>();
  const username = userDetails.items?.username;


  useEffect(() => {
    findProfileUrl(setProfileData, imageData.userid)
      .then((response) => {
        imageData.userDetails = response;
        console.log(imageData, "output...");
      })
      .catch((error) => {
        setError(error);
      });
    remainingPostUrl(setRemainingData, imageData.image).catch((error) => {
      setError(error);
    });
  }, []);

 
  if (isDarkmode) {
    return (
      <>
      </>
    );
  }
  return (
    <>
      <div
        className={`  rounded-md md:mt-2 h-[30rem] md:h[31-rem] ${
          username ? "w-auto" : "w-3/4"
        }`}
      >
        <div className="overflow-y-scroll no-scrollbar">
      



          {imageData?.userDetails?
          <RemainingPosts card={imageData} />:null
          }




          {remainingData?.map((e: any) => {
            return(
              <>
              {!e.hide?
              <RemainingPosts card={e} />:null
              }
              </>
            )
          })}
        </div>
      </div>
      
      {error ? <LoginInvoke /> : null}
    </>
  );
}

export default SinglePost;
