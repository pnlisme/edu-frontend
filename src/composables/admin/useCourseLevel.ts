import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TCourseLevel } from '@/interfaces/level.interface'
import { useCourseLevelStore } from '@/store/level'
interface UseCourseLevelReturnType {
  handleUpdate: () => Promise<void>
  levelStore: ReturnType<typeof useCourseLevelStore>
  drawerVisible: ReturnType<typeof ref<boolean>>
  updateDrawerVisible: ReturnType<typeof ref<boolean>>
  deletedCourseLevelsDialogVisible: ReturnType<typeof ref<boolean>>
  courseLevelForm: ReturnType<typeof ref<TCourseLevel>>
  openDrawer: () => void
  openUpdateDrawer: (courseLevel: TCourseLevel) => void
  openDeletedCourseLevelsDialog: () => Promise<void>
  handleSubmit: () => Promise<void>
  handleDelete: (id: number) => Promise<void>
  restoreCourseLevel: (id: number) => Promise<void>
}
export function useCourseLevel(): UseCourseLevelReturnType {
  const levelStore = useCourseLevelStore()
  const drawerVisible = ref(false) // Drawer cho thêm mới
  const updateDrawerVisible = ref(false) // Drawer cho cập nhật
  const deletedCourseLevelsDialogVisible = ref(false) // Dialog danh sách đã xóa mềm
  const courseLevelForm = ref<TCourseLevel>({
    name: '',
    status: 'active'
  })
  const selectedId = ref<number | null>(null) // ID của item được chọn khi cập nhật

  const openDrawer = () => {
    courseLevelForm.value = { name: '', status: 'active' }
    selectedId.value = null // Reset ID khi tạo mới
    drawerVisible.value = true
  }

  const openUpdateDrawer = (courseLevel: TCourseLevel) => {
    courseLevelForm.value = { ...courseLevel }
    // selectedId.value = courseLevel.id || null // Lưu ID để cập nhật
    updateDrawerVisible.value = true
  }

  const openDeletedCourseLevelsDialog = async () => {
    await levelStore.fetchDeletedCourseLevels()
    deletedCourseLevelsDialogVisible.value = true
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('name', courseLevelForm.value.name)
      formData.append('status', courseLevelForm.value.status)

      await levelStore.createCourseLevel(formData)
      drawerVisible.value = false

      await levelStore.fetchCourseLevelsCURD()
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async () => {
    try {
      await levelStore.updateCourseLevel(courseLevelForm.value)
      updateDrawerVisible.value = false
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa cấp độ này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      })
      await levelStore.deleteCourseLevel(id)
      ElMessage({ type: 'success', message: 'Xóa thành công!' })
    } catch {
      ElMessage({ type: 'info', message: 'Hủy thao tác xóa!' })
    }
  }

  const restoreCourseLevel = async (id: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn khôi phục cấp độ này không?',
        'Xác nhận khôi phục',
        {
          confirmButtonText: 'Khôi phục',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      deletedCourseLevelsDialogVisible.value = false
      await levelStore.restoreCourseLevel(id)
      ElMessage({ type: 'success', message: 'Khôi phục thành công!' })
    } catch {
      ElMessage({ type: 'info', message: 'Hủy thao tác khôi phục!' })
    }
  }

  return {
    handleUpdate,
    levelStore,
    drawerVisible,
    updateDrawerVisible,
    deletedCourseLevelsDialogVisible,
    courseLevelForm,
    openDrawer,
    openUpdateDrawer,
    openDeletedCourseLevelsDialog,
    handleSubmit,
    handleDelete,
    restoreCourseLevel
  }
}
