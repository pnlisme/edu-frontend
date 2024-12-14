import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'

interface TListStudentOfTeacher {
  student_id?: number
  student_full_name?: string
  student_email?: string
  student_phone_number?: number
  course_id?: number
  course_title?: string
  course_payment_status?: string
  course_purchase_date?: string
  total_lectures?: number
  completed_lectures?: number
  progress_percent?: number
}

interface SectionContent {
  id: number
  title: string
  order: number
  content_section_type: string
  type: string
  duration: number
  duration_display: string
  learned: number
  percent: number
}

interface ContentCourse {
  id: number
  title: string
  order: number
  content_course_type: string
  section_content: SectionContent[]
}

interface AllContent {
  [key: string]: ContentCourse
}

interface TCourseProgress {
  allContent: AllContent
  total_lecture_count: number
  total_lecture_done: number
  progress_percent: number
}

export const useStudentManager = defineStore('studentManager', () => {
  const listStudentOfTeacher = ref<any[]>([])
  const progressOfStudent = ref<TCourseProgress | null>(null)

  const fetchListStudentOfTeacher = async (params: any = {}) => {
    try {
      const response = await api.get('auth/get-student-of-instructor', { params }) // API lấy danh sách học sinh
      listStudentOfTeacher.value = response.data.data.data
    } catch (error) {
      console.log(error)
    }
  }
  const fetchProgressOfStudent = async (userId: number, courseId: number) => {
    try {
      const response = await api.get('/auth/get-progress-of-student', {
        params: {
          user_id: userId,
          course_id: courseId
        }
      })
      progressOfStudent.value = response.data
    } catch (err: any) {
      console.error('Error fetching student progress:', err)
    }
  }
  return {
    listStudentOfTeacher,
    progressOfStudent,
    fetchListStudentOfTeacher,
    fetchProgressOfStudent
  }
})
