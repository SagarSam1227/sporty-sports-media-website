

import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Features/Home';
import Header from './components/Layout/Header/Header';
import { Provider } from 'react-redux';
import store from './redux/App/store';
import DarkModeContext from './utils/DarkModeContext';
import News from './components/Features/News';
import NearShops from './components/Features/Services/NearShops';
import Turf from './components/Features/Services/Turf';
import Create from './components/Features/Create';
import UserDetails from './components/UserDetails/UserDetails';
import SinglePost from './components/Features/posts/SinglePost';
import updateBodyBackground from './utils/setupDarkmode';
import SingleNews from './components/Features/SingleNews';
import EditUser from './components/Features/EditUser';

function Container() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    updateBodyBackground(isDarkmode);
  }, [isDarkmode]);

  if (location.pathname === '/') {
    return <Outlet />;
  }

  return (
    <>
      <DarkModeContext.Provider value={{ isDarkmode, setIsDarkmode }}>
        <Provider store={store}>
          <Header />
          <Outlet />
          <UserDetails />
        </Provider>
      </DarkModeContext.Provider>
    </>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/news',
        element: <News />
      },
      {
        path: '/create',
        element: <Create />
      },
      {
        path: '/singlepost',
        element: <SinglePost />
      },
      {
        path:'/singlenews',
        element:<SingleNews />
      },
      {
        path:'/edit-user',
        element:<EditUser />

      },
      {
        path: '/services',
        element: <NearShops />,
        children: [
          {
            path: '',
            element: <NearShops />,
          },
          {
            path: 'turf',
            element: <Turf />
          }
        ]
      }
    ]
  }
]
)



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeContext.Consumer>
      {value => {
        const { isDarkmode } = value;
        updateBodyBackground(isDarkmode); // Initial update when rendering
        return <RouterProvider router={AppRouter} />;
      }}
    </DarkModeContext.Consumer>
  </React.StrictMode>
);
