import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '@/store/auth'
import type { TUpdateUserAdmin } from '@/interfaces'

export function useUser() {
  const userStore = useAuthStore()
  const drawerVisible = ref(false) // Drawer cho thêm mới
  const updateDrawerVisible = ref(false) // Drawer cho cập nhật
  const deletedUserDialogVisible = ref(false) // Dialog danh sách đã xóa mềm
  const userForm = ref<TUpdateUserAdmin>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
    status: 'active',
    email_verified: 1
  })
  const selectedId = ref<number | null>(null)
  const openDrawer = () => {
    userForm.value = { first_name: '', last_name: '', email: '', status: 'active' }
    selectedId.value = null // Reset ID khi tạo mới
    drawerVisible.value = true
  }
  const openUpdateDrawer = (user: TUpdateUserAdmin) => {
    userForm.value = { ...user }
    selectedId.value = user.id || null // Lưu ID để cập nhật
    updateDrawerVisible.value = true
  }
  const openDeletedUserDialog = async () => {
    await userStore.fetchDeletedUser()
    deletedUserDialogVisible.value = true
  }
  const handleDelete = async (id: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa người dùng này không?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'warning'
        }
      )
      await userStore.deleteUser(id)
    } catch {
      ElMessage({ type: 'info', message: 'Hủy thao tác xóa!' })
    }
  }
  const handleDeleteForce = async (id: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa người dùng  này không?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'warning'
        }
      )
      await userStore.deleteForceUser(id)
      deletedUserDialogVisible.value = false
    } catch {
      ElMessage({ type: 'info', message: 'Hủy thao tác xóa!' })
    }
  }
  const restoreUser = async (id: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn khôi phục người dùng này không?',
        'Xác nhận khôi phục',
        {
          confirmButtonText: 'Khôi phục',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      await userStore.restoreUser(id)
      deletedUserDialogVisible.value = false
    } catch {
      ElMessage({ type: 'info', message: 'Hủy thao tác khôi phục!' })
    }
  }

  const handleSubmit = async () => {
    try {
      userForm.value.email_verified = 1
      await userStore.createUserAdmin(userForm.value)
      drawerVisible.value = false
    } catch (error: any) {
      ElMessage({ type: 'error', message: 'Kiểm tra email, mật khẩu' })
    }
  }
  const handleUpdate = async () => {
    try {
      await userStore.updateUserAdmin(userForm.value)
      updateDrawerVisible.value = false
    } catch (error: any) {
      ElMessage({ type: 'error', message: 'Kiểm tra email, mật khẩu' })
    }
  }
  return {
    userForm,
    userStore,
    deletedUserDialogVisible,
    drawerVisible,
    openUpdateDrawer,
    handleDelete,
    openDrawer,
    handleSubmit,
    openDeletedUserDialog,
    handleDeleteForce,
    restoreUser,
    handleUpdate,
    updateDrawerVisible
  }
}
