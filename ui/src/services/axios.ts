import axios from 'axios'
import { AppConstants } from '@/constants/AppContants'

export const axiosInstance = axios.create({
  baseURL: AppConstants.BACKEND_BASE_URL,
})