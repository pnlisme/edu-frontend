import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import { ElMessage, ElMessageBox } from 'element-plus'

interface TNote {
  // id?: number
  course_id: number
  section_id: number
  lecture_id: number
  current_time: number
  lecture_title: string
  content: string
}

export const useNotesStore = defineStore('notes', () => {
  const state = ref({
    notes: [] as TNote[], // Danh sách note
    noteDetail: null as TNote | null, // Chi tiết một note
    loading: false,
    error: null as string | null
  })

  // Lấy danh sách notes theo course_id
  const fetchNotes = async (course_id: number) => {
    try {
      state.value.loading = true
      const response = await api.get(`/auth/notes/course/${course_id}`)
      state.value.notes = response.data.data
    } catch (error) {
      state.value.error = 'Không thể tải danh sách notes'
    } finally {
      state.value.loading = false
    }
  }

  // Lấy chi tiết note theo ID
  const fetchNoteDetail = async (id: number) => {
    try {
      state.value.loading = true
      const response = await api.get(`/auth/notes/${id}`)
      state.value.noteDetail = response.data.data
    } catch (error) {
      state.value.error = 'Không thể tải chi tiết note'
    } finally {
      state.value.loading = false
    }
  }

  // Tạo note
  const createNote = async (noteData: TNote) => {
    try {
      const response = await api.post('/auth/notes', noteData)
      ElMessage.success('Tạo ghi chú thành công!')
      await fetchNotes(noteData.course_id) // Refresh danh sách
    } catch (error) {
      state.value.error = 'Không thể tạo note'
      ElMessage.error('Tạo ghi chú thất bại!')
    }
  }

  // Cập nhật note
  const updateNote = async (id: number, noteData: TNote) => {
    try {
      const response = await api.post(`/auth/notes/update/${id}`, noteData)
      ElMessage.success('Cập nhật ghi chú thành công!')
      await fetchNotes(noteData.course_id) // Refresh danh sách
    } catch (error) {
      state.value.error = 'Không thể cập nhật note'
      ElMessage.error('Cập nhật ghi chú thất bại!')
    }
  }

  // Xóa note
  const deleteNote = async (id: number, course_id: number) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa ghi chú này không?', 'Xác nhận', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      })
      await api.post(`/auth/notes/delete/${id}`)
      ElMessage.success('Xóa ghi chú thành công!')
      await fetchNotes(course_id) // Refresh danh sách
    } catch (error) {
      state.value.error = 'Không thể xóa note'
      ElMessage.error('Xóa ghi chú thất bại!')
    }
  }

  return {
    state,
    fetchNotes,
    fetchNoteDetail,
    createNote,
    updateNote,
    deleteNote
  }
})
