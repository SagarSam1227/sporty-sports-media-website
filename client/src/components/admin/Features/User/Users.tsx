import { useEffect, useState } from "react";
import { fetchUserUrl } from "../../../../api/axiosConnection";
import { MyDataType } from "../../../../vite-env";
import EachUser from "./EachUser";

// interface User {
//   username: string,
//   email: string,
//   blocked:boolean
// }

function ListUsers() {
  const [data, setData] = useState<Array<MyDataType>>([]);

  useEffect(() => {
    fetchUserUrl(setData);
    console.log(data);
  }, []);

  return (
    <>
      <div className="mt-[12rem] max-w-fit mx-[9rem] rounded-lg">
        <table className="table-auto text-center">
          <thead>
            <tr className="">
              <th className="">
                <div className="border-[#d0d0d0] border py-3 rounded-l-lg shadow-md">
                  user name
                </div>
              </th>
              <th className="">
                <div className="border-[#d0d0d0] border py-3 shadow-md">
                  e-mail
                </div>
              </th>
              <th className="">
                <div className="border-[#d0d0d0] border py-3 shadow-md">
                  status
                </div>
              </th>
              <th className="">
                <div className="border-[#d0d0d0] border py-3 rounded-r-lg shadow-md">
                  action
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user:any) => {
              return (
                <EachUser user={user}/>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListUsers;
