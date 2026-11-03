import { SignIn, SignUp, useAuth } from '@clerk/react'
import React from 'react'
import { Navigate } from 'react-router-dom'

const Login = ({ mode = 'login' }) => {
    const { isLoaded, isSignedIn } = useAuth()
    const showSignUp = mode === 'register'

    if (isLoaded && isSignedIn) {
        return <Navigate to="/dashboard" replace />
    }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('/login_bg.png')] bg-cover bg-center bg-no-repeat p-4 font-sans text-slate-800 md:p-6 lg:p-8">
        <div className="flex w-full justify-center py-2">
            {showSignUp ? (
                <SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/dashboard" />
            ): (
                <SignIn routing="path" path="/login" signUpUrl="/register" fallbackRedirectUrl="/dashboard" />
            )}
        </div>
    </div>
  )
}

export default Login