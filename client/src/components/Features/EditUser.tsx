import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useCallback, useEffect, useState } from "react";
import { uploadProfileUrl } from "../../api/axiosConnection";
import { useNavigate } from "react-router-dom";
import LottieAnimation from "../../utils/LoadingAnimation";
import { useContext } from "react";
import DarkModeContext from "../../utils/DarkModeContext";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/CropImage";
import urlToBase64 from "../../utils/baseUrl";
import base64URLtoFile from "../../utils/ToFile";

function EditUser() {
  const userDetails: any = useSelector<RootState>((store) => store.user);

  const { isDarkmode } = useContext(DarkModeContext);

  const [inputFile, setInputFile] = useState<File | undefined | null | string>(
    null
  );

  const [objectURL, setObjectURL] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const CLOUD_NAME = process.env.VITE_CLOUD_NAME as string;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [userName, setUserName] = useState<string | null>(null);

  const [nameErr, setNameErr] = useState<string | null>(null);

  const [isSaveClicked, setIsSaveClicked] = useState<boolean>(false);
  const [isCroped, setIsCroped] = useState<boolean>(false);

  const username = userDetails.items?.username;
  const image = userDetails.items?.image;
  const [oldInputFile,setOldInputFile] = useState<File | undefined | null | string>(
    null
  );

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropSelected, setIsCropSelected] = useState<boolean>(false);

  console.log(image,'image');

  const deleteFile = () => {
    setInputFile("removed");
    setObjectURL(undefined);
    setImageUrl(null);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File | null | undefined = event.target.files?.[0];

    setInputFile(file);
    setOldInputFile(file)
    console.log(file, "fileeee");

    if (file) {
      const url = URL.createObjectURL(file);
      setObjectURL(url);
      console.log(url,'kdkddkkdkd');
      setImageUrl(null);
    }
  };

  const handleSave = () => {
    setIsSaveClicked(true);
    console.log(inputFile, "lastt");

    uploadProfileUrl(inputFile, userName, navigate);
  };

  const handleUsername = (name: string) => {
    if (name?.length > 25) {
      setNameErr("Maximum length exceeded");
    } else {
      setNameErr(null);
      setUserName(name);
    }
  };

  const handleCancelCrop = ()=>{
    setIsCropSelected(false);
    setImageUrl(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${image}.jpg`)
    setInputFile(oldInputFile)
  }
  // const onCropComplete = useCallback(
  //   async (croppedArea: any, croppedAreaPixels: any) =>
  //   {
  //      try {

  //        const baseUrl = await urlToBase64(imageUrl);
  //        console.log(baseUrl, "baseurll");

  //        if (baseUrl) {
  //          // After the image has been loaded, you can now call getCroppedImg
  //          const croppedImage = await getCroppedImg(
  //            baseUrl, // Use the loaded image directly
  //            croppedAreaPixels
  //          ).catch((error) => {
  //            console.log(error, "errorrr");
  //          });

  //          const output = base64URLtoFile(croppedImage, image);
  //          setInputFile(output);

  //          setIsCropSelected(false)
  //          setImageUrl(croppedImage)
  //          setObjectURL(croppedImage)
  //          console.log(output, "everything is fine");
  //        }
  //      } catch (e) {
  //        console.error("Error cropping image:", e);
  //      }
  //    })
  // )

  // const onCropComplete = useCallback(
  //   async (croppedArea: any, croppedAreaPixels: any) => {
  //      try {

  //        const baseUrl = await urlToBase64(imageUrl);
  //        console.log(baseUrl, "baseurll");

  //        if (baseUrl) {
  //          // After the image has been loaded, you can now call getCroppedImg
  //          const croppedImage = await getCroppedImg(
  //            baseUrl, // Use the loaded image directly
  //            croppedAreaPixels
  //          ).catch((error) => {
  //            console.log(error, "errorrr");
  //          });

  //          const output = base64URLtoFile(croppedImage, image);
  //          setInputFile(output);

  //          setIsCropSelected(false)
  //          setImageUrl(croppedImage)
  //          setObjectURL(croppedImage)
  //         //  setIsCroped(false)
  //          console.log(output, "everything is fine");
  //        }
  //      } catch (e) {
  //        console.error("Error cropping image:", e);
  //      }
  //    },
  //   [isCroped]
  // );

  // onCropComplete =
  // async (croppedArea: any, croppedAreaPixels: any) => {
  //    try {
  //      const baseUrl = await urlToBase64(imageUrl);
  //      console.log(baseUrl, "baseurll");

  //      if (baseUrl) {
  //        // After the image has been loaded, you can now call getCroppedImg
  //        const croppedImage = await getCroppedImg(
  //          baseUrl, // Use the loaded image directly
  //          croppedAreaPixels
  //        ).catch((error) => {
  //          console.log(error, "errorrr");
  //        });

  //        const output = base64URLtoFile(croppedImage, image);
  //        setInputFile(output);

  //        setIsCropSelected(false)
  //        setImageUrl(croppedImage)
  //        setObjectURL(croppedImage)
  //        console.log(output, "everything is fine");
  //      }
  //    } catch (e) {
  //      console.error("Error cropping image:", e);
  //    }
  //  }
// let onCropComplete:any
//   useEffect(()=>{
//     onCropComplete(async (croppedArea: any, croppedAreaPixels: any) => {
//       try {
//         console.log("onCropComplete called with isCroped =", isCroped);
//         const baseUrl = await urlToBase64(imageUrl);
//         console.log(baseUrl, "baseurll");

//         if (baseUrl) {
//           // After the image has been loaded, you can now call getCroppedImg

//           const croppedImage = await getCroppedImg(
//             baseUrl, // Use the loaded image directly
//             croppedAreaPixels
//           ).catch((error) => {
//             console.log(error, "errorrr");
//           });

//           const output = base64URLtoFile(croppedImage, image);
//           setInputFile(output);

//           setIsCropSelected(false);
//           setImageUrl(croppedImage);
//           setObjectURL(croppedImage);
//            setIsCroped(false)
//           console.log(output, "everything is fine");
//         }
//       } catch (e) {
//         console.error("Error cropping image:", e);
//       }
//     })
//   },[isCroped])

  const onCropComplete = useCallback(
    async (croppedArea: any, croppedAreaPixels: any) => {
      try {
        console.log(croppedArea);
        
        console.log("onCropComplete called with isCroped =", isCroped);
        let baseUrl 
        if(imageUrl){
          baseUrl = await urlToBase64(imageUrl);
        }else{
          baseUrl = objectURL
        }
        console.log(baseUrl, "baseurll");
        
        if (baseUrl) {
          // After the image has been loaded, you can now call getCroppedImg

          const croppedImage = await getCroppedImg(
            baseUrl as string, // Use the loaded image directly
            croppedAreaPixels
          ).catch((error) => {
            console.log(error, "errorrr");
          });


            const output = base64URLtoFile(`${croppedImage}`, image);
            console.log(output,'output');
            
            setInputFile(output);
            // if(isCroped){
              // setImageUrl(croppedImage)
              setCroppedImage(`${croppedImage}`)
              // setObjectURL(croppedImage)
              setIsCroped(false)
            //  }
            console.log(output, "everything is fine");
          
        }
      } catch (e) {
        console.error("Error cropping image:", e);
      }
    },
    [imageUrl]
  );

  const handleCropButtonClick = () => {
    // Set isCroped to true when the crop button is clicked
    console.log("tick clickedd...");
    setIsCroped(true);
    setIsCropSelected(false)
  };

  useEffect(() => {
    if (image) {
      console.log(image);

      setImageUrl(
        `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${image}.jpg`
      );
    }
  }, []);

  // let onCropComplete

  if (isDarkmode) {
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
                      onChange={(e) => {
                        handleFileInputChange(e);
                      }}
                    />
                  </div>
                </label>

                <button
                  onClick={() => {
                    deleteFile();
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
                  handleUsername(e.target.value);
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
        {isSaveClicked ? <LottieAnimation /> : null}
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
        <div className="  items-center justify-center rounded-3xl mt-[1rem] cursor-pointer w-[28rem] mx-[5rem] pb-10">
          <div className=" w-[20rem] justify-between pt-[2rem] mx-[4rem]">
            {isCropSelected ? (
              <div className="flex gap-9 mb-3 justify-center">
                <button
                  onClick={() => {
                    handleCancelCrop()
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button onClick={handleCropButtonClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : null}

            <label
              htmlFor="dropzone-file"
              className=" flex flex-col items-center justify-center rounded-lg shadow-lg border-[1px] border-[#e0dddd38] cursor-pointer w-full h-[15rem]"
            >
              {inputFile || imageUrl ? (
                <>
                  {isCropSelected ? (
                    <div
                      className={`w-[300px] h-[400px] flex items-center justify-center`}
                    > 
                        <div className="w-full h-full relative items-center justify-center">
                          <Cropper
                            image={imageUrl || objectURL}
                            crop={crop}
                            zoom={zoom}
                            cropShape="round"
                            aspect={1} // Set the aspect ratio to 1 for a square crop
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropSize={{ width: 200, height: 200 }} // Set the size of the cropped image
                          />
                        </div>
                    </div>
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center`}
                    >{croppedImage?
                      <img
                        // ref={domEl}
                        src={croppedImage}
                        alt=""
                        className="object-contain max-w-full max-h-full"
                      ></img>:
                      <img
                      // ref={domEl}
                      src={imageUrl ? imageUrl : objectURL}
                      alt=""
                      className="object-contain max-w-full max-h-full"
                    ></img>
                    }
      {isSaveClicked ? <LottieAnimation /> : null}
                    </div>
                  )}
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
            <div className=" flex justify-between">
              <button
                onClick={() => {
                  setIsCropSelected(true);
                }}
                className={`${
                  !imageUrl && !inputFile ? "hidden" : ""
                } rounded-full px-2 text-xs w-16 text-[#ffffffc4] bg-[#000000d8] mt-8 p-1`}
              >
                crop
              </button>
              <label htmlFor="drop-file">
                <div
                  className={`${
                    !imageUrl && !inputFile ? "hidden" : ""
                  } rounded-full px-2 w-16 text-xs text-[#ffffffc4] bg-[#000000d8] mt-8 p-1 text-center cursor-pointer`}
                >
                  change
                  <input
                    id="drop-file"
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={(e) => {
                      handleFileInputChange(e);
                    }}
                  />
                </div>
              </label>
              <button
                onClick={() => {
                  deleteFile();
                }}
                className={`${
                  !imageUrl && !inputFile ? "hidden" : ""
                } rounded-full px-2 w-16 text-xs text-[#ffffffc4] bg-[#000000d8] mt-8 p-1`}
              >
                remove
              </button>
            </div>
          </div>

          <hr className="mt-12 w-3/4 mx-[3rem]" />

          <div className="w-[20rem] justify-between pt-[3rem] mx-[4rem]">
            <input
              onChange={(e) => {
                handleUsername(e.target.value);
              }}
              className="h-10 pl-2 mt-1 shadow-lg border-2 border-[#0b0b0b] rounded-full w-full"
              type="text"
              placeholder={username}
            />
          </div>
          {nameErr ? (
            <span className="text-red-700 text-sm mx-16">{nameErr}</span>
          ) : null}
          {/* <hr className="mt-12 w-3/4 mx-[3rem]" /> */}

          <div className="flex w-[20rem] justify-between pt-[5rem] mx-[4rem]">
            <button
              onClick={() => {
                handleSave();
              }}
              className={`w-full p-2 text-xs rounded-full text-[#ffffffc4] bg-[#000000d8] ${
                nameErr ? "pointer-events-none opacity-50" : ""
              }`}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
