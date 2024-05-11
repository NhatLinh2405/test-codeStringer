import { CiLogout } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { useGetProfile } from '../hooks/useGetUser'
import { handleRemoveUser } from '../utils/localstoreHandle'

export default function HomePage() {
  const navigate = useNavigate()
  const profile = useGetProfile()

  function handleLogout() {
    handleRemoveUser()
    navigate('/login')
  }
  return (
    <section className=''>
      <h1 className='text-5xl font-bold tracking-wide mb-20'>Welcome to Home Page</h1>

      <div className='shadow-pop bg-white p-5 rounded-2xl flex-center-y justify-between gap-8'>
        <img src={profile?.image} alt='' className='w-20 h-20 hover:scale-105 object-cover shadow-pop rounded-xl' />
        <div className='space-y-2 text-lg'>
          <p className=''>
            <span className='font-bold'>Name:</span> {profile?.name}
          </p>
          <p className=''>
            <span className='font-bold'>Email:</span> {profile?.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className='ml-auto bg-red-500 flex-center-y text-white rounded-xl hover:scale-105 hover:bg-green-500 px-3 py-2.5 gap-3'
        >
          <CiLogout className='text-2xl' />
          Logout
        </button>
      </div>
    </section>
  )
}
