import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type { Tlevel } from '@/interfaces'
import { ElMessage, ElMessageBox } from 'element-plus'

export interface TReview {
  id: number
  course_id: number
  rating: number
  comment: string
  created_at: string
  status: 'active' | 'inactive'
  user_id: number
  user: {
    first_name: string
    last_name: string
    id: number
    avatar: string
  }
}

interface TReviewState {
  listReview: TReview[]
  listReviewDelete: TReview[]
}

export const useReviewsStore = defineStore('reviews', () => {
  const state = ref<TReviewState>({
    listReview: [],
    listReviewDelete: []
  })

  const fetchReviews = async (id: number) => {
    try {
      const response = await api.get(`/courses/${id}/reviews`)
      state.value.listReview = response.data.data.data
    } catch (error) {
      console.log(error)
    }
  }
  const fetchReviewsDelete = async (id: number) => {
    try {
      const response = await api.get(`/auth/reviews/${id}/deleted`)
      state.value.listReviewDelete = response.data.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const createReview = async (params: any = {}) => {
    try {
      const response = await api.post('/auth/reviews', params)
      await fetchReviews(params.course_id)
      ElMessage.success('Đánh giá của bạn đã được gửi thành công!')
    } catch (error: any) {
      ElMessage.error(error.response.data.message)
    }
  }

  const updateReview = async (id: number, idReview: number, data: any = {}) => {
    try {
      const response = await api.put(`/auth/reviews/${idReview}`, data)
      await fetchReviews(id)
      ElMessage.success('Cập nhật đánh giá thành công!')
    } catch (error: any) {
      ElMessage.error(error.response.data.message)
    }
  }
  const deleteReview = async (id: number, idReview: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa đánh giá này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      })
      const response = await api.delete(`/auth/reviews/${idReview}`)
      await fetchReviews(id)
      ElMessage.success('Xóa đánh giá thành công!')
    } catch (error: any) {
      ElMessage.error(error.response.data.message)
    }
  }
  const restoreReview = async (id: number, idReview: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn khôi phục đánh giá này không?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'warning'
        }
      )
      const response = await api.post(`/auth/reviews/${idReview}/restore`)
      await fetchReviews(id)
      await fetchReviewsDelete(id)
      ElMessage.success('Khôi phục đánh giá thành công!')
    } catch (error: any) {
      ElMessage.error(error.response.data.message)
    }
  }
  const filterReview = async (id: number, params: any = {}) => {
    const res = await api.get(`courses/${id}/reviews/filter`, { params })
    state.value.listReview = res.data.data.data
  }
  return {
    state,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
    restoreReview,
    fetchReviewsDelete,
    filterReview
  }
})
