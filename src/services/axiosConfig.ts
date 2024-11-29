// src/services/axiosConfig.ts
import axios from 'axios'
import Cookies from 'js-cookie'
const api = axios.create({
  baseURL: 'https://toannt.id.vn/public/api' // URL của API backend
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token_user_edu')

    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Thêm token vào header nếu có
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
