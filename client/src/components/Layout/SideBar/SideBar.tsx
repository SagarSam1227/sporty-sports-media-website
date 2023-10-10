import { Link } from "react-router-dom";
import DarkModeContext from "../../../utils/DarkModeContext";
import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../vite-env";

function Sidebar() {
  const { isDarkmode } = useContext(DarkModeContext);
  const [isMouseOver1, setIsMouseOver1] = useState(false);
  const [isMouseOver2, setIsMouseOver2] = useState(false);
  const [isMouseOver3, setIsMouseOver3] = useState(false);
  const [isMouseOver4, setIsMouseOver4] = useState(false);
  const currentUrl = window.location.href.slice(22);
  const [buttonClicked, setButtonClicked] = useState(currentUrl);
  const userInfo: any = useSelector<RootState>((store) => store.user);

  if (isDarkmode) {
    return <></>;
  }
  return (
    <>
      <div
        className={`${
          userInfo?.items?.username ? "md:w-[31%]" : "w-1/4"
        }  hidden md:block md:h-full bg-[#f5f5f5] rounded-lg pt-4 drop-shadow-2xl`}
      >
        <div className="md:mb-12 w-full justify-center mx-auto md:flex">
          <img
            className=" w-20 mt-4"
            src="/assets/logo-green.png"
            alt="cycle"
          />
        </div>
        <Link to="/home">
          <div
            onMouseOver={() => {
              setIsMouseOver1(true);
            }}
            onMouseLeave={() => {
              setIsMouseOver1(false);
            }}
            onClick={() => {
              setButtonClicked("home");
            }}
            className={`md:py-4 py-0 md:w-full justify-center gap-5 flex md:mx-0  cursor-pointer ${
              buttonClicked === "home" || isMouseOver1 ? "md:bg-[#f8feff]" : ""
            }`}
          >
            <div className="self-center">
              <img
                className={`md:mx-auto ${
                  isMouseOver1 || buttonClicked === "home" ? "w-9" : "w-8"
                }`}
                src="/assets/house.png"
                alt=""
              />
            </div>
            <h4
              className={`font-semibold ${
                isMouseOver1 || buttonClicked === "home"
                  ? "text-slate-900"
                  : "text-[#808080]"
              }`}
            >
              Home
            </h4>
          </div>
        </Link>
        {isMouseOver1 || buttonClicked === "home" ? (
          <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>
        ) : null}

        <Link to="/news">
          <div
            onMouseOver={() => {
              setIsMouseOver2(true);
            }}
            onMouseLeave={() => {
              setIsMouseOver2(false);
            }}
            onClick={() => {
              setButtonClicked("news");
            }}
            className={`md:py-4 py-0 md:w-full justify-center gap-5 flex md:mx-0  cursor-pointer ${
              buttonClicked === "news" || isMouseOver2 ? "md:bg-[#f8feff]" : ""
            }`}
          >
            <div className="self-center">
              <img
                className={`md:mx-auto ${
                  isMouseOver2 || buttonClicked === "news" ? "w-9" : "w-8"
                }`}
                src="/assets/news.png"
                alt=""
              />
            </div>
            <h4
              className={`font-semibold ${
                isMouseOver2 || buttonClicked === "news"
                  ? "text-slate-900"
                  : "text-[#808080]"
              }`}
            >
              News
            </h4>
          </div>
        </Link>
        {isMouseOver2 || buttonClicked === "news" ? (
          <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>
        ) : null}

        <Link to="/create">
          <div
            onMouseOver={() => {
              setIsMouseOver3(true);
            }}
            onMouseLeave={() => {
              setIsMouseOver3(false);
            }}
            onClick={() => {
              setButtonClicked("create");
            }}
            className={`md:py-4 py-0 md:w-full justify-center gap-5 flex md:mx-0  cursor-pointer ${
              buttonClicked === "create" || isMouseOver3
                ? "md:bg-[#f8feff]"
                : ""
            }`}
          >
            <div className="self-center">
              <img
                className={`md:mx-auto ${
                  isMouseOver3 || buttonClicked === "create" ? "w-9" : "w-8"
                }`}
                src="/assets/create.png"
                alt=""
              />
            </div>
            <h4
              className={`font-semibold ${
                isMouseOver3 || buttonClicked === "create"
                  ? "text-slate-900"
                  : "text-[#808080]"
              }`}
            >
              Create
            </h4>
          </div>
        </Link>
        {isMouseOver3 || buttonClicked === "create" ? (
          <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>
        ) : null}

        <Link to="/services">
          <div
            onMouseOver={() => {
              setIsMouseOver4(true);
            }}
            onMouseLeave={() => {
              setIsMouseOver4(false);
            }}
            onClick={() => {
              setButtonClicked("services");
            }}
            className={`md:py-4 py-0 md:w-full justify-center gap-5 flex md:mx-0  cursor-pointer ${
              buttonClicked === "services" || isMouseOver4
                ? "md:bg-[#f8feff]"
                : ""
            }`}
          >
            <div className="self-center">
              <img
                className={`md:mx-auto ${
                  isMouseOver4 || buttonClicked === "services" ? "w-9" : "w-8"
                }`}
                src="/assets/services.png"
                alt=""
              />
            </div>
            <h4
              className={`font-semibold ${
                isMouseOver4 || buttonClicked === "services"
                  ? "text-slate-900"
                  : "text-[#808080]"
              }`}
            >
              Services
            </h4>
          </div>
        </Link>
        {isMouseOver4 || buttonClicked === "services" ? (
          <hr className="h-0.5 bg-[#e6e6e6] border-0 dark:bg-gray-700"></hr>
        ) : null}
      </div>

      {/* bottom button.... */}
      <div className="bg-white w-full pt-2 px-[10%] flex justify-between h-[10%] fixed bottom-0 md:hidden">
        <Link to="/home">
          <img
            className={`md:mx-auto w-6 sm:w-8
            }`}
            src="/assets/house.png"
            alt=""
          />
        </Link>
        <Link to="/news">
          <img
            className={`md:mx-auto w-6 sm:w-8 
            `}
            src="/assets/news.png"
            alt=""
          />
        </Link>
        <Link to="/create">
          <img
            className={`md:mx-auto w-6 sm:w-8 
            `}
            src="/assets/create.png"
            alt=""
          />
        </Link>
        <Link to="/services">
          <img
            className={`md:mx-auto w-6 sm:w-8`}
            src="/assets/services.png"
            alt=""
          />
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
