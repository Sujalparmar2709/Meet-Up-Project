import React from 'react'
import { ClerkLoading, useAuth } from '@clerk/react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  return (
    <>
      <ClerkLoading>
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
          Loading your workspace...
        </div>
      </ClerkLoading>
      {isLoaded && isSignedIn && (
        <div className="h-screen overflow-y-scroll bg-slate-50 text-slate-900 flex flex-col font-sans bg-[url('/layout_bg.png')] bg-cover bg-center bg-no-repeat">
            <Navbar/>
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