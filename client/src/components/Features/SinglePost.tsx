import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function SinglePost() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const location = useLocation();
  const imageData = location.state;
  const [isLike, setIsLike] = useState<boolean>(false);

  const username = userDetails.items?.username;
  console.log(imageData);

  const imageURL: string = `https://res.cloudinary.com/${"dcs2ybdst"}/image/upload/${
    imageData.image
  }.jpg`;
  console.log(imageURL, "this is image url.....");

  const handleLike = () => {
    if (isLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  };

  return (
    <>
      <div
        className={`md:float-left ml-40 grid grid-cols-2 gap-1 row-auto columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${
          username ? "w-1/2" : "w-3/4"
        }`}
      >
        <div className=" h-[25rem] w-[25rem] mx-[7rem] mt-[3rem] ">
          <div className="w-full h-10 flex mb-2">
            <div className="rounded-full bg-black w-9 h-9"></div>
            {/* <div> */}
            <h1 className="text-sm font-medium text-[#006875] mt-2 ml-2">
              sagar sam
            </h1>
            {/* </div> */}
          </div>
          <div onDoubleClick={()=>{
            handleLike()
          }} className="relative rounded-[20px] bg-black w-full h-[18rem] overflow-hidden">
            <div
              className="bg-contain bg-no-repeat bg-center w-full h-full"
              style={{ backgroundImage: `url(${imageURL})` }}
            ></div>
          </div>
          {/* <div className="w-full h-8 rounded-sm"></div> */}
          <div className=" h-8 w-full flex mt-3">
            <button
              onClick={() => {
                handleLike();
              }}
              className="flex-grow items-center justify-center flex"
            >
              {isLike ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="black"
                  className={`w-7 h-7 animate-ping-1s`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="#e18b8b"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </button>
            <button className="flex-grow items-center justify-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="#e3da82"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
            <button className="flex-grow items-center justify-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="#9baadb"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </button>
            <button className="flex-grow items-center justify-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="#a3c4a3"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
