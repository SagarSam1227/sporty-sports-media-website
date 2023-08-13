import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useEffect, useState } from "react";
import { authUrl, newsUrl } from "../../api/axiosConnection";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function News() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState<
    Array<{ title: string; urlToImage: string }>
  >([]);
  const username = userDetails.items?.username;

  const handleNavigate=(article: { title: string; urlToImage: string; })=>{
    navigate('/singlenews',{state:article})
  }

  useEffect(() => {

    authUrl(dispatch)

    newsUrl(setData)
  }, []);
  return (
    <>
      <div
        className={`md:float-left ml-40 gap-1 row-auto md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${
          username ? "w-1/2" : "w-3/4"
        }`}
      >
        <div className=" rounded-md justify-center">
          {data.map((article) => {
            return (
              article?.urlToImage?<div className="w-full h-[10rem] mb-4">
              <div className="flex border rounded-xl">
                <img
                  className="w-[14.25rem] rounded-l-xl h-[9.25rem]"
                  src={article?.urlToImage}
                  alt=""
                />
                <button onClick={()=>{
                  handleNavigate(article)
                }} className="w-full">
                  <h1 className="hover:underline hover:underline-offset-4 font-medium m-4 text-blue-950">
                    {article?.title}
                  </h1>
                </button>
              </div>
            </div>:null
            );
          })}
        </div>
      </div>
    </>
  );
}

export default News;
