
import { useLocation } from "react-router-dom";

function SingleNews() {
  const location = useLocation();
  const imageData = location.state;

  console.log(imageData);
    
  
  return (
    <>
      <div
        className={`rounded-md md:h-[30rem] overflow-y-scroll no-scrollbar md:mt-1 w-full `}
      >
        <div className="">
          {/* <img src={imageData.image_url} alt="" /> */}
          <div>
            <h1 className="mt-10 font-bold text-3xl text-[#757575]">{imageData.title}</h1>
            <br />
            <hr />
            <h1 className="mt-10">{imageData.content}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleNews;
