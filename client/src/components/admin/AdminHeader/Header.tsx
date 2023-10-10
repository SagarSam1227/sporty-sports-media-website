import { useNavigate } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import ListUsers from "../Features/User/Users";
import ListPosts from "../Features/Posts/Posts";

function AdminHeader(props: {
  setIsDashBoard: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  };
}) {
  const { setIsDashBoard } = props;
  const [isLogoutClicked, setIsLogoutClicked] = useState<boolean>(false);
  const [clickedTab, setClickedTab] = useState<string>("");

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutClicked(true);
  };

  useEffect(() => {
    if (isLogoutClicked) {
      localStorage.removeItem("adminToken");
      navigate("/admin");
      setIsDashBoard(false);
    }
  }, [isLogoutClicked]);

  return (
    <>
      <nav className="flex items-center justify-between bg-[black] shadow-lg flex-wrap p-6 top-0 fixed w-full">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <img className=" w-16" src="/assets/logo-darkmode.png" alt="cycle" />{" "}
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:pl-16 lg:flex lg:items-center lg:w-auto">
          {/* <div onClick={()=>{
            setClickedTab('users')
          }} className="text-base  lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block mx-5 lg:mt-0 text-white text-xs font-bold hover:text-[#c57f1e] mr-4"
            >
             USERS
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block mx-5 lg:mt-0 text-white text-xs font-bold hover:text-[#c57f1e] mr-4"
            >
              POSTS
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block mx-5 lg:mt-0 text-white hover:text-[#c57f1e] mr-4"
            ></a>
          </div> */}
          <div
            className="text-base lg:flex-grow flex lg:justify-end mr-[6rem]"
          >
            <a onClick={() => setClickedTab("users")}
              href="#responsive-header"
              className="block mt-4 lg:inline-block mx-5 lg:mt-0 text-white text-xs font-bold hover:text-[#c57f1e] mr-4 "
            >
              USERS
            </a>
            <a onClick={() => setClickedTab("posts")}
              href="#responsive-header"
              className="block mt-4 lg:inline-block mx-5 lg:mt-0 text-white text-xs font-bold hover:text-[#c57f1e] mr-4"
            >
              POSTS
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block mx-5 lg:mt-0 text-white hover:text-[#c57f1e] mr-4"
            ></a>
          </div>

          <div
            onClick={() => {
              handleLogout();
            }}
          >
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded-full  text-[white] border-[white] bg-[black] hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              logout
            </a>
            {/* <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div> */}
          </div>
        </div>
      </nav>
      {clickedTab == "users" ? <ListUsers /> : null}
      {clickedTab == "posts" ? <ListPosts /> : null}
    </>
  );
}

export default AdminHeader;
