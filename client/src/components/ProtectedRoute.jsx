import React from 'react'
import { useAuth } from '@clerk/react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from './Loader'

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()
  const isMeetingRoute = location.pathname.startsWith('/meeting/')

  return (
    <>
      {!isLoaded && <Loader text="Authenticating..." />}
      {isLoaded && isSignedIn && (
        <div
          className={`h-screen overflow-y-scroll text-slate-900 flex flex-col font-sans ${
            isMeetingRoute
              ? 'bg-white'
              : "bg-slate-50 bg-[url('/layout_bg.png')] bg-cover bg-center bg-no-repeat"
          }`}
        >
            {!isMeetingRoute && <Navbar/>}
            <Outlet />
            <Footer/>
        </div>
      )}
      {isLoaded && !isSignedIn && (
        <Navigate
          to="/login"
          replace
          state={{ from: `${location.pathname}${location.search}` }}
        />
      )}
    </>
  )
}

export default ProtectedRoute