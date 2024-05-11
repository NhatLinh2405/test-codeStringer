import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { userApi } from '../../apis/user.api'
import videoBg from '../../assets/videos/grid.mp4'
import { getItem, handleSaveUser } from '../../utils/localstoreHandle'
import { toastSuccess } from '../../utils/toast'

export default function AuthLayout() {
  const [loading, setLoading] = useState<boolean>(false)
  const accessToken = getItem('accessToken')
  const location = useLocation()
  const navigate = useNavigate()

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true)
      try {
        const res = await userApi.loginWithGoogle(tokenResponse.access_token)
        if (res.data) {
          navigate('/')
          handleSaveUser(res.data.accessToken, res.data.refreshToken)
          toastSuccess(res.message)
        }
      } catch (error) {
        toast.error((error as Error).message)
      } finally {
        setLoading(false)
      }
    }
  })

  const isLoginPage = location.pathname === '/login'

  return !accessToken ? (
    <section className='min-h-dvh flex-center'>
      <video
        playsInline
        autoPlay
        loop
        muted
        src={videoBg}
        className='fixed inset-0 min-w-full min-h-screen -z-10 max-w-none'
      />
      <div className='w-full mx-2 bg-white bg-opacity-75 rounded-2xl max-w-96'>
        <div className='w-full p-4 sm:p-5'>
          <h1 className='mb-0 text-4xl font-bold tracking-wide text-center'>
            {isLoginPage ? 'Welcome back' : 'Welcome'}
          </h1>
          <h3 className='text-lg tracking-wide text-center text-slate-600'>
            {isLoginPage ? 'Please login to your account' : 'Please sign up to your account'}
          </h3>

          <Outlet />

          <div className='w-full gap-3 my-4 flex-center'>
            <div className='w-full h-1 bg-sky-500' />
            <p className='z-[1] text-center flex-shrink-0 text-lg font-medium tracking-wide'>
              {isLoginPage ? 'Or sign in with google' : 'Or sign up with google'}
            </p>
            <div className='w-full h-1 bg-sky-500' />
          </div>
          <div className='flex-center'>
            <button
              disabled={loading}
              type='button'
              onClick={() => handleLoginWithGoogle()}
              className={`${loading && 'cursor-not-allowed bg-opacity-55'} p-2 bg-white border-2 border-blue-400 rounded-full shadow-pop`}
            >
              <FcGoogle className='text-4xl hover:scale-105' />
            </button>
          </div>
          <p className='mt-4 text-lg text-center'>
            {isLoginPage ? `Don't have an account?` : 'Already have an account?'}
            <a
              href={isLoginPage ? '/register' : '/login'}
              className='font-bold underline decoration-sky-500 underline-offset-4 hover:text-black text-sky-600'
            >
              {' '}
              {isLoginPage ? 'Register' : 'Login'}
            </a>
          </p>
        </div>
      </div>
    </section>
  ) : (
    <Navigate to='/' replace />
  )
}
