// src/composables/useShowCourse.ts
import { ref } from 'vue'
import axios from 'axios'
// import { myToken } from '@/interfaces/token';
import type { TCourseAdmin } from '@/interfaces/course.interface'
import api from '@/services/axiosConfig'

export const useShowCourse = () => {
  const courses = ref<TCourseAdmin[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // const userToken = ref(myToken);

  const fetchCourses = async (limit: number) => {
    isLoading.value = true
    error.value = null

    // Thiết lập token vào tiêu đề của Axios
    // axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`;

    try {
      const response = await api.get(`/auth/courses?limit=${limit}`)
      if (Array.isArray(response.data.data.data)) {
        courses.value = response.data.data.data // Gán dữ liệu cho courses
      } else {
        throw new Error('Dữ liệu trả về không phải là một mảng')
      }
    } catch (err: unknown) {
      // Chỉ định kiểu unknown cho err
      if (axios.isAxiosError(err)) {
        // Kiểm tra nếu là lỗi Axios
        error.value = err.response ? err.response.data : err.message // Lưu thông tin lỗi
      } else {
        error.value = 'Đã xảy ra lỗi không xác định'
      }
      console.error('Lỗi fetch dữ liệu course:', error.value)
    } finally {
      isLoading.value = false
    }
  }

  return {
    courses,
    isLoading,
    error,
    fetchCourses
  }
}
