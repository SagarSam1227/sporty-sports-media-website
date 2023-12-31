import {  useState } from "react";
import { card } from "../../../vite-env";
import { useSelector } from "react-redux";
import { RootState } from "../../../vite-env";
import {
  savePostUrl,
  updateLikeUrl,
} from "../../../api/axiosConnection";
import LikesModal from "../../../utils/modal/LikesModal";
import FullImageModal from "../../../utils/modal/FullImage";
import { useNavigate } from "react-router-dom";
import {
  handleAddToFavorites,
  handleRemoveFromFavorites,
} from "../../../redux/handleRedux";
import { useDispatch } from "react-redux";
import ImageOptionsModal from "../../../utils/modal/ImageOptionsModal";

function RemainingPosts({ card }: { card: card }) {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const username = userDetails.items?.username;
  const email = userDetails.items?.email;

  const favorites = userDetails.items?.favorites;
  const dispatch = useDispatch();

  console.log(card, "card......");

  const [isLike, setIsLike] = useState<boolean>(
    card?.likes?.some((user: string) => user === username)
  );
  const [likeCount, setLikeCount] = useState<number>(card?.likes?.length);
  const [isLikeList, setIsLikeList] = useState<boolean>(false);
  const [isFullImage, setIsFullImage] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(
    favorites.some((image: string) => image === card.image)
  );
  const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false);

  console.log(isSaved, "hlllll");

  const navigate = useNavigate();

 

  const handleLike = () => {
    if (isLike) {
      updateLikeUrl("unlike", card.image, username);
      setIsLike(false);
      setLikeCount(likeCount - 1);
      card.likes.pop();
    } else {
      updateLikeUrl("like", card.image, username);
      setIsLike(true);
      setLikeCount(likeCount + 1);
      card.likes.push(username);
    }
  };

  const handleSave = () => {
    if (isSaved) {
      savePostUrl("remove", card?.image, userDetails?.items?.email).then(() => {
        handleRemoveFromFavorites(card?.image, dispatch);
        setIsSaved(false);
      });
    } else {
      savePostUrl("add", card?.image, userDetails?.items?.email).then(() => {
        handleAddToFavorites(card?.image, dispatch);
        setIsSaved(true);
      });
    }
  };

  const CLOUD_NAME = process.env.VITE_CLOUD_NAME;

  const profilePic = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${card.userDetails.profile_picture}.jpg`;
  const backgroundImage = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${card.image}.jpg`;

  return (
    <>
      <div className=" h-[100%] w-[60%] mx-auto mt-[3rem]">
        <div className="flex">
          <div
            onClick={() => {
              navigate("/user-info", { state: card.userDetails.username });
            }}
            className="w-full h-10 flex mb-2 cursor-pointer"
          >
            <div
              className="rounded-full h-9 w-9 bg-center bg-contain bg-no-repeat"
              style={{ backgroundImage: `url('${profilePic}')` }}
            ></div>
            <h1 className="text-sm font-medium text-[#006875] mt-2 ml-2">
              {card.userDetails.username}
            </h1>
          </div>
            <div
              onClick={()=>{
                setIsOptionsSelected(true)
              }}
              className="flex mt-6 gap-1 cursor-pointer"
            >
              <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
              <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
              <div className="h-1 w-1 rounded-full bg-black mb-[0.2rem]"></div>
            </div>

        </div>
        <div
          onClick={() => {
            setIsFullImage(true);
          }}
          onDoubleClick={() => {
            handleLike();
          }}
          className="relative rounded-[20px] bg-black w-full h-[18rem] overflow-hidden"
        >
          <div
            className="bg-contain bg-no-repeat bg-center w-full h-full mx-auto"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
        </div>

        {/* <div className="w-full h-8 rounded-sm"></div> */}
        <div className=" h-8 w-full flex mt-3">
          <button className="flex-grow items-center justify-center mt-4 flex-col">
            {isLike ? (
              <svg
                onClick={() => {
                  handleLike();
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="black"
                className={`w-6 h-6 animate-ping-1s`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            ) : (
              <svg
                onClick={() => {
                  handleLike();
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="#e18b8b"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
            <h1
              onClick={() => {
                setIsLikeList(true);
              }}
              className="text-[#6a6868] font-mono text-xs"
            >
              {likeCount}
            </h1>
          </button>
          <button className="flex-grow items-center justify-center mt-1 flex-col">
            <svg
              onClick={() => {
                setIsFullImage(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="#9baadb"
              className="w-6 h-6"
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
              stroke="#e3da82"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
          {isSaved ? (
            <button
              onClick={() => {
                handleSave();
              }}
              className="flex-grow items-center justify-center flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                handleSave();
              }}
              className="flex-grow items-center justify-center flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="#a3c4a3"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {isLikeList ? (
        <LikesModal likes={card?.likes} setIsLikeList={setIsLikeList} />
      ) : null}
      {isFullImage ? (
        <FullImageModal
          url={backgroundImage}
          setIsFullImage={setIsFullImage}
          image={card.image}
        />
      ) : null}

{isOptionsSelected?
    <ImageOptionsModal email={email} card={card} setIsOptionsSelected={setIsOptionsSelected} handleSave={handleSave} />:null
}
    </>
  );
}

export default RemainingPosts;
