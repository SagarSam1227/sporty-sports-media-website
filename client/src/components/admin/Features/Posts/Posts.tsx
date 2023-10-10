import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchUserUrl, postUrl } from "../../../../api/axiosConnection";
import { MyDataType } from "../../../../vite-env";
import EachPost from "./EachPost";

// interface User {
//   username: string,
//   email: string,
//   blocked:boolean
// }

function ListPosts() {
  const [data, setData] = useState<Array<MyDataType>>([]);



  useEffect(() => {
    postUrl(setData)
    console.log(data)
  }, []);

  return (
    <>

      <div className="mt-[12rem] max-w-fit mx-[16rem] rounded-lg">
        <table className="table-auto text-center">
          <thead>
            <tr className="">
              <th className="">
                <div className="border-[#d0d0d0] border py-3 rounded-l-lg shadow-md">
                  image
                </div>
              </th>
              <th className="">
                <div className="border-[#d0d0d0] border py-3 shadow-md">
                  reports
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
            {data.map((post:any) => {
              return (
                <>
                {post.reports[0]?
                  <EachPost post={post}/>:
                  null
                }
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListPosts;


