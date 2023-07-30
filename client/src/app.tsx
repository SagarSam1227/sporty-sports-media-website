

import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import UserDetails from './components/UserDetails/UserDetails';
import { Provider } from 'react-redux';
import store from './redux/App/store';
import DarkModeContext from './utils/DarkModeContext';

function updateBodyBackground(isDarkmode:boolean) {
  const body = document.body;
  if (isDarkmode) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}

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
        element: <Home />
      }
    ]
  }
]);

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
