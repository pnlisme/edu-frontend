// composables/useUpdateProfile.ts
import { ref, watch } from 'vue'
import { useAuthStore } from '@/store/auth'
import { ElNotification } from 'element-plus'
import type { TUpdateUser } from '@/interfaces'

export function useUpdateProfile(dataUser: TUpdateUser, emit: (event: 'update-success') => void) {
  const authStore = useAuthStore()

  // Khởi tạo formData với cấu trúc dữ liệu
  const formData = ref<TUpdateUser>({
    first_name: '',
    last_name: '',
    biography: '',
    contact_info: {
      website: '',
      linked: ''
    }
  })
  // Khởi tạo các trường cho cập nhật mật khẩu
  const passwordnew = ref('')
  const passwordconfirm = ref('')
  const passwordnewError = ref<string | null>(null)
  const passwordconfirmError = ref<string | null>(null)

  // Đồng bộ dữ liệu từ props dataUser
  watch(
    () => dataUser,
    (newData) => {
      formData.value = {
        first_name: newData.first_name ?? '',
        last_name: newData.last_name ?? '',
        biography: newData.biography ?? '',
        contact_info: {
          website: newData.contact_info?.website ?? '',
          linked: newData.contact_info?.linked ?? ''
        }
      }
    },
    { immediate: true, deep: true }
  )

  // Hàm xử lý cập nhật profile
  const handleSubmit = async () => {
    // Reset lỗi trước khi thực hiện kiểm tra
    passwordnewError.value = null
    passwordconfirmError.value = null
    // Kiểm tra mật khẩu mới
    if (!passwordnew.value) {
      console.log('hello')
      ElNotification({
        title: 'Thất bại',
        message: 'Bạn cần nhập mật khẩu mới',
        type: 'error'
      })
      return
    }

    // Kiểm tra xác nhận mật khẩu
    if (passwordnew.value !== passwordconfirm.value) {
      ElNotification({
        title: 'Thất bại',
        message: 'Mật khẩu xác nhận không khớp',
        type: 'error'
      })
      return
    }
    try {
      await authStore.updateProfile({
        ...formData.value,
        password: passwordnew.value // Gửi thêm mật khẩu mới vào API
      })
      await authStore.userData()
      //   await authStore.updateProfile(formData.value)
      ElNotification({
        title: 'Thành công',
        message: 'Cập nhật thông tin thành công',
        type: 'success'
      })
      passwordnew.value = ''
      passwordconfirm.value = ''
      passwordnewError.value = null
      passwordconfirmError.value = null
      emit('update-success')
    } catch (error) {
      ElNotification({
        title: 'Thất bại',
        message: 'Cập nhật thông tin thất bại',
        type: 'error'
      })
    }
  }
  const handleSubmitProfile = async () => {
    // Reset lỗi trước khi thực hiện kiểm tra
    passwordnewError.value = null
    passwordconfirmError.value = null
    // Kiểm tra mật khẩu mới
    // if (!passwordnew.value) {
    //   console.log('hello')
    //   ElNotification({
    //     title: 'Thất bại',
    //     message: 'Bạn cần nhập mật khẩu mới',
    //     type: 'error'
    //   })
    //   return
    // }

    // Kiểm tra xác nhận mật khẩu
    // if (passwordnew.value !== passwordconfirm.value) {
    //   ElNotification({
    //     title: 'Thất bại',
    //     message: 'Mật khẩu xác nhận không khớp',
    //     type: 'error'
    //   })
    //   return
    // }
    try {
      await authStore.updateProfile({
        ...formData.value,
        password: passwordnew.value // Gửi thêm mật khẩu mới vào API
      })
      await authStore.userData()
      //   await authStore.updateProfile(formData.value)
      ElNotification({
        title: 'Thành công',
        message: 'Cập nhật thông tin thành công',
        type: 'success'
      })
      // passwordnew.value = ''
      // passwordconfirm.value = ''
      // passwordnewError.value = null
      // passwordconfirmError.value = null
      emit('update-success')
    } catch (error) {
      ElNotification({
        title: 'Thất bại',
        message: 'Cập nhật thông tin thất bại',
        type: 'error'
      })
    }
  }

  return {
    formData,
    handleSubmitProfile,
    handleSubmit,
    passwordnew,
    passwordconfirm,
    passwordnewError,
    passwordconfirmError
  }
}
