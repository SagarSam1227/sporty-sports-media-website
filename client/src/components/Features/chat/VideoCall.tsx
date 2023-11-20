import Peer from 'peerjs'
import { useEffect, useRef ,RefObject, useState} from 'react';
import { Socket } from 'socket.io-client';

function VideoCall({
  setIsVideoCallClicked,myPeerId
}: {
  setIsVideoCallClicked: (a: boolean) => void,myPeerId:string
}) {


  useEffect(()=>{

    // const peer : Peer = new Peer()
    // peerRef.current = peer
    // peer.on('open', function(id) {
    //   console.log('My peer ID is: ' + id);
    //   setMyPeerId(id)
    //   });
  },[])

  // useEffect(()=>{
  //   if(myPeerId)
  //   socket.emit('send peer-id',myPeerId,hearerId)

  // },[myPeerId])

 
  const cancelVideoCall = () => {
    setIsVideoCallClicked(false);
  };
  
  
  
  return (
    <>
      <div className="h-full w-full relative">
        <h1>{myPeerId}</h1>
  <video className="h-full w-full bg-gray-500">
    {/* Your video content */}
  </video>

  <div className="absolute items-center w-full bottom-1 flex justify-center">
    <div className="flex gap-10 w-full justify-center">

    <div className="w-11 h-11  rounded-full  bg-[#000000d5]" style={{ zIndex: 1 }}>
    <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffffffcc"
                className="w-5 h-5 m-3"
              >
                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
              </svg>
    </div>

    <div onClick={()=>{
      cancelVideoCall()
    }} className="w-14 h-14  rounded-full  bg-[#ffffffcc] drop-shadow-md" style={{ zIndex: 1 }}>
    <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000d5"
                transform="rotate(133)"
                className="w-8 h-8 m-3"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
    </div>

    <div className="w-11 h-11  rounded-full  bg-[#000000d5]" style={{ zIndex: 1 }}>
    <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffffffcc"
                className="w-5 h-5 m-3"
              >
                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
              </svg>
    </div>
    </div>
    <div className=" flex justify-end">

    <video className=" w-48 h-40 bg-black rounded-lg m-1 mr-2">
          </video>
    </div>
  </div>
</div>

      {/* <div className="h-full w-full">
        <div className="h-full w-full flex justify-center  bg-slate-500">

          <div className="w-14 h-14 cursor-pointer  rounded-full self-end mb-10 bg-[#0fc018cc] drop-shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-8 h-8 m-3 "
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="wobble self-start mt-14 w-[8rem] h-[8rem]">
            <h1 className="mb-14 font-bold text-center text-2xl">Pooja</h1>
            <div
              className="w-full h-full self-center rounded-full bg-black bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url('https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg')`,
              }}
            ></div>
          </div>

          <div onClick={()=>{
            cancelVideoCall()
          }} className="w-14 h-14 cursor-pointer rounded-full mb-10 self-end bg-[#ef4a4aae] drop-shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 m-3"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default VideoCall;
