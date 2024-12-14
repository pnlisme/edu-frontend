import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type { Tlevel } from '@/interfaces'
import { ElMessage, ElMessageBox } from 'element-plus'
// const loading = ref(false)
export interface TBanner {
  id?: number
  position: string
  image_url: string
  status: 0 | 1
}

interface TBannerState {
  listBanner: TBanner[]
  //   courseLevelsCRUD: CourseLevel[]
  //   deletedCourseLevels: CourseLevel[
  loading: boolean
  error: string | null
  total: number
}

export const useBanner = defineStore('banner', () => {
  const state = ref<TBannerState>({
    listBanner: [],
    loading: false,

    error: null,
    total: 0
  })

  const listBanner = async () => {
    try {
      const res = await api.get('/banners')
      state.value.listBanner = res.data.data
    } catch (error) {
      console.log('không thể tại banner')
    }
  }

  const createBanner = async (data: any) => {
    try {
      state.value.loading = true
      const res = await api.post('/auth/banners', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data.status === 'SUCCESS') {
        ElMessage.success('Thêm banner thành công')
        await listBanner()
      } else {
        ElMessage.error('Thêm banner thất bại')
      }
    } catch (error) {
      ElMessage.error('Thêm banner thất bại')
    } finally {
      state.value.loading = false // Tắt trạng thái loading
    }
  }
  const updateBanner = async (id: number, data: any) => {
    try {
      state.value.loading = true
      const res = await api.post(`/auth/banners/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data.status === 'SUCCESS') {
        ElMessage.success('Chỉnh sửa banner thành công')
        await listBanner()
      } else {
        ElMessage.error('Chỉnh sửa banner thất bại')
      }
    } catch (error) {
      ElMessage.error('Chỉnh sửa banner thất bại')
    } finally {
      state.value.loading = false // Tắt trạng thái loading
    }
  }
  const deleteBanner = async (id: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa banner này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'info'
      })
      const res = await api.delete(`/auth/banners/${id}`)
      await listBanner()
      if (res.data.status === 'SUCCESS') {
        ElMessage.success('Xóa  banner thành công')
      } else {
        ElMessage.error('Xóa banner thất bại')
      }
    } catch (error) {
      ElMessage.error('Xóa banner thất bại')
    }
  }

  return {
    state,
    listBanner,
    createBanner,
    updateBanner,
    deleteBanner
  }
})
