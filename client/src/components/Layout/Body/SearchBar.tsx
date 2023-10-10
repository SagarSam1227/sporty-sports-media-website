import { useSelector } from "react-redux";
import { RootState } from "../../../vite-env";
import LogInButton from "./LoginButon";

function SearchBar() {
  const userInfo: any = useSelector<RootState>((store) => store.user);

  return (
    <>
      <div className={`w-full h-[13%] md:bg-[white] bg-[#f5f5f5] justify-between flex md:relative top-0 fixed md:h-[15%] ${userInfo?.items?.username?'md:justify-center':'md:justify-end'}`}>
        {userInfo?.items?.username ? (
         <>
          <div className="md:hidden">
          <img
            className=" w-14 mt-4 ml-4"
            src="/assets/logo-green.png"
            alt="cycle"
          />
          </div>
          <div className="md:w-full  md:mx-auto text-center justify-center gap-1">
            <div className="w-fit mx-auto">
              <input
                className="bg-[#f5f5f5] h-7 md:pr-10 rounded-full w-64 mt-5 md:mt-10 drop-shadow-lg md:h-10 p-[1rem]"
                type="text"
              />
              <button className="mt-6 md:mt-12 absolute ml-[-2rem]">
                <img
                  className="h-[1.5rem] w-[1.5rem] "
                  src="https://img.icons8.com/?size=512&id=Y6AAeSVIcpWt&format=png"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="md:hidden mt-6 mr-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

          </div>
         </>
        ) : (
          <LogInButton />
        )}
      </div>
    </>
  );
}

export default SearchBar;
