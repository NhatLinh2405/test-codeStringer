import { Navigate, Outlet } from 'react-router-dom'
import videoBg from '../../assets/videos/grid.mp4'
import { getItem } from '../../utils/localstoreHandle'

export default function AuthLayout() {
  const accessToken = getItem('accessToken')

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
      <Outlet />
    </section>
  ) : (
    <Navigate to='/' replace />
  )
}
