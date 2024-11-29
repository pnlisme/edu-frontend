// stores/courseStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type { TCardCourse, TCardMyCourse } from '@/interfaces/course.interface'
import type { TChangeContent, TLesson } from '@/interfaces/ui.interface'

export const useCourseStore = defineStore('courseStore', () => {
  // State
  const course = ref<any>()
  const listCourseAdmin = ref<any>()
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const myCourses = ref<TCardMyCourse[]>([])
  // study
  const currentContent = ref<any>({})
  const allContent = ref<any[]>([])
  const courseStudySearch = ref<any[]>([])
  const progress = ref(0)
  const activeNames = ref(['0'])
  const studyCourse = ref<any>(null)
  // Actions

  const fetchCourseDetail = async (courseId: string) => {
    isLoading.value = true
    try {
      const response = await api.get(`/courses/${courseId}`)
      course.value = response.data.data
      error.value = null
    } catch (err: any) {
      error.value = 'Đã có lỗi xảy ra khi lấy thông tin khóa học'
    } finally {
      isLoading.value = false
    }
  }
  const fetchMyCourseFilter = async (title: string, creator: string) => {
    isLoading.value = true
    try {
      const response = await api.get('/auth/get-user-courses', {
        params: {
          title: title || undefined,
          creator: creator || undefined
        }
      })
      myCourses.value = response.data.data
      error.value = null
    } catch (err: any) {
      error.value = 'Đã có lỗi xảy ra khi tìm kiếm khóa học'
    } finally {
      isLoading.value = false
    }
  }
  const fetchMyCourse = async () => {
    isLoading.value = true
    try {
      const res = await api.get('/auth/get-user-courses')
      myCourses.value = res.data.data.map((course: any) => ({
        id: course.id,
        thumbnail: course.thumbnail,
        title: course.title,
        creator: course.creator,
        total_lectures: course.total_lectures,
        completed_lectures: course.completed_lectures,
        progress_percent: course.progress_percent
      }))
      error.value = null
    } catch (err: any) {
      console.error('Fetch My Courses Error:', err)
      error.value = 'Đã có lỗi xảy ra khi lấy danh sách khóa học'
    } finally {
      isLoading.value = false
    }
  }
  const fetchStudyCourse = async (courseId: number) => {
    try {
      isLoading.value = true
      const response = await api.get('/auth/study-course', {
        params: { course_id: courseId }
      })
      studyCourse.value = response.data.data
      currentContent.value = response.data.data.currentContent
      allContent.value = response.data.data.allContent
      progress.value = response.data.data.progress_percent
      error.value = null
    } catch (err: any) {
      console.error('Fetch Study Course Error:', err)
      error.value = 'Đã có lỗi xảy ra khi lấy thông tin khóa học'
    } finally {
      isLoading.value = false
    }
  }
  const changeContent = async (data: TChangeContent) => {
    try {
      const response = await api.get('/auth/change-content', {
        params: {
          course_id: data.course_id,
          content_type: data.content_type,
          content_id: data.content_id,
          learned: data.learned || 0,
          content_old_type: data.content_old_type || currentContent.value.type,
          content_old_id: currentContent.value.id
        }
      })
      currentContent.value = response.data.data.currentContent
      // console.log(response.data.data.currentContent)
    } catch (err) {
      console.error('Error changing content:', err)
      error.value = 'Không thể chuyển bài học.'
    }
  }

  const searchLetureStudy = async (course_id: number, content_keyword: string) => {
    try {
      const response = await api.get('/auth/change-content', {
        params: {
          course_id: course_id,
          content_keyword: content_keyword
        }
      })
      courseStudySearch.value = response.data.data.allContent
    } catch (error) {
      console.error('Error changing content:', error)
    }
  }

  // Teacher
  const fetchTeacherCourse = async (params: any = {}) => {
    try {
      const response = await api.get('auth/instructor/course', { params })
      listCourseAdmin.value = response.data.data
    } catch (error) {
      console.error(error)
    }
  }
  // Getter
  const getCourse = () => course.value
  fetchMyCourse()
  return {
    listCourseAdmin,
    courseStudySearch,
    studyCourse,
    course,
    myCourses,
    isLoading,
    error,
    currentContent,
    allContent,
    progress,
    fetchCourseDetail,
    getCourse,
    fetchMyCourse,
    fetchStudyCourse,
    changeContent,
    fetchMyCourseFilter,
    searchLetureStudy,
    fetchTeacherCourse
  }
})
