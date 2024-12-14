// src/services/axiosConfig.ts
import axios from 'axios'
import Cookies from 'js-cookie'
const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api' // URL của API backend
  baseURL: 'http://192.168.1.33:8080/api' // URL của API backend env
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
