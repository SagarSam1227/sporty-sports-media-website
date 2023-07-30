import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage/LandingPage'
import { createBrowserRouter, RouterProvider,useLocation, Outlet } from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Layout/Header/Header'
import UserDetails from './components/UserProfile/UserDetails'
import { Provider } from 'react-redux'
import store from './redux/App/store'

function Container() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Outlet />;
  }

  return (
    <>
    <Provider store={store}>
    <Header />
      <Outlet />
      <UserDetails />
    </Provider>
    </>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/home",
        element: <Home />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>,
)
