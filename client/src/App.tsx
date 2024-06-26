import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, ProtectLayout } from './components/layouts'
import { HomePage, LoginPage } from './pages'
import RegisterPage from './pages/register'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      }
    ]
  },
  {
    element: <ProtectLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  }
])

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID as string}>
      <RouterProvider router={router} />
      <Toaster
        position='top-center'
        reverseOrder={true}
        toastOptions={{
          style: {
            maxWidth: '80%'
          }
        }}
      />
    </GoogleOAuthProvider>
  )
}

export default App
