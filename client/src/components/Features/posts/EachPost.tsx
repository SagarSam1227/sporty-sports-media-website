import { useState } from "react";
import MyImageModal from "../../../utils/modal/MyImageModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../vite-env";
import { useNavigate } from "react-router-dom";


function EachPost({data,username}:{data:{image:string,hide:boolean},username:string}){


    const userDetails: any = useSelector<RootState>((store) => store.user);
    const userName = userDetails.items?.username;
    const navigate = useNavigate()
    const CLOUD_NAME = process.env.VITE_CLOUD_NAME;

    const [isFullImage,setIsFullImage] = useState<boolean>(false)

    const handleNavigate = (data: object) => {
        console.log(data, "navigating from profile");
    
        if(userName == username){
            setIsFullImage(true)
        }else{
          navigate("/singlepost", { state: data });
        }
    
      };
 

    return (
        <>
        {!data.hide?
        <div
          onClick={() => {
            handleNavigate(data);
          }}
          className="bg-black w-full hover:opacity-75 h-[17rem] bg-center bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${data.image}.jpg')`,
          }}
        >

          {isFullImage?<MyImageModal card={data} setIsFullImage={setIsFullImage} image={data.image} />:null}
        </div>:null
        }
        </>
    )
}

export default EachPost;