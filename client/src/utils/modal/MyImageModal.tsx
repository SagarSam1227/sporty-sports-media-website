import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getCommentUrl } from "../../api/axiosConnection";
import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
// import { postCommentUrl } from "../../api/axiosConnection";
import MyImageOptionsModal from "./MyImageOptionsModal";

export default function MyImageModal({
  card,
  setIsFullImage,
  image,
}: {
  card: any;
  setIsFullImage: any;
  image: string;
}) {
  console.log(card, "ujjjjjjjj");

  const userDetails: any = useSelector<RootState>((store) => store.user);
  console.log(userDetails);
  const CLOUD_NAME = process.env.VITE_CLOUD_NAME;

  const [open, _ ] = useState(true);
  const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false);
  const [comments, setComments] = useState<
    Array<{
      username: String;
      userProfile: String;
      comment: String;
      date: Date;
    }>
  >([]);
  // const [singleComment, _ ] = useState<String>();

  const [isPostClicked, setIsPostClicked] = useState<Boolean>(false);

  const cancelButtonRef = useRef(null);

  // const handleComment = () => {
  //   if (singleComment) {
  //     if (userDetails.items?.username) {
  //       postCommentUrl(
  //         image,
  //         userDetails.items?.username,
  //         userDetails.items?.image,
  //         singleComment
  //       );
  //       setIsPostClicked(true);
  //     }
  //   }
  // };

  const handleClose = () => {
    if (!isOptionsSelected) {
      setIsFullImage(false);
    }
  };

  const handleDate = (oldDate: Date) => {
    const olderDate = new Date(oldDate);
    const currentDate = new Date();

    console.log("oldDate", oldDate, currentDate);

    const timeDifference = currentDate.getTime() - olderDate.getTime();

    console.log(timeDifference);

    const seconds = Math.floor(timeDifference / 1000);
    console.log("secondss", seconds);

    const minutes = Math.floor(seconds / 60);
    console.log(minutes);

    const hours = Math.floor(minutes / 60);
    console.log("hourss", hours);

    const days = Math.floor(hours / 24);
    console.log(days, "dayss");

    const weeks = Math.floor(days / 7);
    console.log(weeks);
    if (seconds <= 30) {
      return seconds + "s";
    } else if (minutes <= 60) {
      return minutes + "m";
    } else if (hours <= 24) {
      return hours + "h";
    } else if (days <= 7) {
      return days + "d";
    } else {
      return weeks + "w";
    }
  };

  useEffect(() => {
    getCommentUrl(image, setComments);
    setIsPostClicked(false);
  }, [isPostClicked]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 sm:h-[35rem] sm:w-[55rem] sm:max-w-full">
                  <div className="flex">
                    <div
                      className="sm:w-3/5 sm:h-[25rem] bg-no-repeat bg-contain bg-center self-center"
                      style={{
                        backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${image}.jpg')`,
                      }}
                    >
                      {/* <div className={`sm:h-[25rem] sm:w-[50rem] `}></div> */}
                    </div>
                    <div className="bg-white border px-4  pb-4 sm:w-2/5 pt-5">
                      <div className="flex justify-between">
                        <h1 className="font-semibold">comments</h1>
                        <div
                          onClick={() => {
                            setIsOptionsSelected(true);
                          }}
                          className="flex mt-1 gap-1 cursor-pointer"
                        >
                          <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
                          <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
                          <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
                        </div>
                      </div>
                      <hr className="mt-2 pb-4" />
                      <div className=" w-full h-[27rem] overflow-auto overflow-y-scroll no-scrollbar">
                        <div className="md:flex">
                          <div className="w-full">
                            <ul>
                              {comments?.reverse().map((comment) => {
                                return (
                                  <li className="flex justify-between items-center mb-4 mt-4 bg-white p-2 rounded cursor-pointer transition">
                                    <div className="flex ml-2">
                                      {" "}
                                      <div
                                        className="rounded-full h-9 w-9 bg-center bg-contain bg-no-repeat"
                                        style={{
                                          backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${comment?.userProfile}.jpg')`,
                                        }}
                                      ></div>
                                      <div className="flex flex-col ml-2">
                                        {" "}
                                        <div className="">
                                          <span className="font-bold text-sm text-gray-600">
                                            {comment.username}
                                          </span>
                                          {/* <div className="w-5"> */}

                                          <span
                                            className="text-sm font-normal ml-3 text-black"
                                            style={{ lineBreak: "anywhere" }}
                                          >
                                            {comment.comment}
                                          </span>

                                          {/* </div> */}
                                        </div>
                                        <div className="flex">
                                          <span className="text-xs text-gray-400 truncate">
                                            {handleDate(comment?.date)}
                                          </span>
                                          <span className="text-xs  text-gray-400 ml-3 truncate">
                                            1like
                                          </span>
                                          <span className="text-xs  text-gray-400 ml-3 truncate">
                                            Reply
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex justify-between gap-8">
                      <input
                        onChange={(e) => {
                          setSingleComment(e.target.value);
                        }}
                        className="h-8 border-2 pl-3 mt-3 w-full text-sm rounded-full"
                        type="text"
                        placeholder="comment"
                      />
                      <button
                        onClick={() => {
                          handleComment();
                        }}
                        className="bg-black h-[27px] text-xs mt-3 w-20 text-center rounded-full text-white"
                      >
                        post
                      </button>
                    </div> */}
                      <hr className="mt-2 pb-3" />
                      <div className="flex gap-2">
                        <h1 className="font-roboto-condensed text-sm font-semibold mt-1">
                          {card?.likes?.length}
                        </h1>
                        <h1 className="font-roboto-condensed text-sm font-semibold mt-1">
                          {card?.likes?.length === 1 ? "like" : "likes"}
                        </h1>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="black"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke=""
                          className="w-6 h-6 mt-[0.1rem]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {isOptionsSelected ? (
        <MyImageOptionsModal
          card={card}
          setIsOptionsSelected={setIsOptionsSelected}
          setIsFullImage={setIsFullImage}
        />
      ) : null}
    </>
  );
}
