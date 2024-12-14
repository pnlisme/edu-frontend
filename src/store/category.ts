import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axiosConfig'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import type { TCategory, TUpdateCate } from '@/interfaces'

export const useCategoryStore = defineStore('category', () => {
  const state = ref({
    categories: [] as TCategory[], // Danh sách danh mục
    categoriesCURD: [] as TCategory[], // Danh sách danh mục
    deletedCategories: [] as TCategory[], // Danh sách danh mục đã xóa mềm
    selectedCategory: null as TCategory | null, // Danh mục chi tiết
    error: null as string | null, // Thông báo lỗi
    total: 0 as number | 0
  })

  const fetchCategoriesCRUD = async (params: any = {}) => {
    try {
      // console.log(params)
      const response = await api.get('/auth/categories', { params })
      // const response = await api.get('/categories')
      state.value.categoriesCURD = response.data.data.data
      state.value.total = response.data.data.total
    } catch (error) {
      state.value.error = 'Không thể tải danh sách danh mục'
    }
  }

  // Tạo danh mục mới
  const createCategory = async (categoryData: FormData) => {
    try {
      const res = await api.post('/auth/categories', categoryData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data.status === 'FAIL') {
        ElMessage({
          type: 'error',
          message: res.data.error?.name?.[0] || 'Tạo danh mục không thành công! '
        })
      } else {
        ElMessage({
          type: 'success',
          message: res.data.message
        })
      }
      await fetchCategoriesCRUD()
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'Tạo danh mục không thành công!'
      })
    }
  }

  // Cập nhật danh mục
  const updateCategory = async ({ id, formData }: { id: number | string; formData: FormData }) => {
    try {
      const res = await api.post(`/auth/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data.status === 'FAIL') {
        ElMessage({
          type: 'error',
          message: res.data.error?.name?.[0] || 'Cập nhật không thành công'
        })
      } else {
        ElMessage({
          type: 'success',
          message: res.data.message
        })
      }
      await fetchCategoriesCRUD()
    } catch (error) {
      state.value.error = 'Không thể cập nhật danh mục'
      ElMessage({
        type: 'error',
        message: 'Cập nhật danh mục không thành công!'
      })
    }
  }

  // Xóa mềm danh mục
  const deleteCategory = async (id: string | number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa danh mục này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'info'
      })
      await api.delete(`/auth/categories/${id}`)
      ElMessage({
        type: 'success',
        message: 'Xóa danh mục thành công!'
      })
      await fetchCategoriesCRUD()
    } catch (error) {
      state.value.error = 'Không thể xóa danh mục'
      ElMessage({
        type: 'error',
        message: 'Xóa danh mục thất bại'
      })
    }
  }

  // Khôi phục danh mục đã xóa mềm
  const restoreCategory = async (id: string | number) => {
    try {
      await api.get(`/auth/categories/restore/${id}`)
      await fetchCategoriesCRUD()
      await fetchDeletedCategories()
      ElMessage({
        type: 'success',
        message: 'Khôi phục danh mục thành công!'
      })
    } catch (error) {
      state.value.error = 'Không thể khôi phục danh mục'
      ElMessage({
        type: 'error',
        message: 'Khôi phục danh mục thất bại'
      })
    }
  }

  // Lấy danh sách danh mục đã xóa mềm
  const fetchDeletedCategories = async () => {
    try {
      const response = await api.get('/auth/categories?deleted=1')
      state.value.deletedCategories = response.data.data.data
    } catch (error) {
      state.value.error = 'Không thể tải danh sách danh mục đã xóa'
    }
  }

  // Lấy thông tin chi tiết danh mục
  // const fetchCategoryDetails = async () => {
  //   try {
  //     const response = await api.get('/auth/categories&deleted=1')
  //     state.value.selectedCategory = response.data.data.data
  //   } catch (error) {
  //     state.value.error = 'Không thể tải thông tin danh mục'
  //   }
  // }

  return {
    state,
    // fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    restoreCategory,
    fetchDeletedCategories,
    // fetchCategoryDetails,
    fetchCategoriesCRUD,
    categories: computed(() => state.value.categories),
    deletedCategories: computed(() => state.value.deletedCategories),
    selectedCategory: computed(() => state.value.selectedCategory)
  }
})
