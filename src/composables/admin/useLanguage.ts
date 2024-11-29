import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TLanguage } from '@/interfaces/language.interface' // Interface cho Language
import { useLanguageStore } from '@/store/language'

export function useLanguage() {
  const languageStore = useLanguageStore()
  const drawerVisible = ref(false) // Drawer cho thêm mới
  const updateDrawerVisible = ref(false) // Drawer cho cập nhật
  const deletedLanguagesDialogVisible = ref(false) // Dialog danh sách đã xóa mềm
  const languageForm = ref<TLanguage>({
    name: '',
    description: '',
    status: 'active'
  })
  const selectedId = ref<number | null>(null) // ID của language đang được chọn

  const openDrawer = () => {
    languageForm.value = { name: '', description: '', status: 'active' }
    selectedId.value = null // Reset ID khi tạo mới
    drawerVisible.value = true
  }

  const openUpdateDrawer = (language: TLanguage) => {
    languageForm.value = { ...language }
    selectedId.value = language.id || null // Lưu ID để cập nhật
    updateDrawerVisible.value = true
  }

  const openDeletedLanguagesDialog = async () => {
    await languageStore.fetchDeletedLanguages()
    deletedLanguagesDialogVisible.value = true
  }

  const handleSubmit = async () => {
    try {
      // Nếu không có ID, gọi API tạo mới
      await languageStore.createLanguage(languageForm.value)
      drawerVisible.value = false
    } catch (error) {
      ElMessage({ type: 'error', message: 'Kiểm tra email, mật khẩu' })
    }
  }
  const handleUpdate = async () => {
    try {
      await languageStore.updateLanguage(languageForm.value)
      ElMessage({ type: 'success', message: 'Cập nhật thành công!' })
      updateDrawerVisible.value = false
    } catch (error) {
      ElMessage({ type: 'error', message: 'Cập nhật thất bại!' })
    }
  }
  const handleDelete = async (id: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa ngôn ngữ này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      })
      await languageStore.deleteLanguage(id)
      ElMessage({ type: 'success', message: 'Xóa thành công!' })
      await languageStore.fetchLanguages()
    } catch {
      ElMessage({ type: 'info', message: 'Hủy thao tác xóa!' })
    }
  }

  const restoreLanguage = async (id: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn khôi phục ngôn ngữ này không?',
        'Xác nhận khôi phục',
        {
          confirmButtonText: 'Khôi phục',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      await languageStore.restoreLanguage(id)
      ElMessage({ type: 'success', message: 'Khôi phục thành công!' })
    } catch {
      ElMessage({ type: 'info', message: 'Hủy thao tác khôi phục!' })
    }
  }

  return {
    languageStore,

    drawerVisible,
    updateDrawerVisible,
    deletedLanguagesDialogVisible,
    languageForm,
    openDrawer,
    handleUpdate,
    openUpdateDrawer,
    openDeletedLanguagesDialog,
    handleSubmit,
    handleDelete,
    restoreLanguage
  }
}
