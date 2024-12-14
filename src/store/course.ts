// stores/courseStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type {
  TContentOfSection,
  TCardCourse,
  TCardMyCourse,
  TLecture,
  TSectionOfCourse,
  TSection,
  TSortLecture,
  TQuiz,
  TQuestionList,
  TCourseCURD
} from '@/interfaces/course.interface'
import type { TChangeContent } from '@/interfaces/ui.interface'
import { ElMessage, ElMessageBox } from 'element-plus'
import { id } from 'element-plus/es/locale/index.mjs'

export const useCourseStore = defineStore('courseStore', () => {
  // State
  const course = ref<any>()
  const listCourseTeacher = ref<any>()
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
  const listContentOfSection = ref<TContentOfSection[]>([])
  const listLecturesAdmin = ref<TContentOfSection[]>([])
  const dataForm = ref<TContentOfSection>()
  const loading = ref(false)
  const totalCourse = ref<number>(0)
  const current_page = ref<number>(0)
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
      allContent.value = response.data.data.allContent // Cập nhật toàn bộ nội dung mới
      progress.value = response.data.data.progress_percent // Cập nhật tiến trình
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
      const response = await api.get('/auth/admin-courses', {
        params: { is_instructor: 1, ...params }
      })
      listCourseTeacher.value = response.data.data.data
      totalCourse.value = response.data.data.total || 0
      current_page.value = response.data.data.current_page || 0
    } catch (error) {
      console.error(error)
    }
  }
  const fetchAdminCourse = async (params: any = {}) => {
    try {
      const response = await api.get('/auth/admin-courses', {
        params
      })
      listCourseTeacher.value = response.data.data.data
      totalCourse.value = response.data.data.total || 0
      current_page.value = response.data.data.current_page || 0
    } catch (error) {
      console.error(error)
    }
  }

  // ADMIM COURSE

  const updateStatusCourse = async (course_id: number, status: 'active' | 'inactive') => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn duyệt khóa học này không?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Duyệt',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      const data = {
        status: status
      }
      const res = await api.patch(`auth/courses/${course_id}/status`, data)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Duyệt khóa học thất bại')
      } else {
        ElMessage.success('Duyệt khóa học thành công')
        await fetchAdminCourse()
      }
    } catch (error) {
      console.log(error)
    }
  }

  //course
  const createCourse = async (data: FormData) => {
    try {
      loading.value = true
      const res = await api.post('auth/courses', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.status === 'OK') {
        ElMessage.success('Thêm khóa học thành công')
        await fetchTeacherCourse()
      } else {
        ElMessage.error('Thêm khóa học thất bại')
      }
    } catch (error) {
      ElMessage.error('Thêm bài khóa thất bại')
      console.log(error)
    } finally {
      loading.value = false // Tắt trạng thái loading
    }
  }

  const updateCourse = async (id: number, data: FormData) => {
    try {
      loading.value = true
      const res = await api.post(`auth/courses/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.status === 'OK') {
        ElMessage.success('Cập nhật khóa học thành công')
        await fetchTeacherCourse()
      } else {
        ElMessage.error('Cập nhật khóa học thất bại')
      }
    } catch (error) {
      ElMessage.error('Cập nhật bài khóa thất bại')
      console.log(error)
    } finally {
      loading.value = false // Tắt trạng thái loading
    }
  }

  const deleteCourse = async (id: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa khóa học này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'info'
      })
      const res = await api.delete(`auth/courses/${id}`)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Xóa chương thất bại')
      } else {
        ElMessage.success('Xóa chương thành công')
        await fetchTeacherCourse()
      }
    } catch (error) {
      console.log(error)
    }
  }
  // lecture

  const showContentOfSection = async (id: number) => {
    try {
      const res = await api.get(`/auth/show-content-of-section/${id}`)
      listContentOfSection.value = res.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchListLecturesAdmin = async (params: any) => {
    try {
      const res = await api.get('/auth/lectures', { params })
      listLecturesAdmin.value = res.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const lectureEditFrom = async (id: number) => {
    try {
      const res = await api.get(`auth/lectures/edit-form/${id}`)
      dataForm.value = res.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const createLecture = async (id: number, data: FormData) => {
    try {
      loading.value = true
      const res = await api.post('auth/lectures', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.status === 'FAIL') {
        ElMessage.error('Thêm bài học thất bại')
      } else {
        ElMessage.success('Thêm bài học thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Thêm bài học thất bại')
      console.log(error)
    } finally {
      loading.value = false // Tắt trạng thái loading
    }
  }

  const updateLecture = async (id: number, id_lecture: number, data: FormData) => {
    try {
      loading.value = true

      const res = await api.post(`auth/lectures/${id_lecture}`, data)

      if (res.data.status === 'FAIL') {
        ElMessage.error('Cập nhật bài học thất bại')
      } else {
        ElMessage.success('Cập nhật bài học thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Cập nhật bài học thất bại')
      console.log(error)
    } finally {
      loading.value = false // Tắt trạng thái loading
    }
  }

  const deleteLecture = async (id: number, id_lecture: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa bài học này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'info'
      })
      const res = await api.delete(`auth/lectures/${id_lecture}`)

      if (res.data.status === 'FAIL') {
        ElMessage.error('Xóa bài học thất bại')
      } else {
        ElMessage.success('Xóa bài học thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Xóa bài học thất bại')
      console.log(error)
    }
  }

  const updateSectionLecture = async (
    id: number,
    id_lecture: number,
    data: { section_id: number }
  ) => {
    try {
      const res = await api.patch(`auth/lectures/${id_lecture}/section`, {
        params: data
      })

      if (res.data.status === 'FAIL') {
        ElMessage.error('Cập nhật bài học thất bại')
      } else {
        ElMessage.success('Cập nhật bài học thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Cập nhật bài học thất bại')
      console.log(error)
    }
  }
  const updateStatusLecture = async (
    id: number,
    id_lecture: number,
    data: { status: 'active' | 'inactive' }
  ) => {
    try {
      const res = await api.patch(`auth/lectures/${id_lecture}/status`, {
        params: data
      })

      if (res.data.status === 'FAIL') {
        ElMessage.error('Cập nhật bài học thất bại')
      } else {
        ElMessage.success('Cập nhật bài học thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Cập nhật bài học thất bại')
      console.log(error)
    }
  }
  const sortContentOfSection = async (sorted_content: any[]) => {
    try {
      const res = await api.put('auth/sort-content-of-section', {
        sorted_content: sorted_content
      })

      if (res.data.status === 'FAIL') {
        ElMessage.error('Cập nhật bài học thất bại')
      } else {
        ElMessage.success('Cập nhật bài học thành công')
        // await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Cập nhật bài học thất bại')
      console.log(error)
    }
  }

  // section

  const listSection = ref<TSectionOfCourse[]>([])

  const showSectionOfCourse = async (id: number) => {
    try {
      const res = await api.get(`auth/show-sections-of-course/${id}`)
      listSection.value = res.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const createSection = async (id: number, data: TSection) => {
    try {
      const res = await api.post('auth/sections', data)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Thêm chương thất bại')
      } else {
        ElMessage.success('Thêm chương thành công')
        await showSectionOfCourse(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateSection = async (id: number, section_id: number, data: TSection) => {
    try {
      const res = await api.put(`auth/sections/${section_id}`, data)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Cập nhật chương thất bại')
      } else {
        ElMessage.success('Cập nhật chương thành công')
        await showSectionOfCourse(id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deleteSection = async (id: number, section_id: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa chương học này không?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      const res = await api.delete(`auth/sections/${section_id}`)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Xóa chương thất bại')
      } else {
        ElMessage.success('Xóa chương thành công')
        await showSectionOfCourse(id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deletePermanentSection = async (id: number, section_id: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa vĩnh viễn chương học này không?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      const res = await api.delete(`auth/sections/permanent-delete/${section_id}`)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Xóa chương thất bại')
      } else {
        ElMessage.success('Xóa chương thành công')
        await showSectionOfCourse(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sortSectionsOfCourse = async (sortedData: TSection[]) => {
    try {
      await api.put('/auth/sort-sections-of-course', {
        sorted_sections: sortedData
      })
      ElMessage.success('Cập nhật thứ tự chương học thành công')
    } catch (error) {
      console.error('Lỗi khi sắp xếp chương học:', error)
      ElMessage.error('Không thể cập nhật thứ tự chương học')
    }
  }

  // quizz

  const createQuiz = async (id: number, data: TQuiz) => {
    try {
      loading.value = true
      const res = await api.post('auth/quizzes', data)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Thêm quiz thất bại')
      } else {
        ElMessage.success('Thêm quiz thành công')
        await showContentOfSection(id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false // Tắt trạng thái loading
    }
  }

  const updateQuiz = async (id: number, id_quiz: number, data: TQuiz) => {
    try {
      loading.value = true

      const res = await api.put(`auth/quizzes/${id_quiz}`, data)

      if (res.data.status === 'FAIL') {
        ElMessage.error('Cập nhật quiz thất bại')
      } else {
        ElMessage.success('Cập nhật quiz thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Cập nhật quiz thất bại')
      console.log(error)
    } finally {
      loading.value = false // Tắt trạng thái loading
    }
  }
  const deleteQuiz = async (id: number, id_quiz: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa quiz này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'info'
      })
      const res = await api.delete(`auth/quizzes/${id_quiz}`)

      if (res.data.status === 'FAIL') {
        ElMessage.error('Xóa quiz thất bại')
      } else {
        ElMessage.success('Xóa quiz thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Xóa quiz thất bại')
      console.log(error)
    }
  }
  const deletePermanentQuiz = async (id: number, id_quiz: number) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa vĩnh viễn quiz này không?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      const res = await api.delete(`auth/quizzes/permanent-delete/${id_quiz}`)

      if (res.data.status === 'FAIL') {
        ElMessage.error('Xóa quiz thất bại')
      } else {
        ElMessage.success('Xóa quiz thành công')
        await showContentOfSection(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Xóa quiz thất bại')
      console.log(error)
    }
  }

  // question
  const listQuestion = ref<TQuestionList[]>([])

  const showQuestionsOfQuiz = async (id: number) => {
    try {
      const res = await api.get(`auth/show-question-of-quiz/${id}`)
      listQuestion.value = res.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const createQuestion = async (id: number, data: any) => {
    try {
      const res = await api.post('auth/questions', data)
      if (res.data.status === 'FAIL') {
        ElMessage.error('Thêm câu hỏi thất bại')
      } else {
        ElMessage.success('Thêm câu hỏi thành công')
        await showQuestionsOfQuiz(id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const updateQuestion = async (id: number, id_question: number, data: any) => {
    try {
      loading.value = true

      const res = await api.put(`auth/questions/${id_question}`, data)

      if (res.data.status === 'FAIL') {
        ElMessage.error('Cập nhật câu hỏi thất bại')
      } else {
        ElMessage.success('Cập nhật câu hỏi thành công')
        await showQuestionsOfQuiz(id)
        // await fetchListLecturesAdmin()
      }
    } catch (error) {
      ElMessage.error('Cập nhật câu hỏi thất bại')
      console.log(error)
    } finally {
      loading.value = false // Tắt trạng thái loading
    }
  }

  const deleteQuestion = async (id: number, id_question: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'info'
      })
      const res = await api.delete(`auth/questions/${id_question}`)

      if (res.data.status === 'FAIL') {
        ElMessage.error('Xóa câu hỏi thất bại')
      } else {
        ElMessage.success('Xóa câu hỏi thành công')
        await showQuestionsOfQuiz(id)
      }
    } catch (error) {
      ElMessage.error('Xóa câu hỏi thất bại')
      console.log(error)
    }
  }

  const sortQuestionsOfQuiz = async (data: TQuestionList[]) => {
    try {
      await api.put('/auth/sort-question-of-quiz', {
        sorted_questions: data
      })
      ElMessage.success('Cập nhật thứ tự câu hỏi thành công')
    } catch (error) {
      console.error('Lỗi khi sắp xếp câu hỏi:', error)
      ElMessage.error('Không thể cập nhật thứ tự câu hỏi')
    }
  }
  // Getter
  const getCourse = () => course.value
  // fetchMyCourse()
  return {
    totalCourse,
    current_page,
    loading,
    listCourseTeacher,
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
    fetchTeacherCourse,
    // admin
    fetchAdminCourse,
    updateStatusCourse,
    // course
    createCourse,
    updateCourse,
    deleteCourse,
    // lecture
    listContentOfSection,
    listLecturesAdmin,
    dataForm,
    showContentOfSection,
    fetchListLecturesAdmin,
    lectureEditFrom,
    createLecture,
    updateLecture,
    deleteLecture,
    updateSectionLecture,
    updateStatusLecture,
    sortContentOfSection,
    // section
    listSection,
    showSectionOfCourse,
    createSection,
    updateSection,
    deleteSection,

    sortSectionsOfCourse,

    // quiz
    createQuiz,
    updateQuiz,
    deleteQuiz,
    deletePermanentQuiz,
    // question
    listQuestion,
    showQuestionsOfQuiz,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    sortQuestionsOfQuiz
  }
})
