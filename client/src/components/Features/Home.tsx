import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../vite-env";
import { useDispatch } from "react-redux";
import { MyDataType } from "../../vite-env";
import { authUrl, postUrl } from "../../api/axiosConnection";
import { useNavigate } from "react-router-dom";
import LoginInvoke from "../../utils/LoginErr";
import UserNotFound from "../../utils/modal/UserNotFound";
import { auth } from "../../connection/firebase";
import { clearUserDetails } from "../../redux/Slices/userSlice";

function Home() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  // const username = userDetails.items?.username;
  const blocked = userDetails.items?.blocked;

  const [error, setError] = useState<string>();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState<Array<MyDataType>>([]);

  const CLOUD_NAME = process.env.VITE_CLOUD_NAME as string;

  const handleNavigate = (data: object) => {
    console.log(data, "navigating from home");

    navigate("/singlepost", { state: data });
  };

  const onUserDismiss = async () => {
    dispatch(clearUserDetails());
    localStorage.removeItem("authToken");
    await handleSignOut();
    navigate("/home");
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // User is signed out
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  useEffect(() => {
    authUrl(dispatch);
    postUrl(setData).catch((error) => setError(error));
  }, []);

  return (
    <>
      {/* <div className={`md:float-left ml-40 md:ml-[-13rem] overflow-y-scroll no-scrollbar rounded-md h-[30rem] md:mt-20 ${
  username ? "w-1/2" : "w-3/4"
}`}>
  <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
  {data?.map((e: MyDataType) => {
  return (
    <>
    {
      !e.hide?
    <div
      onClick={() => {
        handleNavigate(e);
      }}
      className="h-[12rem] flex-shrink-0 rounded-md bg-contain bg-center bg-black bg-no-repeat"
      style={{ backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${e.image}.jpg')` }}
      >
            
    </div>:null
    }
    </>
  );
})}
 
  </div>
</div> */}


      <div className="w-full  grid grid-cols-2 gap-1">


      {data?.map((e: MyDataType) => {
  return (
    <>
    {
      !e.hide?
    <div
      onClick={() => {
        handleNavigate(e);
      }}
      className="h-[10rem] md:h-[13rem] rounded-md bg-contain bg-center bg-black bg-no-repeat"
      style={{ backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${e.image}.jpg')` }}
      >
            
    </div>:null
    }
    </>
  );
})}

      </div>

      {blocked ? (
        <UserNotFound
          message1={"Oops!"}
          message2={"your account has been blocked"}
          onUserDismiss={onUserDismiss}
        />
      ) : null}
      {error ? <LoginInvoke /> : null}
    </>
  );
}

export default Home;

// {data?.map((e: MyDataType) => {
//   return (
//     <div
//       onClick={() => {
//         handleNavigate(e);
//       }}
//       className="rounded-md justify-center bg-center b w-auto bg-cover bg-no-repeat md:float-left"
//       style={{ backgroundImage: `url('https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${e.image}.jpg')` }}
//       >
//             {/* <img className="h-40 w-full object-cover md:h-full md:w-40"
//         src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${e.image}.jpg`}
//         alt=""
//       /> */}
//     </div>
//   );
// })}
