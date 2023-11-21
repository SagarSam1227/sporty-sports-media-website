
import { useState } from "react";
import ReportModal from "../../../../utils/modal/ReportModal";
import ReportFullImage from "../../../../utils/modal/ReportFullImage";
import { updateReportHideUrl } from "../../../../api/axiosConnection";

function EachPost({ post }: { post: any }) {
  const CLOUD_NAME = process.env.VITE_CLOUD_NAME;

  const [isHidden, setIsHidden] = useState<boolean>(post?.hide);
  const [isMouseOver,setIsMouseOver] = useState<boolean>(false)
  const [isviewReport,setIsViewReport] = useState<boolean>(false)
  const [isFullImage,setIsFullImage] = useState<boolean>(false)
  console.log(post, "post....");

  const handleFullImage= ()=>{
    console.log('eye clickeddd....');
    
    setIsFullImage(true)
  }

  const handleHide = async() => {
    if (isHidden) {
      await updateReportHideUrl(post?.image,false)
      setIsHidden(false);
    } else {
     await updateReportHideUrl(post?.image,true)
      setIsHidden(true);
    }
  };

  return (
    <>
    <tr className="">
      <td className="">
        <div className="my-2" onClick={()=>{
          handleFullImage()
        }}>
        {isMouseOver?
        <button className="w-6 h-6 absolute rounded-full mt-8">
              <img  className=" " src="/public/assets/icons8-vision-30.png" alt="" />
            </button>
            :null
      }
          <div onMouseEnter={()=>{
            setIsMouseOver(true)
          }}
          onMouseLeave={()=>{
            setIsMouseOver(false)
          }}
            className={`h-[6rem] w-[9.75rem] bg-contain bg-center rounded-l-lg bg-black bg-no-repeat hover:opacity-30`}
            style={{
              backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${post?.image}.jpg')`,
            }}
          >
          
          </div>
           
        </div>
      </td>
      <td className="w-[12rem] ">
        <div className="p-[1rem] border h-[6rem]">
         
          <h1 className="text-sm font-roboto-condensed font-semibold">{post?.reports.length<=50?'below 50':post?.reports.length<=100?'below 100 reports':post?.reports.length<=500?'below 500':'above 500'}</h1>
          {/* <h1 className="text-sm">reports</h1> */}
          <button onClick={()=>{
            setIsViewReport(true)
          }} className=" bg-cyan-600 px-1 rounded-md  text-white shadow-sm shadow-black text-xs font-semibold">view</button>
        </div>
      </td>

      {isHidden ? (
        <td className="w-[12rem] mb-2">
          <div
            onClick={() => {
              handleHide();
            }}
            className=" border h-[6rem] text-xs font-medium text-red-700"
          >
            <h1 className="p-[2.3rem]">hidden</h1>
          </div>
        </td>
      ) : (
        <td className="w-[12rem] mb-2">
          <div
            onClick={() => {
              handleHide();
            }}
            className=" border h-[6rem] text-xs font-medium text-green-700"
          >
            <h1 className="p-[2.3rem]">visible</h1>
          </div>
        </td>
      )}

      {isHidden ? (
        <td className="w-[12rem] mb-2">
          <div
            onClick={() => {
              handleHide();
            }}
            className="border border-r p-[2rem] h-[6rem] rounded-r-lg"
          >
            <button className="rounded-full bg-black px-5 py-1 text-gray-300 text-xs w-[5rem]">
              show
            </button>
          </div>
        </td>
      ) : (
        <td className="w-[12rem] mb-2">
          <div
            onClick={() => {
              handleHide();
            }}
            className="p-[2rem] border h-[6rem] border-r rounded-r-lg"
          >
            <button className="rounded-full bg-white px-5 py-1 text-black border border-gray-800 text-xs w-[5rem]">
              hide
            </button>
          </div>
        </td>
      )}
    </tr>
    {isviewReport?
    <ReportModal setIsViewReport={setIsViewReport} reports={post?.reports}  />:null
  }
  {isFullImage?
  <ReportFullImage setIsFullImage={setIsFullImage} post={post}  />:null
}
    </>
  );
}

export default EachPost;
