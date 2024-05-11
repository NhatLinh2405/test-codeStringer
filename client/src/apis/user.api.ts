import { ISignIn, ISignUp } from '../types/payload'
import axiosService from './axiosService'

const ENDPOINT = 'users'

export const userApi = {
  // post
  login: (data: ISignIn) => axiosService.post(`/${ENDPOINT}/sign-in`, data),
  register: (data: ISignUp) => axiosService.post(`/${ENDPOINT}/sign-up`, data),
  loginWithGoogle: (tokenId: string) => axiosService.post(`/${ENDPOINT}/login-google`, { tokenId }),
  // get
  getProfile: () => axiosService.get(`/${ENDPOINT}/me`)
}
