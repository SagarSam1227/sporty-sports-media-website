import { useState } from "react";
import { savePostUrl } from "../../api/axiosConnection";
import { handleRemoveFromFavorites } from "../../redux/handleRedux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../vite-env";

function SingleFavCard(props: { image: string }) {
  const { image } = props;

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME as string;
  const [isCardHover, setIsCardHover] = useState<boolean>(false);
  const userDetails: any = useSelector<RootState>((store) => store.user);
const email = userDetails?.items?.email
const dispatch = useDispatch()

const handleDelete=()=>{
    savePostUrl('remove',image,email).then(()=>{
        handleRemoveFromFavorites(image,dispatch)
      })
}

  return (
    <>
      <div
        onMouseOver={() => {
          setIsCardHover(true);
        }}
        onMouseLeave={() => {
          setIsCardHover(false);
        }}
        className={`h-[10rem] mb-5 rounded-md w-[13.75rem] bg-contain mx-auto bg-center bg-black bg-no-repeat ${isCardHover? 'bg-opacity-100':''}`}
        style={{
          backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${image}.jpg')`,
        }}
      >
        {isCardHover ? 
          <>
            <button  className="w-[5rem] text-xs font-medium py-1 mx-[4rem] mt-[3rem] bg-[#f8f8ff] rounded-full shadow-lg" style={{ opacity: 1 }}>view</button>
            <button onClick={()=>{
                handleDelete()
            }} 
            className="w-[5rem] text-xs font-medium py-1 mx-[4rem] mt-[1rem] bg-[#181819] rounded-full shadow-lg text-white">delete</button>
          </>
            : null}
      </div>
    </>
  );
}

export default SingleFavCard;
