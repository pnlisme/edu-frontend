import type { TCourseFilters } from '@/interfaces/course.interface'
import api from '@/services/axiosConfig'
import { ref } from 'vue'

export function useFilter() {
  // States

  const coursesFilter = ref<any[]>([])
  const totalCourses = ref(0)
  const loading = ref(false)
  const noProduct = ref(false)
  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPageData = ref<number>(12)
  const paginationLinks = ref<any[]>([])
  // Fetch courses based on filters
  const fetchCourseFilter = async (
    page = 1,
    limit = 0,
    perPage = 0,
    filters: TCourseFilters = {}
  ) => {
    loading.value = true
    noProduct.value = false
    try {
      // Extract filter parameters from passed object
      const {
        duration_range,
        max_rating,
        category_ids,
        level_ids,
        language_ids,
        sort_by,
        sort_order,
        keyword
      } = filters

      // Build query params
      const categoryIds = category_ids ? category_ids.join(',') : ''
      const level = level_ids ? level_ids.join(',') : ''
      const language = language_ids ? language_ids.join(',') : ''

      const response = await api.get('/courses', {
        params: {
          limit,
          per_page: perPage,
          page,
          category_ids: categoryIds,
          duration_range,
          min_rating: 0,
          max_rating,
          level_ids: level,
          language_ids: language,
          sort_by,
          sort_order,
          keyword
        }
      })

      if (response.data.data.data.length > 0) {
        coursesFilter.value = response.data.data.data
        totalCourses.value = response.data.data.total
        lastPage.value = response.data.data.last_page
        perPageData.value = response.data.data.per_page
        currentPage.value = page
        paginationLinks.value = response.data.data.links
      } else {
        noProduct.value = true
        coursesFilter.value = []
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      noProduct.value = true
    } finally {
      loading.value = false
    }
  }

  return {
    fetchCourseFilter,
    coursesFilter,
    totalCourses,
    loading,
    noProduct,
    lastPage,
    currentPage,
    paginationLinks,
    perPageData
  }
}
