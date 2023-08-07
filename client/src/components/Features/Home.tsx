import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../vite-env";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slices/userSlice";
import { MyDataType } from "../../vite-env";

function Home() {


  const userDetails: any = useSelector<RootState>((store) => store.user);

  const username = userDetails.items?.username;

  const dispatch = useDispatch();

  const [data, setData] = useState<Array<MyDataType>>([]);

  const handleItem = (email: string, username: string) => {
    dispatch(setUser({ email: email, username: username }));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    console.log(token, 333333);
    // Retrieve the token from Local Storage

    const POST_URL = "http://localhost:3000/api/post";

    axios
      .get(POST_URL)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const HOME_URL = "http://localhost:3000/api/home";

    if (token) {
      axios.get(HOME_URL).then((response) => {
        if (
          response &&
          response.data &&
          response.data.email &&
          response.data.username
        ) {
          const { email, username } = response.data; // Destructure email and username from the response data
          handleItem(email, username);
        }
      });
    }
  }, []);

  return (
    <div
      className={`md:float-left ml-40 grid grid-cols-2 gap-1 row-auto columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${
        username ? "w-1/2" : "w-3/4"
      }`}
    >
      {data?.map((e:MyDataType) => {
        return (
          <div className="bg-black rounded-md justify-center">
            <img
              className=" rounded-md"
              src={`https://res.cloudinary.com/${"dcs2ybdst"}/image/upload/${
                e.image
              }.jpg`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
