import { Navigate, Outlet } from 'react-router-dom'
import { getItem } from '../../utils/localstoreHandle'

export default function ProtectLayout() {
  const accessToken = getItem('accessToken')
  return accessToken ? (
    <div className='min-h-dvh flex-center px-2 bg-gradient-to-br from-[#0ea2d5] to-[#b1d4b0]'>
      <Outlet />
    </div>
  ) : (
    <Navigate to='/login' replace />
  )
}
