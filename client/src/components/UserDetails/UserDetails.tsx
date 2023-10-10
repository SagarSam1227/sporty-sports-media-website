import { useDispatch } from "react-redux";
import { RootState, darkmodeInterface } from "../../vite-env";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clearUserDetails } from "../../redux/Slices/userSlice";
import { useContext, useState } from "react";
import DarkModeContext from "../../utils/DarkModeContext";
import LogInButton from "../Layout/Body/LoginButon";
import UserProfile from "./UserProfile";
import Favorites from "./Favorites";
import { useNavigate } from "react-router-dom";
import { auth } from "../../connection/firebase";
import UserNotFound from "../../utils/modal/UserNotFound";
import ChatList from "../Features/chat/ChatList";

function UserDetails() {
  const { isDarkmode, setIsDarkmode }: darkmodeInterface =
    useContext(DarkModeContext);
  const [currentPage, setCurrentPage] = useState<string>("profile");
  const [isSettings, setIsSettings] = useState<boolean>(false);
const navigate = useNavigate()  

  const dispatch = useDispatch();

  const handleItem = async () => {
    dispatch(clearUserDetails());
    localStorage.removeItem("authToken");
   await handleSignOut()
    navigate('/home')
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // User is signed out
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };


  const userInfo: any = useSelector<RootState>((store) => store.user);

  const adjustDarkmode = () => {
    if (isDarkmode) {
      setIsDarkmode(false);
    } else {
      setIsDarkmode(true);
    }
  };



  const handleEdit = ()=>{
    navigate('/edit-user')
  }

  const adjustSettings = () => {
    if (isSettings) {
      setIsSettings(false);
    } else {
      setIsSettings(true);
    }
  };

  if (userInfo.items.username) {
    if (isDarkmode) {
      return (
        <>
          <div className="w-[19rem] mx-8 h-[32rem] hidden md:block drop-shadow-2xl bg-[#21252b] rounded-2xl float-right">
            <div className=" h-10">
              <button
                onClick={() => {
                  adjustSettings();
                }}
                className="w-[1.5rem] h-[1.5rem] float-right mt-[0.5rem] mr-[1rem]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#c6c4c4"
                  className="w-6 h-6 hover:rotate-[-45deg]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>
                {isSettings ? (
                  <>
                    <button className="mt-4 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#ebebeb"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        adjustDarkmode();
                      }}
                      className="mt-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#ebebeb"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                        />
                      </svg>
                    </button>
                  </>
                ) : null}
              </button>
            </div>

            {currentPage === "profile" ? (
              <UserProfile />
            ) : currentPage === "chatlist" ? (
              <ChatList />
            ) : currentPage === "favorites" ? (
              <Favorites />
            ) : null}

            <div className="w-auto h-12 sticky top-full flex">
              <button
                onClick={() => {
                  setCurrentPage("profile");
                }}
                className="flex-grow flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#b8bac075"
                  className={`w-6 h-6 hover-fill-dark hover-stroke-dark ${
                    currentPage === "profile" ? "fill-dark stroke-dark" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setCurrentPage("chatlist");
                }}
                className="flex-grow flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#b8bac075"
                  className={`w-6 h-6 hover-fill-dark hover-stroke-dark ${
                    currentPage === "chatlist" ? "fill-dark stroke-dark" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setCurrentPage("favorites");
                }}
                className="flex-grow flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#b8bac075"
                  className={`w-6 h-6 hover-fill-dark hover-stroke-dark ${
                    currentPage === "favorites" ? "fill-dark stroke-dark" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  handleItem();
                }}
                className="flex-grow flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#b8bac075"
                  className="w-6 h-6 hover-fill-dark hover-stroke-dark"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="w-[91%] h-[32rem] mt-12 hidden md:block drop-shadow-2xl bg-[#f5f5f5] rounded-2xl">
          <div className=" h-10">
            <button
              onClick={() => {
                adjustSettings();
              }}
              className="w-[1.5rem] h-[1.5rem] float-right mt-[0.5rem] mr-[1rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#282c34"
                className="w-6 h-6 hover:rotate-[-45deg]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
              {isSettings ? (
                <>
                  <button onClick={()=>{
                    handleEdit()
                  }} className="mt-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#4f485b"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      adjustDarkmode();
                    }}
                    className="mt-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#4f485b"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#4f485b"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </button>
                </>
              ) : null}
            </button>
          </div>

          {currentPage === "profile" ? (
            <UserProfile />
          ) : currentPage === "chatlist" ? (
            <ChatList />
          ) : currentPage === "favorites" ? (
            <Favorites />
          ) : null}

          <div className="w-auto h-12 sticky top-full flex">
            <button
              onClick={() => {
                setCurrentPage("profile");
              }}
              className="flex-grow flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="lightgray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="lightgray"
                className={`w-6 h-6 hover-fill-profile hover-stroke-profile ${
                  currentPage === "profile" ? "fill-light stroke-light" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                setCurrentPage("chatlist");
              }}
              className="flex-grow flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="lightgray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="lightgray"
                className={`w-6 h-6 hover-fill-profile hover-stroke-profile ${
                  currentPage === "chatlist" ? "fill-light stroke-light" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                setCurrentPage("favorites");
              }}
              className="flex-grow flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="lightgray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="lightgray"
                className={`w-6 h-6 hover-fill-profile hover-stroke-profile ${
                  currentPage === "favorites" ? "fill-light stroke-light" : ""
                }`}
              >
  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />

              </svg>


            </button>
            <button
              onClick={() => {
                handleItem();
              }}
              data-tooltip-target="tooltip-animation"
              className="flex-grow flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#6a696978"
                className="w-6 h-6 hover-fill-dark hover-stroke-dark"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
            <div
              id="tooltip-animation"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Tooltip content
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
        {userInfo?.items?.blocked?<UserNotFound message1={"Oops!"} message2={"your account has been blocked"} onUserDismiss={handleItem} />:null}
      </>
    );
  } else {
    return <LogInButton />;
  }
}

export default UserDetails;
