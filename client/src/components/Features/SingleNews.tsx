import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUrl } from "../../api/axiosConnection";
import { useLocation } from "react-router-dom";

function SingleNews() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const location = useLocation();
  const imageData = location.state;
  const dispatch = useDispatch();

  console.log(imageData);

  const username = userDetails.items?.username;

  useEffect(() => {
    authUrl(dispatch);
  }, []);
  return (
    <>
      <div
        className={`md:float-left ml-40 gap-1 row-auto md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${
          username ? "w-1/2" : "w-3/4"
        }`}
      >
        <div className="">
          <img src={imageData.urlToImage} alt="" />
          <div>
            <h1 className="mt-10 font-bold text-3xl text-[#757575]">{imageData.title}</h1>
            <br />
            <hr />
            <h1 className="mt-10">{imageData.content}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleNews;
