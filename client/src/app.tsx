import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage/LandingPage'
import Footer from './components/Layout/Footer/Footer'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from './components/Home/Home'

function Container() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
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
    }]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>,
)
