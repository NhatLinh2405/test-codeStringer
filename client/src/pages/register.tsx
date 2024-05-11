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
import { registerSchemaZ } from '../utils/zSchema'

export interface IShow {
  password: boolean
  confirmPassword: boolean
}

export default function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<IShow>({
    password: false,
    confirmPassword: false
  })
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof registerSchemaZ>>({
    resolver: zodResolver(registerSchemaZ)
  })

  const submitHandle = useCallback(
    async (values: z.infer<typeof registerSchemaZ>) => {
      try {
        setLoading(true)
        const res = await userApi.register(values)
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
            name='name'
            placeholder='Ex: Nhat Linh'
            register={register}
            Icon={MdPerson}
            error={errors.name?.message}
          />
          <InputField
            autoFocus
            name='email'
            placeholder='Ex: linh@gmail.com'
            register={register}
            Icon={MdPerson}
            error={errors.email?.message}
          />

          <div className='relative'>
            <InputField
              name='password'
              type={show.password ? 'text' : 'password'}
              placeholder='Ví dụ: 12345678..'
              register={register}
              Icon={AiFillUnlock}
              error={errors.password?.message}
            />

            <span
              onClick={() =>
                setShow({
                  ...show,
                  password: !show.password
                })
              }
            >
              {show.password ? (
                <AiFillEye className='absolute right-6 top-2.5 text-3xl' />
              ) : (
                <AiFillEyeInvisible className='absolute right-6 top-2.5 text-3xl' />
              )}
            </span>
          </div>
          <div className='relative'>
            <InputField
              name='confirmPassword'
              type={show.confirmPassword ? 'text' : 'password'}
              placeholder='Ví dụ: 12345678..'
              register={register}
              Icon={AiFillUnlock}
              error={errors.confirmPassword?.message}
            />

            <span
              onClick={() =>
                setShow({
                  ...show,
                  confirmPassword: !show.confirmPassword
                })
              }
            >
              {show.confirmPassword ? (
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
          Register
        </button>
      </form>
    </div>
  )
}
