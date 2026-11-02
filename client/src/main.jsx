import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const isValidPublishableKey =
  typeof publishableKey === 'string' &&
  publishableKey.startsWith('pk_') &&
  !publishableKey.includes('replace_with_your')

const configurationError = (
  <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900">
    <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
      <h1 className="text-2xl font-semibold">Clerk configuration required</h1>
      <p className="mt-3 text-slate-600">
        Add the publishable key for this Clerk application to client/.env as
        VITE_CLERK_PUBLISHABLE_KEY, then restart the Vite server.
      </p>
    </div>
  </main>
)

if (!isValidPublishableKey) {
  createRoot(document.getElementById('root')).render(configurationError)
} else {
  createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>,
  )
}
