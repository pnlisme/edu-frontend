import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'

export const useQuizStore = defineStore('quizStore', () => {
  // State
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentQuestionIndex = ref<number>(0)
  const progressQuizz = ref<number>(0)

  // Actions
  const handleAnswer = async (data: any) => {
    isLoading.value = true
    try {
      const response = await api.get('/auth/change-content', {
        params: {
          course_id: data.course_id,
          content_type: 'quiz',
          content_id: data.content_id,
          content_old_type: data.content_old_type,
          content_old_id: data.content_old_id,
          questions_done: data.questions_done,
          question_id: data.question_id,
          answer_user: data.answer_user
        }
      })

      //   if (response.data.correct) {
      //     // Câu trả lời đúng, cập nhật tiến trình
      //     progressQuizz.value = (data.questions_done / data.total_questions) * 100
      //     currentQuestionIndex.value++
      //   } else {
      //     error.value = 'Câu trả lời không chính xác.'
      //   }
    } catch (err) {
      console.error('Error submitting answer:', err)
      error.value = 'Không thể gửi câu trả lời.'
    } finally {
      isLoading.value = false
    }
  }
  const handleRedo = async (data: any) => {
    isLoading.value = true
    try {
      await api.get('/auth/change-content', {
        params: {
          course_id: data.course_id,
          content_type: 'quiz',
          content_id: data.content_id,
          content_old_type: data.content_old_type,
          content_old_id: data.content_old_id,
          questions_done: data.questions_done,
          question_id: data.question_id,
          redo_quiz: 1
        }
      })

      //   if (response.data.correct) {
      //     // Câu trả lời đúng, cập nhật tiến trình
      //     progressQuizz.value = (data.questions_done / data.total_questions) * 100
      //     currentQuestionIndex.value++
      //   } else {
      //     error.value = 'Câu trả lời không chính xác.'
      //   }
    } catch (err) {
      console.error('Error submitting answer:', err)
      error.value = 'Không thể gửi câu trả lời.'
    } finally {
      isLoading.value = false
    }
  }
  return {
    isLoading,
    error,
    currentQuestionIndex,
    progressQuizz,
    handleAnswer,
    handleRedo
  }
})
