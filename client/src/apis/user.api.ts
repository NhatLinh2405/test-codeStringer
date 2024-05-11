import { ISignIn, ISignUp } from '../types/payload'
import axiosService from './axiosService'

const ENDPOINT = 'users'

export const userApi = {
  // post
  login: (data: ISignIn) => axiosService.post(`/${ENDPOINT}/sign-in`, data),
  signUp: (data: ISignUp) => axiosService.post(`/${ENDPOINT}/sign-up`, data),

  // get
  getProfile: () => axiosService.get(`/${ENDPOINT}/me`)
}
