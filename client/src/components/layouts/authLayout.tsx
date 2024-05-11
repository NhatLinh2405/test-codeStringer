import { useGoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { userApi } from '../../apis/user.api'
import videoBg from '../../assets/videos/grid.mp4'
import { getItem, handleSaveUser } from '../../utils/localstoreHandle'
import { toastSuccess } from '../../utils/toast'

export default function AuthLayout() {
  const accessToken = getItem('accessToken')
  const location = useLocation()
  const navigate = useNavigate()

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await userApi.loginWithGoogle(tokenResponse.access_token)
        if (res.data) {
          navigate('/')
          handleSaveUser(res.data.accessToken, res.data.refreshToken)
          toastSuccess(res.message)
        }
      } catch (error) {
        toast.error((error as Error).message)
      }
    }
  })

  const isLoginPage = location.pathname === '/login'

  return !accessToken ? (
    <section className='min-h-screen flex-center'>
      <video
        playsInline
        autoPlay
        loop
        muted
        src={videoBg}
        className='fixed inset-0 -z-10 min-w-full max-w-none'
      ></video>
      <div className='bg-white bg-opacity-75 rounded-2xl w-full max-w-96 mx-2'>
        <div className='w-full p-4 sm:p-5'>
          <h1 className='text-4xl mb-0 font-bold tracking-wide text-center'>
            {isLoginPage ? 'Welcome back' : 'Welcome'}
          </h1>
          <h3 className='text-lg tracking-wide text-center text-slate-600'>
            {isLoginPage ? 'Please login to your account' : 'Please sign up to your account'}
          </h3>

          <Outlet />

          <div className='flex-center gap-3 w-full my-4'>
            <div className='bg-sky-500 h-1 w-full' />
            <p className='z-[1] text-center flex-shrink-0 text-lg font-medium tracking-wide'>
              {isLoginPage ? 'Or sign in with google' : 'Or sign up with google'}
            </p>
            <div className='bg-sky-500 h-1 w-full' />
          </div>
          <div className='flex-center'>
            <button
              type='button'
              onClick={() => handleLoginWithGoogle()}
              className='rounded-full border-2 bg-white border-blue-400 p-2 shadow-pop'
            >
              <FcGoogle className='text-4xl hover:scale-105' />
            </button>
          </div>
          <p className='mt-4 text-center text-lg'>
            {isLoginPage ? `Don't have an account?` : 'Already have an account?'}
            <a
              href={isLoginPage ? '/register' : '/login'}
              className='underline decoration-sky-500 underline-offset-4 font-bold hover:text-black text-sky-600'
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
