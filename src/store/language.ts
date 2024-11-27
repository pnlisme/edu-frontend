import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type { LanguageState, TLanguage } from '@/interfaces/language.interface'
import { ElMessage } from 'element-plus'

export const useLanguageStore = defineStore('language', () => {
  const state = ref<LanguageState>({
    languages: [],
    languagesCRUD: [],
    deletedLanguages: [],
    error: null,
    total: 0
  })

  // Fetch danh sách languages
  //   const fetchLanguages = async () => {
  //     try {
  //       const response = await api.get('/auth/list-languages-admin')
  //       state.value.languages = response.data.data.data
  //     } catch (error) {
  //       state.value.error = 'Không thể tải danh sách ngôn ngữ!'
  //     }
  //   }
  const fetchLanguages = async () => {
    try {
      const response = await api.get('/languages')
      state.value.languages = response.data.data
    } catch (error) {
      state.value.error = 'Không thể tải danh sách ngôn ngữ!'
    }
  }
  const fetchLanguagesCURD = async (params: any = {}) => {
    try {
      const response = await api.get('/auth/list-languages-admin', { params })
      state.value.languagesCRUD = response.data.data.data
      state.value.total = response.data.data.total // Lưu tổng số lượng
    } catch (error) {
      state.value.error = 'Không thể tải danh sách ngôn ngữ!'
    }
  }
  // Fetch danh sách đã xóa mềm
  const fetchDeletedLanguages = async () => {
    try {
      const response = await api.get('auth/list-languages-admin?deleted=1')
      state.value.deletedLanguages = response.data.data.data
    } catch (error) {
      state.value.error = 'Không thể tải danh sách ngôn ngữ đã xóa!'
    }
  }

  // Tạo mới language
  const createLanguage = async (languageData: TLanguage) => {
    try {
      const res = await api.post('/auth/languages', languageData)
      if (res.data.status === 'FAIL') {
        ElMessage({ type: 'error', message: res.data.error.name[0] })
      } else {
        ElMessage({ type: 'success', message: 'Tạo mới thành công!' })
      }
      await fetchLanguagesCURD()
    } catch (error) {
      state.value.error = 'Không thể tạo mới ngôn ngữ!'
    }
  }

  // Cập nhật language
  const updateLanguage = async (languageData: TLanguage) => {
    try {
      await api.put(`/auth/languages/${languageData.id}`, languageData)
      await fetchLanguagesCURD()
    } catch (error) {
      state.value.error = 'Không thể cập nhật ngôn ngữ!'
    }
  }

  // Xóa language
  const deleteLanguage = async (id: number) => {
    try {
      await api.delete(`/auth/languages/${id}`)
      await fetchLanguagesCURD()
    } catch (error) {
      state.value.error = 'Không thể xóa ngôn ngữ!'
    }
  }

  // Khôi phục language
  const restoreLanguage = async (id: number) => {
    try {
      await api.get(`/auth/languages/restore/${id}`)
      await fetchLanguagesCURD()
      await fetchDeletedLanguages()
    } catch (error) {
      state.value.error = 'Không thể khôi phục ngôn ngữ!'
    }
  }

  return {
    state,
    fetchLanguagesCURD,
    fetchLanguages,
    fetchDeletedLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage,
    restoreLanguage
  }
})
