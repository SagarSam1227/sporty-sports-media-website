import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import RightBar from "../RightBar/RightBar";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../vite-env";
import { socket } from "../../Features/chat/SingleChat";
import { useEffect } from "react";

function Body(){

    const userInfo: any = useSelector<RootState>((store) => store.user);

    const currentChat :{items:{hearerId:string}} | any = useSelector<RootState>((store) => store.currentChat);
    const hearerId = currentChat?.items?.hearerId
    
  useEffect(()=>{
    socket?.on('peer-id recieved',(peerId)=>{
      console.log(peerId,'id of opponent.......');
      socket.on('open',(hearerId)=>{
        
      })
    })
  },[hearerId])

    return(
        <>
        <div className={`md:flex w-full h-[642px]`}>
        <Sidebar />


          {/* body..... */}

          <div className="md:w-full w-full h-full md:h-full ">
          {/* search button....... */}
          <SearchBar />
          {/* body.......... */}
          <div className="w-full h-full mt-[90px] md:mt-0 md:h-[79%]">
            <div className="md:w-[90%]  w-full md:h-full overflow-y-scroll md:relative  no-scrollbar rounded-md mt-[1rem] md:mt-6 md:mx-auto">


                <Outlet />


              {/*home... card........ */}
              {/* <div className="w-full bg-[#572b2b] grid grid-cols-2 gap-1">
                <div
                  className="h-[10rem] md:h-[13rem] rounded-md bg-contain bg-center bg-black bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_1280.png)`,
                  }}
                ></div>
                <div
                  className="h-[10rem] md:h-[13rem] rounded-md bg-contain bg-center bg-black bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://i.pinimg.com/originals/71/28/3b/71283bb49db55cfee5bb6acd1389c465.jpg)`,
                  }}
                ></div>
                <div
                  className="h-[10rem] md:h-[13rem] rounded-md bg-contain bg-center bg-black bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://i.pinimg.com/originals/71/28/3b/71283bb49db55cfee5bb6acd1389c465.jpg)`,
                  }}
                ></div>
                 <div
                  className="h-[10rem] md:h-[13rem] rounded-md bg-contain bg-center bg-black bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_1280.png)`,
                  }}
                ></div>
                <div
                  className="h-[10rem] md:h-[13rem] rounded-md bg-contain bg-center bg-black bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://i.pinimg.com/originals/71/28/3b/71283bb49db55cfee5bb6acd1389c465.jpg)`,
                  }}
                ></div>
                <div
                  className="h-[10rem] md:h-[13rem] rounded-md bg-contain bg-center bg-black bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://i.pinimg.com/originals/71/28/3b/71283bb49db55cfee5bb6acd1389c465.jpg)`,
                  }}
                ></div>
              </div> */}





            </div>
          </div>
        </div>

        {userInfo?.items?.username?
        <RightBar />:
        null
        }
        </div>
        </>
    )
}



export default Body;