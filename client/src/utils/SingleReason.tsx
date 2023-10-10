import { Dialog } from "@headlessui/react";
import { useState } from "react";

function SingleReason({reason,flag,setFlag}:{reason:string,flag:string,setFlag:(arg0: string)=>void}){

const [buttonClicked,setButtonClicked] = useState<boolean>(reason==flag?true:false)
console.log(flag,'flag....');

    const HandleReason = ()=>{
            setFlag(reason)
            if(buttonClicked)
            setButtonClicked(false)
            else
            setButtonClicked(true)
    }

    return (
        <>
        <div className="mt-3 text-center flex gap-5 sm:ml-4 sm:mt-0 sm:text-left mb-3">
            {flag==reason? 
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>:
                      <div onClick={HandleReason} className="w-6 h-6 rounded-full border-2 cursor-pointer"></div>
        }
                      <Dialog.Title
                        as="h3"
                        className="text-base font-normal leading-6 text-gray-900"
                      >
                        {reason}
                      </Dialog.Title>
                      
                    </div>
        </>
    )
}


export default SingleReason;