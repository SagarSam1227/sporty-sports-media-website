import { useState } from "react";
import { blockUserUrl } from "../../../../api/axiosConnection";

interface User {
    username: string;
    email: string;
    blocked:boolean
  }
  
  function EachUser({ user }: { user: User }) {
    console.log(user,'usersssss');
    

    const [isBlocked,setIsBlocked] = useState<boolean>(user.blocked)

    const handleBlock = ()=>{
        if(isBlocked){
            blockUserUrl(false,user.email)
            setIsBlocked(false)
        }else{
            blockUserUrl(true,user.email)
            setIsBlocked(true)
        }
      }
    
    return (
        <tr className="h-[3rem]">
                  <td className="w-[12rem] mb-2 ">
                    <div className="py-2 border border-l rounded-l-lg">
                      {user.username}
                    </div>
                  </td>
                  <td className="w-[12rem] mb-2">
                    <div className="py-2 border">{user.email}</div>
                  </td>
                  {isBlocked?
                  <td className="w-[12rem] mb-2">
                  <div className="py-3 border text-xs font-medium text-red-700">blocked</div>
                </td>:
                  <td className="w-[12rem] mb-2">
                    <div className="py-3 border text-xs font-medium text-green-700">active</div>
                  </td>
                }

                {isBlocked?
                <td className="w-[12rem] mb-2">
                <div className="py-2 border border-r rounded-r-lg">
                  <button onClick={()=>{
                    handleBlock()
                  }} className="rounded-full bg-black px-5 py-1 text-gray-300 text-xs w-[5rem]">unblock</button>
                </div>
              </td>:
              <td className="w-[12rem] mb-2">
              <div className="py-2 border border-r rounded-r-lg">
                <button onClick={()=>{
                  handleBlock()
                }} className="rounded-full bg-white px-5 py-1 text-black border border-gray-800 text-xs w-[5rem]">block</button>
              </div>
            </td>}
                </tr>
    )
}


export default EachUser;