import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCategoryStore } from '@/store/category'
import type { TCategory, TCategoryFrom } from '@/interfaces/category.interface'

export function useCategory() {
  const categoryStore = useCategoryStore()
  const dialogVisible = ref(false) // Hiển thị dialog thêm danh mục
  const updateDialogVisible = ref(false) // Hiển thị dialog cập nhật danh mục
  const deletedCategoriesDialogVisible = ref(false)
  // Hiển thị danh mục đã xóa mềm
  const categoryForm = ref<TCategoryFrom>({
    name: '',
    icon: '',
    parent_id: 0,
    description: '',
    image: '',
    originalImage: '',
    status: 'active'
  })
  const fileList = ref<any[]>([])

  const openDialog = () => {
    resetForm()
    dialogVisible.value = true
  }
  const openDialogItem = (id: number) => {
    resetForm()
    categoryForm.value.parent_id = id
    dialogVisible.value = true
  }

  const openDeletedCategoriesDialog = async () => {
    await categoryStore.fetchDeletedCategories()
    deletedCategoriesDialogVisible.value = true
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      if (!categoryForm.value.name) {
        ElMessage.error('Tên danh mục không được để trống')
        return
      }

      if (!categoryForm.value.status) {
        ElMessage.error('Trạng thái là bắt buộc')
        return
      }
      // // Kiểm tra và thêm giá trị vào FormData
      if (categoryForm.value.name) formData.append('name', categoryForm.value.name)
      if (categoryForm.value.icon) formData.append('icon', categoryForm.value.icon)
      if (categoryForm.value.description)
        formData.append('description', categoryForm.value.description)
      if (categoryForm.value.image instanceof File) {
        formData.append('image', categoryForm.value.image)
      }
      if (categoryForm.value.status) formData.append('status', categoryForm.value.status)

      if (categoryForm.value.parent_id) {
        formData.append('parent_id', String(categoryForm.value.parent_id)) // Chuyển thành chuỗi
      }
      await categoryStore.createCategory(formData)

      dialogVisible.value = false
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async () => {
    try {
      if (!categoryForm.value.id) {
        throw new Error('Danh mục cần cập nhật không hợp lệ')
      }
      const formData = new FormData()

      // Kiểm tra và thêm giá trị vào FormData
      if (categoryForm.value.name) formData.append('name', categoryForm.value.name)
      if (categoryForm.value.icon) formData.append('icon', categoryForm.value.icon)

      if (categoryForm.value.description)
        formData.append('description', categoryForm.value.description)

      if (
        categoryForm.value.image &&
        categoryForm.value.image !== categoryForm.value.originalImage
      ) {
        if (categoryForm.value.image instanceof File) {
          formData.append('image', categoryForm.value.image) // Thêm file nếu là File
        }
      }
      if (categoryForm.value.status) formData.append('status', categoryForm.value.status)
      await categoryStore.updateCategory({ id: categoryForm.value.id, formData })
      updateDialogVisible.value = false
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdateItem = async () => {
    try {
      if (!categoryForm.value.id) {
        throw new Error('Danh mục cần cập nhật không hợp lệ')
      }
      const formData = new FormData()

      // Kiểm tra và thêm giá trị vào FormData
      if (categoryForm.value.name) formData.append('name', categoryForm.value.name)
      if (categoryForm.value.icon) formData.append('icon', categoryForm.value.icon)
      if (categoryForm.value.id !== undefined) {
        formData.append('parent_id', String(categoryForm.value.parent_id)) // Chuyển số thành chuỗi
      }
      if (categoryForm.value.description)
        formData.append('description', categoryForm.value.description)
      // if (categoryForm.value.image instanceof File) {
      //   formData.append('image', categoryForm.value.image) // Thêm file nếu là File
      // }
      // if (typeof categoryForm.value.image === 'string') {
      //   formData.append('image', categoryForm.value.image) // Thêm URL ảnh nếu là string
      // }
      if (
        categoryForm.value.image &&
        categoryForm.value.image !== categoryForm.value.originalImage
      ) {
        // console.log('hello')
        if (categoryForm.value.image instanceof File) {
          formData.append('image', categoryForm.value.image) // Thêm file nếu là File
        }
      }
      if (categoryForm.value.status) formData.append('status', categoryForm.value.status)
      await categoryStore.updateCategory({ id: categoryForm.value.id, formData })
      updateDialogVisible.value = false
    } catch (error) {
      console.log(error)
    }
  }
  const editCategory = (category: TCategory) => {
    categoryForm.value = {
      ...category,
      image: category.image || '', // Đảm bảo image luôn có giá trị
      parent_id: category.parent_id || 0
    }
    updateDialogVisible.value = true
  }

  const handleDeleteCategory = async (id: number | string) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa danh mục này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      })
      await categoryStore.deleteCategory(id)

      await categoryStore.fetchCategoriesCRUD()
    } catch (error) {
      console.log(error)
    }
  }
  const handlePictureCardPreview = (file: any) => {
    categoryForm.value.image = file.raw // Gán file đã chọn vào categoryForm
    console.log(file)
  }
  const handleRemoveImage = () => {
    fileList.value = [] // Xóa danh sách file
    categoryForm.value.image = '' // Xóa file khỏi form
  }
  const handleFileChange = (file: any, fileListParam: any[]) => {
    fileList.value = fileListParam // Cập nhật danh sách file
    if (file.raw) {
      categoryForm.value.image = file.raw // Gắn file thực tế vào form
    }
  }
  const restoreCategory = async (id: string | number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn khôi phục danh mục này không?',
        'Xác nhận khôi phục',
        {
          confirmButtonText: 'Khôi phục',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      deletedCategoriesDialogVisible.value = false
      await categoryStore.restoreCategory(id)
      await categoryStore.fetchDeletedCategories()
    } catch {
      ElMessage({
        type: 'info',
        message: 'Hủy khôi phục danh mục'
      })
    }
  }

  const resetForm = () => {
    categoryForm.value = {
      name: '',
      icon: '',
      parent_id: 0,
      description: '',
      image: ''
    }
  }

  return {
    categoryStore,
    dialogVisible,
    updateDialogVisible,
    deletedCategoriesDialogVisible,
    categoryForm,
    fileList,
    openDialog,
    openDialogItem,
    openDeletedCategoriesDialog,
    handleSubmit,
    handleUpdate,
    editCategory,
    handleDeleteCategory,
    restoreCategory,
    handlePictureCardPreview,
    handleRemoveImage,
    handleFileChange,
    handleUpdateItem
  }
}
