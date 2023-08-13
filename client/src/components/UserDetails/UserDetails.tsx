import { useDispatch } from "react-redux";
import { RootState, darkmodeInterface } from "../../vite-env";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clearUserDetails } from "../../redux/Slices/userSlice";
import { useContext, useState } from "react";
import DarkModeContext from "../../utils/DarkModeContext";
import LogInButton from "./LoginButon";
import UserProfile from "./UserProfile";
import ChatList from "./ChatList";
import Favorites from "./Favorites";

function UserDetails() {
  const { isDarkmode, setIsDarkmode }: darkmodeInterface =
    useContext(DarkModeContext);
  const [currentPage, setCurrentPage] = useState<string>("profile");

  const dispatch = useDispatch();

  const handleItem = () => {
    dispatch(clearUserDetails());
    localStorage.removeItem("authToken");
  };
  const userInfo: any = useSelector<RootState>((store) => store.user);

  const adjustDarkmode = () => {
    if (isDarkmode) {
      setIsDarkmode(false);
    } else {
      setIsDarkmode(true);
    }
  };

  if (userInfo.items.username) {
    if (isDarkmode) {
      return (
        <>
          <div className="w-[19rem] mx-8 h-[32rem] hidden md:block drop-shadow-2xl bg-[#21252b] rounded-2xl float-right">
            <div className=" h-10">
              <div
                onClick={() => {
                  adjustDarkmode();
                }}
                className="w-[1.5rem] h-[1.5rem] float-right mt-[0.5rem] mr-[1rem]"
              >
                <img src="/public/assets/brightness.png" alt="" />
              </div>
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
        <div className="w-[19rem] mx-8 h-[32rem] hidden md:block drop-shadow-2xl bg-[#f5f5f5] rounded-2xl float-right">
          <div className=" h-10">
            <div
              onClick={() => {
                adjustDarkmode();
              }}
              className="w-[1.5rem] h-[1.5rem] float-right mt-[0.5rem] mr-[1rem]"
            >
              <img
                src="https://img.icons8.com/?size=512&id=UlOVIfVgfNz1&format=png"
                alt=""
              />
            </div>
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
      </>
    );
  } else {
    return <LogInButton />;
  }
}

export default UserDetails;
