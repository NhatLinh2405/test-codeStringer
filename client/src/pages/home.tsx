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
    <section className='w-full md:w-fit'>
      <h1 className='text-3xl font-bold tracking-wide text-center text-white mb-14 sm:text-5xl'>Welcome to Home </h1>

      <div className='flex-col gap-5 p-5 bg-white shadow-pop sm:flex-row rounded-2xl flex-center-y sm:justify-between md:gap-8 lg:min-w-[40rem]'>
        <img
          src={profile?.image || 'https://res.cloudinary.com/azurestore/image/upload/v1695735133/avatar_sialno.png'}
          alt=''
          className='object-cover w-20 h-20 hover:scale-105 shadow-pop rounded-xl'
        />
        <div className='w-full space-y-2 text-lg'>
          <div className='flex flex-wrap md:flex-nowrap gap-1.5'>
            <p className='font-bold'>Name:</p>
            <p className='w-full break-words sm:max-w-96 xl:max-w-72'>{profile?.name || 'Loading...'}</p>
          </div>
          <div className='flex flex-wrap md:flex-nowrap gap-1.5'>
            <p className='font-bold'>Email:</p>
            <p className='w-full break-words sm:max-w-96 xl:max-w-72'>{profile?.email || 'Loading...'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className='sm:ml-auto bg-red-500 flex-center-y text-white rounded-xl hover:scale-105 hover:bg-green-500 px-3 py-2.5 gap-3'
        >
          <CiLogout className='text-2xl' />
          Logout
        </button>
      </div>
    </section>
  )
}
