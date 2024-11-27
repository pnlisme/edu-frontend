// src/composables/useLogin.ts
import { ref, watch } from 'vue'
import { useAuthStore } from '@/store/auth'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
export function useLogin() {
  const loading = ref(false)
  const authStore = useAuthStore()
  const email = ref<string>('')
  const password = ref<string>('')
  const emailError = ref<string | null>(null)
  const passwordError = ref<string | null>(null)
  const router = useRouter()
  const validateForm = (): boolean => {
    let isValid = true

    if (!email.value) {
      emailError.value = 'Email không được để trống'
      isValid = false
    } else {
      emailError.value = null
    }

    if (!password.value) {
      passwordError.value = 'Mật khẩu không được để trống'
      isValid = false
    } else if (password.value.length < 8) {
      passwordError.value = 'Mật khẩu phải có ít nhất 8 ký tự'
      isValid = false
    } else {
      passwordError.value = null
    }

    return isValid
  }

  watch(email, (newVal) => {
    if (newVal) emailError.value = ''
  })

  watch(password, (newVal) => {
    if (newVal && newVal.length >= 8) passwordError.value = ''
  })
  const handleSubmit = async () => {
    if (!validateForm()) return
    loading.value = true
    try {
      const res = await authStore.login(email.value, password.value)
      // console.log(res)
      // Nếu có lỗi từ authStore thì không hiển thị thông báo thành công
      if (res.status === 'FAIL') {
        ElNotification({
          title: 'Thất bại',
          message: res.message || 'Đăng nhập không thành công',
          type: 'error'
        })
      }
      if (res.status === 'OK') {
        ElNotification({
          title: 'Thành công',
          message: res.message || 'Đăng nhập thành công',
          type: 'success'
        })

        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/'
        localStorage.removeItem('redirectAfterLogin')
        if (redirectUrl === '/login') {
          router.push('/')
        } else {
          router.push(redirectUrl)
        }
      }
      // Chuyển hướng đến trang khác (ví dụ: dashboard)
    } catch (error) {
      console.error(error)
      ElNotification({
        title: 'Lỗi',
        message: 'Có lỗi xảy ra trong quá trình đăng nhập',
        type: 'error'
      })
    } finally {
      loading.value = false
    }
  }
  return {
    email,
    password,
    emailError,
    passwordError,
    handleSubmit,
    authStore,
    loading
  }
}
