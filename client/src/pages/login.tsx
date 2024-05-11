import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { MdPerson } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { userApi } from '../apis/user.api'
import InputField from '../components/form/inputField'
import { handleSaveUser } from '../utils/localstoreHandle'
import { toastError, toastSuccess } from '../utils/toast'
import { signInSchemaZ } from '../utils/zSchema'

export default function LoginPage() {
  const [show, setShow] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof signInSchemaZ>>({
    resolver: zodResolver(signInSchemaZ)
  })

  const submitHandle = useCallback(
    async (values: z.infer<typeof signInSchemaZ>) => {
      try {
        const res = await userApi.login(values)
        if (res.data) {
          toastSuccess(res.message)
          handleSaveUser(res.data.accessToken, res.data.refreshToken)
          navigate('/')
        }
      } catch (error) {
        toastError((error as IError).message)
      }
    },
    [navigate]
  )

  const handleLoginWithGg = () => {
    console.log('login with google')
  }

  return (
    <div className='bg-white bg-opacity-75 rounded-2xl w-full max-w-96 mx-2'>
      <div className='w-full p-4 sm:p-5'>
        <h1 className='text-4xl mb-2 font-bold tracking-wide text-center'>Welcome back</h1>
        <h3 className='text-lg tracking-wide text-center text-slate-600'>Please login to your account</h3>

        <div className='mt-4'>
          <form onSubmit={handleSubmit(submitHandle)}>
            <div className=''>
              <InputField
                autoFocus
                label='Email'
                name='email'
                placeholder='Ex: john@gmail.com'
                register={register}
                Icon={MdPerson}
                error={errors.email?.message}
              />

              <div className='relative mt-8'>
                <InputField
                  label='Password'
                  name='password'
                  type={show ? 'text' : 'password'}
                  placeholder='Ví dụ: 12345678..'
                  register={register}
                  Icon={AiFillUnlock}
                  error={errors.password?.message}
                />

                <span onClick={() => setShow(!show)}>
                  {show ? (
                    <AiFillEye className='absolute text-3xl translate-y-5 top-5 right-6 ' />
                  ) : (
                    <AiFillEyeInvisible className='absolute text-3xl translate-y-5 top-5 right-6 ' />
                  )}
                </span>
              </div>
            </div>
            <button
              type='submit'
              className='w-full py-2 mt-10 text-xl font-bold tracking-wider text-white rounded-2xl bg-sky-600 hover:scale-105 md:py-3'
            >
              Đăng nhập
            </button>
          </form>
        </div>
        <div className='flex-center gap-3 w-full my-4'>
          <div className='bg-sky-500 h-1 w-full' />
          <p className='z-[1] text-center flex-shrink-0 text-lg font-medium tracking-wide'>Or sign in with google</p>
          <div className='bg-sky-500 h-1 w-full' />
        </div>
        <div className='flex-center'>
          <button
            type='button'
            onClick={handleLoginWithGg}
            className='rounded-full border-2 bg-white border-blue-400 p-2 shadow-pop'
          >
            <FcGoogle className='text-4xl hover:scale-105' />
          </button>
        </div>
        <p className='mt-4 text-center text-lg'>
          Don&apos;t have an account?{' '}
          <a
            href='/sign-up'
            className='underline decoration-sky-500 underline-offset-4 font-bold hover:text-black text-sky-600'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
