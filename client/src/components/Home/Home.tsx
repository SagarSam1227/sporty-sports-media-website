import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../vite-env";


function Home() {
   
      interface MyDataType {
          largeImageURL: string
        }
        const userDetails:any = useSelector<RootState>((store) => store.user);

        const username = userDetails.items?.username

    const [data, setData] = useState<Array<MyDataType>>([]);

    console.log(userDetails);
    


    useEffect(() => {
        axios.get("https://pixabay.com/api/?key=38335937-ff43c3ccd5cc0e0665bf8187d&q=sports&image_type=photo&per_page=50&pretty=true").then(response => {
            console.log(response.data.hits[0].largeImageURL);

            setData(response.data.hits)

        }).catch(error => {
            console.log(error);

        }
        )
    }, [])


    return (
        <div className={`md:float-left ml-40 grid grid-cols-2 gap-1 row-auto columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${username? "w-1/2" : "w-3/4"}`}>
            {data?.map((e) => {
                return (
                    <div className="bg-black rounded-md justify-center">
                        <img className=" rounded-md" src={e.largeImageURL} alt="" />
                    </div>
                )
            })}


        </div>
    )
}


export default Home;