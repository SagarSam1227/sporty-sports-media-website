import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState} from "../../vite-env";
<<<<<<< Updated upstream
=======
import { setUser } from "../../redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import AllPosts from "../Features/AllPosts";
import { Route } from "react-router-dom";
>>>>>>> Stashed changes


function Home() {
   
      interface MyDataType {
          largeImageURL: string
        }
        const userDetails:any= useSelector<RootState>((store) => store.user);

        const username = userDetails.items?.username

    const [data, setData] = useState<Array<MyDataType>>([]);

<<<<<<< Updated upstream
    


    useEffect(() => {
        axios.get("https://pixabay.com/api/?key=38335937-ff43c3ccd5cc0e0665bf8187d&q=sports&image_type=photo&per_page=50&pretty=true").then(response => {
            console.log(response.data.hits[0].largeImageURL);

            setData(response.data.hits)

        }).catch(error => {
            console.log(error);

        }
        )
    }, [])
=======
    const handleItem=(email:string,username:string)=>{
        dispatch(setUser({email:email,username:username}))
    }

    useEffect(()=>{
        const token = localStorage.getItem('authToken');  // Retrieve the token from Local Storage
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
        const HOME_URL = "http://localhost:3000/api/home"

        if(token){
        axios.get(HOME_URL).then((response)=>{
            if (response && response.data && response.data.email && response.data.username) {
                const { email, username } = response.data; // Destructure email and username from the response data
                handleItem(email, username);
              }
        })
    }
    })
>>>>>>> Stashed changes


    return (
        <div className={`md:float-left ml-40 grid grid-cols-2 gap-1 row-auto columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${username? "w-1/2" : "w-3/4"}`}>
           
           <Route path="/" element={<AllPosts />} />
           <Route path="/" element={<AllPosts />} />
           <Route path="/" element={<AllPosts />} />
           <Route path="/" element={<AllPosts />} />

        

        </div>
    )
}


export default Home;