// stores/useHomeStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/axiosConfig'
import type { Tlevel } from '@/interfaces/level.interface'
import type { TCardCourse } from '@/interfaces/course.interface'
import type { TCategory } from '@/interfaces/category.interface'
import type { TBill } from '@/interfaces/bill.interface'

export const apisStore = defineStore('fetchApi', () => {
  // State
  const categories = ref<TCategory[]>([])
  const courses = ref<TCardCourse[]>([])
  const coursesSearch = ref<TCardCourse[]>([])
  const levels = ref<Tlevel[]>([])
  const languagies = ref<Tlevel[]>([])
  const coursesPopular = ref<TCardCourse[]>([])
  const coursesRate = ref<TCardCourse[]>([])
  const coursesNew = ref<TCardCourse[]>([])
  const billHistory = ref<TBill[]>([])
  const billHistoryDetail = ref<TBill | null>(null)
  const loading = ref(false)
  // Actions for fetching different data
  const fetchCate = async () => {
    try {
      const res = await api.get('/categories')
      categories.value = res.data.data.data
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  const fetchRateCourse = async () => {
    loading.value = true
    try {
      const res = await api.get('/get-top-rated-courses?limit=5')
      coursesRate.value = res.data.data
    } catch (error) {
      console.error('Error fetching :', error)
    } finally {
      loading.value = false
    }
  }
  const fetchPopularCourse = async () => {
    loading.value = true
    try {
      const res = await api.get('/get-popular-courses?limit=5')
      coursesPopular.value = res.data.data
    } catch (error) {
      console.error('Error fetching :', error)
    } finally {
      loading.value = false
    }
  }
  const fetchNewCourse = async () => {
    loading.value = true
    try {
      const res = await api.get('/get-new-courses?limit=5')
      coursesNew.value = res.data.data
    } catch (error) {
      console.error('Error fetching :', error)
    } finally {
      loading.value = false
    }
  }
  const fetchLevel = async () => {
    try {
      const res = await api.get('/course-levels')
      levels.value = res.data.data.data
    } catch (error) {
      console.error('Error fetching course-levels:', error)
    }
  }
  const fetchLang = async () => {
    try {
      const res = await api.get('/languages')
      languagies.value = res.data.data.data
    } catch (error) {
      console.error('Error fetching course-levels:', error)
    }
  }

  const fetchCourse = async () => {
    try {
      const res = await api.get('/courses')
      courses.value = res.data.data.data
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }
  const fetchCourseSearch = async (keyword = '') => {
    try {
      const res = await api.get('/courses', {
        params: {
          limit: 5,
          keyword: keyword || null
        }
      })

      coursesSearch.value = res.data.data.data
    } catch (error) {
      console.error('Error fetching courses:', error)
      coursesSearch.value = []
    }
  }
  const fetchBill = async () => {
    try {
      const res = await api.get('/auth/orders')
      billHistory.value = res.data.data
    } catch (error) {
      console.error('Error fetching:', error)
      billHistory.value = []
    }
  }
  const fetchBillDetail = async (id: number) => {
    try {
      const res = await api.get(`/auth/orders/${id}`)
      billHistoryDetail.value = res.data.data
    } catch (error) {
      console.error('Error fetching:', error)
      billHistoryDetail.value = null
    }
  }
  const getCourses = computed(() => {
    return courses.value.filter((course) => course.status === 'active')
  })

  const categoriesWithChildren = computed(() => {
    return categories.value.filter((category) => category.children && category.children.length > 0)
  })
  const categoriesWithoutChildren = computed(() => {
    return categories.value.filter(
      (category) => !category.children || category.children.length === 0
    )
  })
  
  return {
    loading,
    coursesNew,
    billHistoryDetail,
    billHistory,
    languagies,
    categories,
    courses,
    levels,
    coursesSearch,
    coursesPopular,
    coursesRate,
    fetchCate,
    fetchCourse,
    fetchLevel,
    fetchLang,
    fetchCourseSearch,
    fetchRateCourse,
    fetchPopularCourse,
    fetchBill,
    fetchBillDetail,
    fetchNewCourse,
    getCourses,
    categoriesWithChildren,
    categoriesWithoutChildren
  }
})
