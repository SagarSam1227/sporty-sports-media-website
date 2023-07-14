import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage/LandingPage'

function Container(){
  return (
    <>
    <LandingPage />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Container />
  </React.StrictMode>,
)
