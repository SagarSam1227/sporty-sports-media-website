import { useRef, useEffect, useState } from "react";
import Message from "./Message";
import io, { Socket } from "socket.io-client";
import MessageAnimation from "../../../utils/MessageAnimation";
import { useLocation } from "react-router-dom";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createMessageUrl, getMessagesUrl } from "../../../api/axiosConnection";
import { useSelector } from "react-redux";
import { RootState } from "../../../vite-env";
import VideoCall from "./VideoCall";
import Peer from "peerjs";

const ENDPOINT = "http://localhost:3000";
export var socket: Socket<DefaultEventsMap, DefaultEventsMap>, selectedChatCompare: any;
function Chat() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const username = userDetails.items?.username;
  const CLOUD_NAME = process.env.VITE_CLOUD_NAME;
  // const [isEmoji, setIsEmoji] = useState<boolean>(false);

  const location = useLocation();

  const chatDetails = location.state;

  const user =
    chatDetails.members[1].membersId.username == username
      ? chatDetails.members[1].membersId
      : chatDetails.members[0].membersId;
  const hearer =
    chatDetails.members[0].membersId.username == username
      ? chatDetails.members[1].membersId
      : chatDetails.members[0].membersId;
  const image = hearer.profile_picture;
  console.log(chatDetails, "4343434");


  const chatDivRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<
    Array<{ content: string; sender: { _id: string } }>
  >([]);
  const peerRef = useRef<Peer | null>(null);
  const [myPeerId,setMyPeerId] = useState<string>('')
  const [input, setInput] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [isVideoCallClicked, setIsVideoCallClicked] = useState<boolean>(false);

  useEffect(() => {

    
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
    
    console.log(socketConnected);
    
    
     const peer : Peer = new Peer()
    peerRef.current = peer
    peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
      setMyPeerId(id)
      });

    scrollToBottom();
  }, []);

  useEffect(()=>{
    if(myPeerId)
    socket.emit('send peer-id',myPeerId,hearer._id)

  },[myPeerId])

  useEffect(() => {
    scrollToBottom();
  }, [isVideoCallClicked]);

  const scrollToBottom = () => {
    console.log("start working");

    const chatDiv = document.getElementById("chatDiv");
    if (chatDiv) {
      console.log("checked");

      chatDiv.scrollTop = chatDiv?.scrollHeight;
    }
  };

  const addInput = (input: string) => {
    setInput(input);
  };

  // const handleEmojiClick = (emoji: string) => {
  //   setInput((existingInput: string) => {
  //     if (existingInput) {
  //       return existingInput.concat(emoji);
  //     } else {
  //       return emoji;
  //     }
  //   });

  //   console.log(input, "input.......");
  // };

  const addMessage = async (newMessage: string) => {
    if (newMessage.trim() != "") {
      setMessages((prevMessage) => [
        ...prevMessage,
        { content: newMessage, sender: { _id: user._id } },
      ]);
      const response = await createMessageUrl(chatDetails?._id, newMessage);
      if (response) {
        socket.emit("new message", response);
      }
    }
    setInput("");
    scrollToBottom();
  };

  useEffect(() => {
    getMessagesUrl(chatDetails?._id, setMessages);
    socket.emit("join chat", chatDetails._id);
  }, [chatDetails]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (newMessageRecieved.chat._id !== chatDetails._id) {
        console.log("notification..........notification........");

        // give Notification
      } else {
        console.log("hahahaha.....", newMessageRecieved, "seen moneee");

        // setMessages((prevMessage)=>[...prevMessage,newMessageRecieved])
        getMessagesUrl(chatDetails?._id, setMessages);
      }
    });
  });

  return (
    <>
      <div
        id="chatDiv"
        className={`border overflow-y-scroll no-scrollbar rounded-2xl h-[31rem] md:mt-2 w-full`}
      >
        {!isVideoCallClicked ? (
          <div className="w-full">
            <div className="bg-white rounded-t-2xl flex justify-between top-0 border-t py-3 md:absolute w-full">
              <div className="h-full w-auto flex ml-5">
                {image ? (
                  <div
                    className="bg-contain bg-no-repeat bg-center h-12 w-12 rounded-full"
                    style={{
                      backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${image}.jpg')`,
                    }}
                  ></div>
                ) : (
                  <div className="bg-contain bg-no-repeat bg-center h-12 w-12 rounded-full">
                    <img
                      className="rounded-full"
                      src={`/public/assets/avatar-svgrepo-com.png`}
                      alt=""
                    />
                  </div>
                )}
                <h1 className="ml-2 text-black mt-2 font-bold">
                  {hearer.username}
                </h1>
              </div>
              <div className=" h-full w-auto mt-3 flex mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#000000c9"
                  className="w-5 h-5 mr-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <svg
                  onClick={() => {
                    setIsVideoCallClicked(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#000000c9"
                  className="w-5 h-5 mr-4 cursor-pointer"
                >
                  <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#000000c9"
                  className="w-5 h-5 mr-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <hr className="lg:mt-16 w-full absolute self-center  mx-auto" />

            <div
              ref={chatDivRef}
              className="pt-24 mb-20  h-auto overflow-y-scroll no-scrollbar"
            >
              {messages.length != 0 ? (
                <>
                  {messages?.map((message) => {
                    console.log(message);

                    return (
                      <>
                        <Message
                          message={message?.content}
                          sender={message.sender._id}
                          user={user._id}
                        />
                      </>
                    );
                  })}
                </>
              ) : (
                <MessageAnimation />
              )}

              {/* <div className="w-full float-left">
              <div className="float-right mr-5 rounded-bl-3xl rounded-t-3xl w-fit h-fit p-3 bg-[#283e5e] mb-1 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  🟢😍😂😶‍🌫️☹️😒
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className="float-right mr-5 rounded-3xl w-fit h-fit p-3 bg-[#283e5e] mb-1 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  nee podaa nee pande udayippaaaa 😡
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className="float-right mr-5 rounded-tl-3xl rounded-b-3xl w-fit h-fit p-3 bg-[#283e5e] mb-3 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  nee podaa vanam 🤣🤣🤣
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className=" ml-5 rounded-tr-3xl rounded-b-3xl w-fit h-fit p-3 bg-[#acc0c12e] mb-1 text-[black] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  erangi podaa 🥱🥱🫠
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className=" ml-5 rounded-tr-3xl rounded-b-3xl w-fit h-fit p-3 bg-[#acc0c12e] mb-3 text-[black] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make🥱🥱🫠
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className="float-right mr-5 rounded-bl-3xl rounded-t-3xl w-fit h-fit p-3 bg-[#283e5e] mb-3 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  orem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className="float-right mr-5 rounded-bl-3xl rounded-t-3xl w-fit h-fit p-3 bg-[#283e5e] mb-1 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  🟢😍😂😶‍🌫️☹️😒
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className="float-right mr-5 rounded-3xl w-fit h-fit p-3 bg-[#283e5e] mb-1 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  nee podaa nee pande udayippaaaa 😡
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className="float-right mr-5 rounded-tl-3xl rounded-b-3xl w-fit h-fit p-3 bg-[#283e5e] mb-3 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  nee podaa vanam 🤣🤣🤣
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className=" ml-5 rounded-tr-3xl rounded-b-3xl w-fit h-fit p-3 bg-[#acc0c12e] mb-1 text-[black] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  erangi podaa 🥱🥱🫠
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className=" ml-5 rounded-tr-3xl rounded-b-3xl w-fit h-fit p-3 bg-[#acc0c12e] mb-3 text-[black] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make🥱🥱🫠
                </h1>
              </div>
            </div>

            <div className="w-full float-left">
              <div className="float-right mr-5 rounded-bl-3xl rounded-t-3xl w-fit h-fit p-3 bg-[#283e5e] mb-3 text-[#ffffffda] font-medium text-sm  font-roboto-condensed max-w-md ">
                <h1 className="" style={{ lineBreak: "anywhere" }}>
                  orem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </h1>
              </div>
            </div> */}
              {/* {isEmoji?
            <div className="absolute">
              <EmojiPicker width={300} height={'800px'} onEmojiClick={(emoji:EmojiClickData)=>{
                
                handleEmojiClick(emoji.emoji)
              }}/>
            </div>
            :
            <>
            </>
            } */}
            </div>

            <div className="h-[4.5rem]  place-items-center rounded-b-2xl flex absolute bottom-0 w-full border bg-[#ffffff]">
              <img
                onClick={() => {
                  // setIsEmoji(true);
                }}
                className="w-9 h-9 mt-[-0.4rem] ml-5 cursor-pointer"
                src="/public/assets/smile2.png"
                alt=""
              />
              <div className="w-full mx-5 ">
                <input
                  value={input}
                  id="message-input"
                  onChange={(e) => {
                    addInput(e.target.value);
                  }}
                  placeholder="message..."
                  className="p-3 text-sm w-full pr-[2.7rem] h-9 rounded-full mt-[-0.4rem] shadow-md bg-[#e6e6e66d]"
                />
                <button
                  onClick={() => {
                    addMessage(input);
                  }}
                  className="absolute ml-[-2.3rem]"
                >
                  <img
                    className="w-6 opacity-80"
                    src="/public/assets/send.png"
                    alt=""
                  />
                </button>
              </div>
              <div className="w-9 h-9 shadow-md bg-[#e6e6e66d] mt-[-0.4rem] rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#000000bd"
                  className="w-5 h-5 m-2"
                >
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
              </div>
              <div className="w-9 h-9 mx-5 shadow-md bg-[#e6e6e66d] mt-[-0.4rem] rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#000000bd"
                  className="w-5 h-5 m-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <>
            <VideoCall setIsVideoCallClicked={setIsVideoCallClicked} myPeerId={myPeerId} />
          </>
        )}
      </div>
    </>
  );
}

export default Chat;
