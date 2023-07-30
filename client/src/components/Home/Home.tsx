import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState} from "../../vite-env";
import AllPosts from "../Features/AllPosts";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slices/userSlice";
import { Route, Routes } from "react-router-dom";
import News from "../Features/News";


function Home() {
   
      interface MyDataType {
          largeImageURL: string
        }

        const userDetails:any= useSelector<RootState>((store) => store.user);

        const username = userDetails.items?.username

        const dispatch = useDispatch()

    const [data, setData] = useState<Array<MyDataType>>([]);

    const handleItem=(email:string,username:string)=>{
        dispatch(setUser({email:email,username:username}))
    }

    const handleItem=(email:string,username:string)=>{
        dispatch(setUser({email:email,username:username}))
    }

    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        
        console.log(token,333333);
        // Retrieve the token from Local Storage
        
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


    return (
        <div className={`md:float-left ml-40 grid grid-cols-2 gap-1 row-auto columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${username? "w-1/2" : "w-3/4"}`}>
           
           <Routes>
           <Route path="/" element={<AllPosts />} />
           <Route path="/news" element={<News />} />
           <Route path="/" element={<AllPosts />} />
           <Route path="/" element={<AllPosts />} />
           </Routes>

        </div>
    )
}


export default Home;