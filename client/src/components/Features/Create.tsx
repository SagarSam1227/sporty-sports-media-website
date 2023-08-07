import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slices/userSlice";
import {
  MouseEventHandler,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DarkModeContext from "../../utils/DarkModeContext";
import { AUTH_URL, POST_URL } from "../../api/URLs";

function Create() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [objectURL, setObjectURL] = useState<string | null>(null);
  const [isUploadClicked, setIsUploadClicked] = useState<boolean>(false);
  const { isDarkmode } = useContext(DarkModeContext);
  const domEl = useRef(null);
  const navigate = useNavigate();

  const username = userDetails.items?.username;

  const dispatch = useDispatch();

  const handleItem = (email: string, username: string) => {
    dispatch(setUser({ email: email, username: username }));
  };

  const downloadImage = async () => {
    setIsUploadClicked(true);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File | null | undefined = event.target.files?.[0];
    setInputFile(file);
    console.log(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setObjectURL(url);
    }
  };

  const clearImage: MouseEventHandler<HTMLDivElement> = () => {
    setInputFile(null);
    if (objectURL) {
      URL.revokeObjectURL(objectURL);
    }
  };

  useEffect(() => {
    const AUTH_API = AUTH_URL;

    const POST_API = POST_URL;

    const token = localStorage.getItem("authToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    if (token) {
      axios
        .get(AUTH_API)
        .then((response: { data: { email: any; username: any } }) => {
          if (
            response &&
            response.data &&
            response.data.email &&
            response.data.username
          ) {
            const { email, username } = response.data; // Destructure email and username from the response data
            handleItem(email, username);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (isUploadClicked && inputFile) {
      const formData = new FormData();
      formData.append("image", inputFile);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      if (token) {
        axios
          .post(POST_API, formData, config)
          .then((response) => {
            if (response.data) {
              navigate("/singlepost", { state: response.data });
            }
          })
          .catch((err) => {
            console.log("errrorrrr!!!");

            console.log(err);
          });
      }
    }
  });

  useEffect(() => {
    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [objectURL]);

  if (isDarkmode) {
    return (
      <>
        <div
          className={`md:float-left ml-40 grid gap-1  row-auto  columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-12 ${
            username ? "w-1/2" : "w-3/4"
          }`}
        >
          <div className=" w-full justify-center self-center place-self-center flex">
            <div
              className={`md:w-1/2 w-full justify-center h-[256px] self-center place-self-center`}
            >
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64  rounded-lg cursor-pointer bg-[#15181b] dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-[black] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {inputFile ? (
                  <div
                    className={`w-full h-full flex items-center justify-center `}
                  >
                    <img
                      ref={domEl}
                      src={URL.createObjectURL(inputFile)}
                      alt=""
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
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
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
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
              {inputFile ? (
                <div className="flex justify-between mt-4">
                  <div onClick={clearImage} className="flex gap-2">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#dd9090c0"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button className="font-bold text-[#d8d8d87d]">
                      clear
                    </button>
                  </div>
                  <div
                    onClick={() => {
                      downloadImage();
                    }}
                    className="flex gap-2"
                  >
                    <button className="font-bold text-[#d8d8d87d]">
                      upload
                    </button>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#7cbec0b2"
                        className="w-6 h-6"
                      >
                        <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                      </svg>
                    </button>
                  </div>
                  {/* )} */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={`md:float-left ml-40 grid gap-1  row-auto  columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-12 ${
          username ? "w-1/2" : "w-3/4"
        }`}
      >
        <div className=" w-full justify-center self-center place-self-center flex">
          <div
            className={`md:w-1/2 w-full justify-center h-[256px] self-center place-self-center`}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {inputFile ? (
                <div
                  className={`w-full h-full flex items-center justify-center `}
                >
                  <img
                    ref={domEl}
                    src={URL.createObjectURL(inputFile)}
                    alt=""
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
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
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
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
            {inputFile ? (
              <div className="flex justify-between mt-4">
                <div onClick={clearImage} className="flex gap-2">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="font-bold text-[#a007076b]">clear</button>
                </div>
                <div
                  onClick={() => {
                    downloadImage();
                  }}
                  className="flex gap-2"
                >
                  <button className="font-bold text-[#5f9ea0]">upload</button>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                    </svg>
                  </button>
                </div>
                {/* )} */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
