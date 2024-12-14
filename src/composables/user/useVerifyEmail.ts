import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import api from '@/services/axiosConfig'

export function useVerifyEmail() {
  const loading = ref(false)
  const router = useRouter()
  const route = useRoute()

  const verifyEmail = async (token: string) => {
    loading.value = true
    try {
      const response = await api.post(`auth/verify-email/${token}`)
      if (response.data.status === 'OK') {
        router.push('/login')
        ElNotification({
          title: 'Thành công',
          message: 'Xác minh email thành công! Vui lòng đăng nhập.',
          type: 'success'
        })
      } else {
        router.push('/login')
        ElNotification({
          title: 'Thất bại',
          message: response.data.message || 'Có lỗi xảy ra trong quá trình xác minh email.',
          type: 'error'
        })
      }
    } catch (error) {
      ElNotification({
        title: 'Lỗi',
        message: 'Đã xảy ra lỗi trong quá trình xác minh email.',
        type: 'error'
      })
      router.push('/login')
    } finally {
      loading.value = false
    }
  }

  const token = route.params.token as string
  if (token) {
    verifyEmail(token)
  }

  return {
    loading
  }
}
