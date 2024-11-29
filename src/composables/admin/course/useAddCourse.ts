import axios from 'axios'
import { ref, onMounted } from 'vue'
// import { myToken } from '@/interfaces/token';

export default function useAddCourse() {
  // State để lưu dữ liệu form của khóa học
  const formDataAddCourse = ref({
    title: '',
    short_description: '',
    // description: '',
    price: '',
    type_sale: 'price',
    sale_value: '',
    status: 'active',
    language_id: '',
    level_id: '',
    category_id: '',
    thumbnail: null
  })

  // State để lưu danh sách cấp độ và ngôn ngữ
  const courseLevels = ref([])
  const languages = ref([])
  const loading = ref(false)
  const error = ref(null)

  // const userToken = ref(myToken);
  // Hàm lấy dữ liệu cấp độ khóa học
  const fetchCourseLevels = async () => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`
    try {
      loading.value = true
      const response = await axios.get('https://toannt.id.vn/public/api/auth/course-levels')
      if (response.data.status === 'OK') {
        courseLevels.value = response.data.data.data // Array of levels
        console.log('Level log:', response.data.data.data)
      } else {
        error.value = response.data.message || 'Lỗi khi lấy danh sách cấp độ.'
      }
    } catch (err) {
      // error.value = 'Lỗi khi lấy cấp độ khóa học: ' + err.message;
    } finally {
      loading.value = false
    }
  }

  // Hàm lấy dữ liệu ngôn ngữ
  const fetchLanguages = async () => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`;
    try {
      loading.value = true
      const response = await axios.get('https://toannt.id.vn/public/api/auth/languages')
      if (response.data.status === 'OK') {
        languages.value = response.data.data.data // Array of languages
        console.log('lang log:', response.data.data.data)
      } else {
        error.value = response.data.message || 'Lỗi khi lấy danh sách ngôn ngữ.'
      }
    } catch (err) {
      // error.value = 'Lỗi khi lấy ngôn ngữ: ' + err.message;
    } finally {
      loading.value = false
    }
  }

  // Hàm thêm khóa học
  const submitForm = async () => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`;

    try {
      loading.value = true

      // In dữ liệu form trước khi tạo FormData
      console.log('Dữ liệu form trước khi tạo FormData:', formDataAddCourse.value)

      const formData = new FormData()
      Object.keys(formDataAddCourse.value).forEach((key) => {
        // formData.append(key, formDataAddCourse.value[key])
      })

      // In dữ liệu FormData sau khi thêm các giá trị
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
      }

      if (formDataAddCourse.value.thumbnail) {
        formData.append('thumbnail', formDataAddCourse.value.thumbnail)
      }

      const response = await axios.post('https://toannt.id.vn/public/api/auth/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.status === 'OK') {
        console.log('Phản hồi API:', response.data)
        alert('Khóa học đã thêm thành công!')
      } else {
        alert(response.data.message || 'Thêm khóa học thất bại.')
      }
    } catch (err) {
      // alert('Lỗi khi thêm khóa học: ' + err.message)
    } finally {
      loading.value = false
    }
  }

  // Gọi API khi component được mount
  onMounted(() => {
    fetchCourseLevels()
    fetchLanguages()
  })

  return {
    formDataAddCourse,
    courseLevels,
    languages,
    submitForm,
    loading,
    error
  }
}
