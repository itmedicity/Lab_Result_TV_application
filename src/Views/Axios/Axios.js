
import axios from 'axios';
import { ELLIDER_API_URL } from '../Constant/Static'

export const axiosellider = axios.create({
  baseURL: ELLIDER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en-GB,en'
  }
})

axiosellider.interceptors.request.use(
  function (config) {
    const userinfo = localStorage.getItem('userDetl')
    const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  function (err) {
    console.log(err)
  }
)

