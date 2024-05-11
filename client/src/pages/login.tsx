import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible, AiFillUnlock, AiOutlineLoading3Quarters } from 'react-icons/ai'
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
  const [loading, setLoading] = useState<boolean>(false)
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
        setLoading(true)
        const res = await userApi.login(values)
        if (res.data) {
          toastSuccess(res.message)
          handleSaveUser(res.data.accessToken, res.data.refreshToken)
          navigate('/')
          setLoading(false)
        }
      } catch (error) {
        toastError((error as IError).message)
      }
    },
    [navigate]
  )

  return (
    <div className='mt-5'>
      <form onSubmit={handleSubmit(submitHandle)}>
        <div className='space-y-1.5'>
          <InputField
            autoFocus
            name='email'
            placeholder='Ex: john@gmail.com'
            register={register}
            Icon={MdPerson}
            error={errors.email?.message}
          />

          <div className='relative'>
            <InputField
              name='password'
              type={show ? 'text' : 'password'}
              placeholder='Ví dụ: 12345678..'
              register={register}
              Icon={AiFillUnlock}
              error={errors.password?.message}
            />
            <span onClick={() => setShow(!show)}>
              {show ? (
                <AiFillEye className='absolute right-6 top-2.5 text-3xl' />
              ) : (
                <AiFillEyeInvisible className='absolute right-6 top-2.5 text-3xl' />
              )}
            </span>
          </div>
        </div>
        <button
          disabled={loading}
          type='submit'
          className={`${loading && 'bg-opacity-55 cursor-not-allowed'} w-full py-2 mt-5 text-xl font-bold tracking-wider text-white rounded-2xl bg-sky-600 hover:scale-105 md:py-3`}
        >
          {loading && <AiOutlineLoading3Quarters className='inline-block mr-2 text-xl animate-spin' />}
          Login
        </button>
      </form>
    </div>
  )
}
