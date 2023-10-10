import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import { useEffect, useState } from "react";
import {newsUrl } from "../../api/axiosConnection";
import { useNavigate } from "react-router-dom";
import UserNotFound from "../../utils/modal/UserNotFound";

function News() {
  const userDetails: any = useSelector<RootState>((store) => store.user);

  const navigate = useNavigate()
  const [error,setError] = useState<string>()

  const [data, setData] = useState<
    Array<{
      image_url: any; title: string; urlToImage: string 
}>
  >([]);
  const username = userDetails.items?.username;
  console.log(username);

  const handleError = ()=>{
    setError('')
    navigate('/home')
  }
  

  const handleNavigate=(article: { title: string; urlToImage: string; })=>{
    navigate('/singlenews',{state:article})
  }
  
  useEffect(() => {
    console.log(username);
    
    if(!username){
      
      navigate('/login')
    }else{
      newsUrl(setData).catch((error)=>{
        setError(error)
    });
    }
  }, []);
  return (
    <>
      <div
        className={`rounded-md overflow-y-scroll no-scrollbar md:mt-2 ${
          username ? "w-full" : "w-3/4"
        }`}
      >
        <div className=" rounded-md justify-center">
          {data.map((article) => {
            return (
              article?.image_url?<div className="w-full h-[10rem] mb-4">
              <div className="flex border rounded-xl">
                <img
                  className="w-[14.25rem] rounded-l-xl h-[9.25rem]"
                  src={article?.image_url}
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
      {error?<UserNotFound message1="Error" message2="News are not available!" onUserDismiss={handleError} />:null}

    </>
  );
}

export default News;
