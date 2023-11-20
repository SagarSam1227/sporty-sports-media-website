import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Outlet,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Features/Home";
import Header from "./components/Layout/Header/Header";
import { Provider } from "react-redux";
import DarkModeContext from "./utils/DarkModeContext";
import News from "./components/Features/News";
import NearShops from "./components/Features/Services/NearShops";
import Turf from "./components/Features/Services/Turf";
import Create from "./components/Features/Create";
import UserDetails from "./components/UserDetails/UserDetails";
import SinglePost from "./components/Features/posts/SinglePost";
import updateBodyBackground from "./utils/setupDarkmode";
import SingleNews from "./components/Features/SingleNews";
import EditUser from "./components/Features/EditUser";
import PageNotFound from "./utils/PageNotFound";
import SomethingWentWrong from "./utils/somethingWentWrong";
import OthersProfile from "./components/Features/OthersProfile";
import store, { persistor } from "./redux/App/store";
import { PersistGate } from "redux-persist/integration/react";
import LoginInvoke from "./utils/LoginErr";
import AdminLogin from "./components/admin/AdminLogin/AdminLogin";
import Chat from "./components/Features/chat/SingleChat";
import NetworkErr from "./utils/modal/NetworkErr";
import Body from "./components/Layout/Body/Body";




function Container() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const location = useLocation();
  const [isOnline, setIsOnline] = useState<boolean>(window.navigator.onLine);

  useEffect(() => {
    // Add event listeners for online and offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };
  
 

  useEffect(() => {
    updateBodyBackground(isDarkmode);
  }, [isDarkmode]);

  if(!isOnline){
    return (
      <>
      <NetworkErr />
      </>
    )
  }

  if (location.pathname === "/") {
    return <Outlet />;
  } else if (location.pathname =="/admin" ) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return ( 
    <>
      <DarkModeContext.Provider value={{ isDarkmode, setIsDarkmode }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <Header />
            <Outlet />
            <UserDetails /> */}
            <Body />
          </PersistGate>
        </Provider>
      </DarkModeContext.Provider>
    </>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element:
        // <Sample />,
         <LandingPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/singlepost",
        element: <SinglePost />,
      },
      {
        path: "/singlenews",
        element: <SingleNews />,
      },
      {
        path: "/edit-user",
        element: <EditUser />,
      },
      {
        path: "/inbox",
        element: <Chat />,
      },
      {
        path: "/user-info",
        element: <OthersProfile />,
      },
      {
        path: "login",
        element: <LoginInvoke />,
      },
      {
        path: "/services",
        element: <NearShops />,
        children: [
          {
            path: "",
            element: <NearShops />,
          },
          {
            path: "turf",
            element: <Turf />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLogin />,
       
      },
      { path: "/error", element: <SomethingWentWrong /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeContext.Consumer>
      {(value) => {
        const { isDarkmode } = value;
        updateBodyBackground(isDarkmode); // Initial update when rendering
        return <RouterProvider router={AppRouter} />;
      }}
    </DarkModeContext.Consumer>
  </React.StrictMode>
);
