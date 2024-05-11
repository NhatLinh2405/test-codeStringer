import { useEffect, useState } from 'react'
import { userApi } from '../apis/user.api'
import { IUser } from '../types/response'
import { toastError } from '../utils/toast'

export function useGetProfile() {
  const [profile, setProfile] = useState<IUser | null>(null)

  async function getProfile() {
    try {
      const res = await userApi.getProfile()
      if (res.data) {
        setProfile(res.data)
      }
    } catch (error) {
      toastError((error as IError).message)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return profile
}
