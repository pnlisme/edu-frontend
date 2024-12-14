import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type {
  TAuthState,
  TUpdateUser,
  TUpdateUserAdmin,
  TUserAuth
} from '@/interfaces/user.interface'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
export const useAuthStore = defineStore('auth', () => {
  const state = ref<TAuthState>({
    user: null,
    allUser: [],
    deletedUser: [],
    token: Cookies.get('token_user_edu') || null,
    loading: false,
    error: null,
    total: 0
  })
  const login = async (email: string, password: string) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.post('/auth/login', { email, password })
      state.value.token = response.data.access_token
      state.value.user = await response.data.data
      Cookies.set('token_user_edu', response.data.access_token, { expires: 7 }) // Lưu token vào localStorage
      return response.data
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Đăng nhập thật bại'
    } finally {
      state.value.loading = false
    }
  }
  const logout = () => {
    // const router = useRouter()

    state.value.user = null
    state.value.token = null
    Cookies.remove('token_user_edu')
    location.reload()
    // router.push('/')
  }
  const register = async (userData: TUserAuth) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Registration failed'
    } finally {
      state.value.loading = false
    }
  }
  const userData = async () => {
    if (!state.value.token) return
    state.value.loading = true
    const router = useRouter()
    try {
      const response = await api.get('/auth/profile')
      const isToken = await response.data
      if (isToken.status === 'FAIL') {
        logout()
        router.push('/')
        // ElNotification({
        //   title: 'Thất bại',
        //   message: isToken.message || 'Bạn không có quyền truy cập',
        //   type: 'error'
        // })
        return null
      }
      state.value.user = await response.data.data
      // console.log(state.value.user)
      // return response.data.data
    } catch (err: any) {
      // state.value.error = err.response?.data?.message || 'Registration failed'
    } finally {
      state.value.loading = false
    }
  }
  const forgotPass = async (email: string) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Yêu cầu quên mật khẩu thất bại'
    } finally {
      state.value.loading = false
    }
  }

  const resetPass = async (token: string, password: string) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password })
      return response.data
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Đặt lại mật khẩu thất bại'
    } finally {
      state.value.loading = false
    }
  }
  const getGoogleSignInUrl = async (role: string) => {
    try {
      const response = await api.post('/auth/get-google-sign-in-url', { role })
      return response.data.data.url
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Failed to get Google sign-in URL'
    }
  }
  const handleGoogleCallback = async (jwtToken: string) => {
    state.value.loading = true
    try {
      Cookies.set('token_user_edu', jwtToken, { expires: 7 })
      state.value.token = jwtToken
      return true
    } catch (error) {
      console.error('Error handling Google callback:', error)
      return false
    } finally {
      state.value.loading = false
    }
  }
  // Tải ảnh lên
  const uploadProfileImage = async (formData: FormData) => {
    try {
      const response = await api.post('/auth/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${state.value.token}`
        }
      })
      if (response.data.status === 'OK') {
        state.value.user = response.data.data // Cập nhật thông tin người dùng
        return response.data
      } else {
        throw new Error(response.data.message || 'Upload failed')
      }
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Upload failed'
      return null
    }
  }
  //   const fetchCurrentUser = async () => {
  //     try {
  //         const response = await api.get('/auth/me'); // Endpoint để lấy thông tin người dùng
  //         state.value.user = response.data.data;
  //     } catch (error) {
  //         console.error('Error fetching current user:', error);
  //         logout(); // Nếu không lấy được thông tin người dùng, thực hiện logout
  //     }
  // }
  const fetchAllUser = async (params: any = {}) => {
    try {
      const res = await api.get('/auth/get-all-user', { params })
      state.value.allUser = res.data.data.data
      state.value.total = res.data.data.total
    } catch (error) {
      console.log(error)
    }
  }
  // get xoas mem user
  const fetchDeletedUser = async () => {
    try {
      const response = await api.get('/auth/get-all-user?deleted=1')
      state.value.deletedUser = response.data.data.data
    } catch (error) {
      state.value.error = 'Không thể tải danh sách cấp độ đã xóa!'
    }
  }
  // xoa mem
  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/auth/delete-user/${id}`)
      await fetchAllUser()
      ElMessage({ type: 'success', message: 'Xóa thành công!' })
    } catch (error) {
      ElMessage({ type: 'error', message: 'Xóa thất bại!' })
    }
  }
  // xoa vinh vien
  const deleteForceUser = async (id: number) => {
    try {
      await api.post(`/auth/force-delete-user/${id}`)
      await fetchAllUser()
      ElMessage({ type: 'success', message: 'Xóa thành công!' })
    } catch (error) {
      ElMessage({ type: 'error', message: 'Xóa thất bại!' })
    }
  }
  // chi tiet user
  const detailUser = async (id: number) => {
    try {
      await api.delete(`/auth/get-detail-user/${id}`)
      await fetchAllUser()
    } catch (error) {
      console.log(error)
    }
  }
  const updateProfile = async (data: TUpdateUser) => {
    state.value.loading = true
    state.value.error = null

    try {
      const response = await api.post('auth/update-profile', data)
      return response.data
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Cập nhật thất bại'
      throw err
    } finally {
      state.value.loading = false
    }
  }
  const updateProfileTeacher = async (data: string) => {
    state.value.loading = true
    state.value.error = null
    const role = {
      role: data
    }
    try {
      const response = await api.post('auth/update-profile', role)
      return response.data
    } catch (err: any) {
      state.value.error = err.response?.data?.message || 'Cập nhật thất bại'
      throw err
    } finally {
      state.value.loading = false
    }
  }
  const createUserAdmin = async (userData: TUpdateUserAdmin) => {
    try {
      const res = await api.post('/auth/create-user', userData)
      if (res.data.status === 'FAIL') {
        ElMessage({ type: 'error', message: 'Kiểm tra email, mật khẩu' })
      } else {
        ElMessage({ type: 'success', message: 'Tạo mới thành công!' })
      }
      await fetchAllUser()
    } catch (error: any) {
      ElMessage({ type: 'error', message: 'Kiểm tra email, mật khẩu' })
    }
  }
  const updateUserAdmin = async (userData: TUpdateUserAdmin) => {
    try {
      const data = {
        user_id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        role: userData.role,
        status: userData.status
      }

      const res = await api.post('/auth/admin-update-user', data)
      if (res.data.status === 'FAIL') {
        ElMessage({ type: 'error', message: 'Cập nhật thất bại' })
      } else {
        ElMessage({ type: 'success', message: 'Cập nhật thành công!' })
      }
      await fetchAllUser()
    } catch (error: any) {
      ElMessage({ type: 'error', message: 'Kiểm tra email, mật khẩu' })
    }
  }
  // Khôi phục
  const restoreUser = async (id: number) => {
    try {
      await api.post(`/auth/restore-user/${id}`)
      await fetchDeletedUser()
      await fetchAllUser()
      ElMessage({ type: 'success', message: 'Khôi phục thành công!' })
    } catch (error) {
      ElMessage({ type: 'error', message: 'Khôi phục thất bại!' })
    }
  }
  // trang thai
  const isActiveUser = async (id: number) => {
    try {
      await api.post(`/auth/block/unblock-user/${id}`)
      await fetchAllUser()
      await fetchDeletedUser()
    } catch (error) {
      state.value.error = 'Không thể khôi phục ngôn ngữ!'
    }
  }
  return {
    state,
    login,
    logout,
    register,
    userData,
    forgotPass,
    resetPass,
    getGoogleSignInUrl,
    handleGoogleCallback,
    uploadProfileImage,
    fetchAllUser,
    fetchDeletedUser,
    deleteUser,
    deleteForceUser,
    detailUser,
    createUserAdmin,
    updateUserAdmin,
    restoreUser,
    isActiveUser,
    updateProfile,
    updateProfileTeacher
    // fetchCurrentUser
    // fetchUserData
  }
})
