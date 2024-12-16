import api from '@/services/axiosConfig'
import { apisStore } from '@/store/apis'
import { ElNotification } from 'element-plus'
import { computed, ref, watch } from 'vue'

export function useShop() {
  const coursesFilterSection = ref<any[]>([])
  const activeFilter = ref('new') // Giá trị mặc định
  const apiStore = apisStore()
  // Gọi API dựa trên filter
  const fetchCoursesSection = async (filter: string) => {
    let url = ''

    switch (filter) {
      case 'popular':
        url = '/get-popular-courses?limit=5'
        break
      case 'new':
        url = '/get-new-courses?limit=5'
        break
      case 'top-rated':
        url = '/get-top-rated-courses?limit=5'
        break
      case 'favourite':
        url = '/get-favourite-courses?limit=5'
        break
      default:
        url = '/get-new-courses?limit=5'
    }

    try {
      const response = await api.get(url)
      coursesFilterSection.value = response.data.data
      if (response.data.status === 'FAIL') {
        ElNotification({
          title: 'Thông báo',
          // message: response.data.message,
          message: 'Chưa có khóa học',
          type: 'warning'
        })
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const changeFilter = (filter: string) => {
    activeFilter.value = filter
    fetchCoursesSection(filter)
  }

  return {
    coursesFilterSection,
    activeFilter,
    fetchCoursesSection,
    changeFilter
  }
}
