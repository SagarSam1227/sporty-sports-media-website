import axios from "axios";
import { useEffect,useState } from "react";


function AllPosts(){

    
    interface MyDataType {
        largeImageURL: string
      }


  const [data, setData] = useState<Array<MyDataType>>([]);


    
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
       <>
        {data?.map((e: { largeImageURL: string | undefined; }) => {
            return (
                <div className="bg-black rounded-md justify-center">
                    <img className=" rounded-md" src={e.largeImageURL} alt="" />
                </div>
            )
        })}
        </>
    )
}


export default AllPosts;