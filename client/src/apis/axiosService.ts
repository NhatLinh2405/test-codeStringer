import axios, { InternalAxiosRequestConfig } from 'axios'
import { getItem, removeItem, setItem } from '../utils/localstoreHandle'

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API
})

axiosService.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any>) {
    const accessToken = getItem('accessToken')
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosService.interceptors.response.use(
  function (response) {
    return response.data
  },

  function (error) {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      removeItem('accessToken')
      const refreshToken = getItem('refreshToken')

      if (refreshToken) {
        originalRequest._retry = true
        return axiosService
          .post('/user/refresh-token', { refreshToken })
          .then((res) => {
            if (res.data) {
              setItem<string>('accessToken', res.data.accessToken)
              setItem<string>('refreshToken', res.data.refreshToken)
              originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`

              axiosService.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken
              return axiosService(originalRequest)
            }
          })
          .catch((err) => {
            console.log('err', err)
            removeItem('accessToken')
            removeItem('refreshToken')
            window.location.href = '/sign-in'
          })
      }
    }

    return Promise.reject(error.response?.data)
  }
)

export default axiosService
