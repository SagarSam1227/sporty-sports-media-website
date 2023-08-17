import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../vite-env";
import { useDispatch } from "react-redux";
import { MyDataType } from "../../vite-env";
import { authUrl, postUrl } from "../../api/axiosConnection";
import { useNavigate } from "react-router-dom";

function Home() {
  const userDetails: any = useSelector<RootState>((store) => store.user);

  const username = userDetails.items?.username;

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const [data, setData] = useState<Array<MyDataType>>([]);

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME as string;

  const handleNavigate = (data:object)=>{
    console.log(data);
    
    navigate("/singlepost", { state:data});
  }
  

  useEffect(() => {
    
    postUrl(setData)
    authUrl(dispatch)
    

    
  }, []);

  return (
    <div
      className={`md:float-left ml-40 grid grid-cols-2 gap-1 row-auto columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${
        username ? "w-1/2" : "w-3/4"
      }`}
    >
      {data?.map((e: MyDataType) => {
        return (
          <div onClick={()=>{
            handleNavigate(e)
          }} className="bg-black rounded-md justify-center">
            <img
              className=" rounded-md"
              src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${e.image}.jpg`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
