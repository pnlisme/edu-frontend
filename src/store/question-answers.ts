import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import { ElMessage } from 'element-plus'

interface TListQA {
  id: number
  type: 'answer' | 'question'
  course_id: number
  lecture_id: number
  user_id: number
  full_name: string
  content: string
  created_at: string
  total_likes: number
  total_replies: number
  is_liked: false
}
interface TCreQA {
  course_id: number
  lecture_id: number
  type: 'answer' | 'question'
  content: string
}
export const useQuestionAnswer = defineStore('questionAnswer', () => {
  const totalQA = ref<number>(0)
  const listAllQA = ref<TListQA[]>([])
  const listQuestion = ref<TListQA[]>([])

  const fetchListAllQA = async (id_course: number) => {
    const res = await api.get(`auth/discussions?course_id=${id_course}&type=question`)
    listAllQA.value = res.data.data
  }
  const fetchListQuestion = async (id_question: number) => {
    const res = await api.get(`auth/discussions/answers?question_id=${id_question}`)
    listQuestion.value = res.data.data
  }

  const CreateQuestion = async (data: any = {}) => {
    const res = await api.post('auth/discussions', data)

    if (res.data.status === 'SUCCESS') {
      ElMessage.success('Bạn đã bình luận')
      await fetchListAllQA(data.course_id)
    } else {
      ElMessage.error('Bình luận không được ghi nhận')
    }
  }
  const LikeQuestion = async (id_course: number, id_question: number) => {
    const res = await api.post(`auth/discussions/${id_question}/like`)
    if (res.data.status === 'SUCCESS') {
      ElMessage.success('Bạn đã thích bình luận')
      await fetchListAllQA(id_course)
    } else {
      ElMessage.error('Bình luận không được ghi nhận')
    }
  }
  const DisLikeQuestion = async (id_course: number, id_question: number) => {
    const res = await api.delete(`auth/discussions/${id_question}/like`)
    if (res.data.status === 'SUCCESS') {
      await fetchListAllQA(id_course)

      ElMessage.success('Bạn  bỏ thích bình luận')
    } else {
      ElMessage.error('Bình luận không được ghi nhận')
    }
  }
  return {
    totalQA,
    listAllQA,
    listQuestion,
    fetchListAllQA,
    fetchListQuestion,
    CreateQuestion,
    LikeQuestion,
    DisLikeQuestion
  }
})
