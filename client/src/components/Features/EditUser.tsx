import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authUrl, uploadProfileUrl } from "../../api/axiosConnection";
import { useNavigate } from "react-router-dom";
import LottieAnimation from "../../utils/LoadingAnimation";
import { useContext } from "react";
import DarkModeContext from "../../utils/DarkModeContext";

function EditUser() {
  const userDetails: any = useSelector<RootState>((store) => store.user);

  const {isDarkmode} = useContext(DarkModeContext)

  const dispatch = useDispatch();

  const [inputFile, setInputFile] = useState<File | undefined | null |string>(null);

  const [objectURL, setObjectURL] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME as string;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [userName, setUserName] = useState<string | null>(null);

  const [isSaveClicked,setIsSaveClicked] = useState<boolean>(false)

  const username = userDetails.items?.username;
  const image = userDetails.items?.image;

  console.log(image);

  const deleteFile=()=>{
    setInputFile("removed")
    setObjectURL(undefined)
    setImageUrl(null)
  }

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File | null | undefined = event.target.files?.[0];
    setInputFile(file);
    console.log(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setObjectURL(url);
      console.log(objectURL);
      setImageUrl(null)
      
    }
  };

  const handleSave = () => {
    setIsSaveClicked(true)
    uploadProfileUrl(inputFile, userName, navigate);
  };

  
  useEffect(() => {
    
    if (image) {
      console.log(image);
  
      setImageUrl(
        `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${image}.jpg`
      );
    }
    authUrl(dispatch);
  }, []);








  if(isDarkmode){
    return (
      <>
        <div
          className={`md:float-left ml-40 gap-1 row-auto md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${
            username ? "w-1/2" : "w-3/4"
          }`}
        >
          <div className=" bg-[#15181bdb] items-center justify-center rounded-3xl mt-[4rem] cursor-pointer w-[28rem] mx-[5rem] pb-10">
            {/* <div className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 float-right mr-4 mt-4"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div> */}
            <div className="flex w-[20rem] justify-between pt-[3rem] mx-[4rem]">
              <div className="w-[8rem]">
                {/* <h1 className="font-bold font-sans text-sm text-stone-700">Profile</h1> */}
                <h1 className="rounded-full px-2 w-24 text-xs text-[#0e0404] bg-[#ffffffb0] mt-3 text-center cursor-none p-1">
                  profile
                </h1>
                <label htmlFor="drop-file">
                <div
                  className={`${
                    !imageUrl && !inputFile ? "hidden" : ""
                  } rounded-full px-2 w-24 text-xs text-[#ffffffb0] bg-[#000000d8] mt-8 p-1 text-center cursor-pointer`}
                >
                 
                    change
                    <input
                      id="drop-file"
                      type="file"
                      name="image"
                      className="hidden"
                      onChange={(e)=>{
                        handleFileInputChange(e)
                      }}
                    />
                </div>
                  </label>
  
                <button onClick={()=>{
                  deleteFile()
                }}
                  className={`${
                    !imageUrl && !inputFile ? "hidden" : ""
                  } rounded-full px-2 w-24 text-xs text-[#ffffffb0] bg-[#000000d8] mt-8 p-1`}
                >
                  remove
                </button>
              </div>
              
              <label
                htmlFor="dropzone-file"
                className=" flex flex-col items-center justify-center border-[1px] border-[#00000038] cursor-pointer w-[10rem] h-[10rem]"
              >
                {inputFile || imageUrl ? (
                  <>
                    <div
                      className={`w-full h-full flex items-center justify-center`}
                    >
                      <img
                        // ref={domEl}
                        src={imageUrl ? imageUrl : objectURL}
                        alt=""
                        className="object-contain max-w-full max-h-full"
                      />
                      </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">choose profile</span>
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      name="image"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </>
                )}
              </label>
            </div>
  
            <hr className="mt-12 w-3/4 mx-[3rem] divide-neutral-300" />
  
            <div className="flex w-[20rem] justify-between pt-[4rem] mx-[4rem]">
              <div className="w-[8rem]">
                <h1 className="rounded-full px-2 w-24 text-xs text-[#ffffffb0] bg-[#000000d8] mt-3 text-center cursor-none p-1">
                  user name
                </h1>
              </div>
              <input 
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="h-10 pl-2 mt-1 rounded-xl bg-[#ffffffb0]"
                type="text"
                placeholder={username}
              />
            </div>
            <hr className="mt-12 w-3/4 mx-[3rem]" />
  
            <div className="flex w-[20rem] justify-between pt-[2rem] mx-[4rem]">
              <button
                onClick={() => {
                  handleSave();
                }}
                className="w-full p-2 text-xs text-[#ffffffb0] bg-[#000000d8]"
              >
                save
              </button>
            </div>
          </div>
        </div>
        {isSaveClicked?<LottieAnimation />:null}
      </>
    );
  }
  return (
    <>
      <div
        className={`md:float-left ml-40 gap-1 row-auto md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${
          username ? "w-1/2" : "w-3/4"
        }`}
      >
        <div className=" bg-[#e5e5e577] items-center justify-center rounded-3xl mt-[4rem] cursor-pointer w-[28rem] mx-[5rem] pb-10">
          {/* <div className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 float-right mr-4 mt-4"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </div> */}
          <div className="flex w-[20rem] justify-between pt-[3rem] mx-[4rem]">
            <div className="w-[8rem]">
              {/* <h1 className="font-bold font-sans text-sm text-stone-700">Profile</h1> */}
              <h1 className="rounded-full px-2 w-24 text-xs text-[#0e0404] bg-[#ffffff] mt-3 text-center cursor-none p-1">
                profile
              </h1>
              <label htmlFor="drop-file">
              <div
                className={`${
                  !imageUrl && !inputFile ? "hidden" : ""
                } rounded-full px-2 w-24 text-xs text-[#ffffffc4] bg-[#000000d8] mt-8 p-1 text-center cursor-pointer`}
              >
               
                  change
                  <input
                    id="drop-file"
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={(e)=>{
                      handleFileInputChange(e)
                    }}
                  />
              </div>
                </label>

              <button onClick={()=>{
                deleteFile()
              }}
                className={`${
                  !imageUrl && !inputFile ? "hidden" : ""
                } rounded-full px-2 w-24 text-xs text-[#ffffffc4] bg-[#000000d8] mt-8 p-1`}
              >
                remove
              </button>
            </div>
            
            <label
              htmlFor="dropzone-file"
              className=" flex flex-col items-center justify-center border-[1px] border-[#00000038] cursor-pointer w-[10rem] h-[10rem]"
            >
              {inputFile || imageUrl ? (
                <>
                  <div
                    className={`w-full h-full flex items-center justify-center`}
                  >
                    <img
                      // ref={domEl}
                      src={imageUrl ? imageUrl : objectURL}
                      alt=""
                      className="object-contain max-w-full max-h-full"
                    />
                    </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">choose profile</span>
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </>
              )}
            </label>
          </div>

          <hr className="mt-12 w-3/4 mx-[3rem]" />

          <div className="flex w-[20rem] justify-between pt-[4rem] mx-[4rem]">
            <div className="w-[8rem]">
              <h1 className="rounded-full px-2 w-24 text-xs text-[#ffffffc4] bg-[#000000d8] mt-3 text-center cursor-none p-1">
                user name
              </h1>
            </div>
            <input 
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="h-10 pl-2 mt-1 rounded-xl"
              type="text"
              placeholder={username}
            />
          </div>
          <hr className="mt-12 w-3/4 mx-[3rem]" />

          <div className="flex w-[20rem] justify-between pt-[2rem] mx-[4rem]">
            <button
              onClick={() => {
                handleSave();
              }}
              className="w-full p-2 text-xs text-[#ffffffc4] bg-[#000000d8]"
            >
              save
            </button>
          </div>
        </div>
      </div>
      {isSaveClicked?<LottieAnimation />:null}
    </>
  );
}

export default EditUser;
