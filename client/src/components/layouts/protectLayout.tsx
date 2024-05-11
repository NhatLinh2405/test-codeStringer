import { Navigate, Outlet } from 'react-router-dom'
import { getItem } from '../../utils/localstoreHandle'

export default function ProtectLayout() {
  const accessToken = getItem('accessToken')
  return accessToken ? (
    <div className='min-h-dvh flex-center mx-4'>
      <Outlet />
    </div>
  ) : (
    <Navigate to='/login' replace />
  )
}
