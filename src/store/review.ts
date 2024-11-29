import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type { Tlevel } from '@/interfaces'
import { ElMessage } from 'element-plus'

export interface TReview {
  id: number
  course_id: number
  rating: number
  comment: string
  created_at: string
  status: 'active' | 'inactive'
  user: {
    first_name: string
    last_name: string
    id: number
    avatar: string
  }
}

interface TReviewState {
  listReview: TReview[]
}

export const useReviewsStore = defineStore('reviews', () => {
  const state = ref<TReviewState>({
    listReview: []
  })

  const fetchReviews = async (id: number) => {
    try {
      const response = await api.get(`/courses/${id}/reviews`)
      state.value.listReview = response.data.reviews
    } catch (error) {
      console.log(error)
    }
  }

  const createReview = async (params: any = {}) => {
    try {
      const response = await api.post('/auth/reviews', params)
      await fetchReviews(params.course_id)
      ElMessage.success('Your review was submitted successfully!')
    } catch (error: any) {
      ElMessage.error(error.response.data.message)
    }
  }

  return {
    state,
    fetchReviews,
    createReview
  }
})
