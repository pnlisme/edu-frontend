import type { TSection } from '@/interfaces'
import api from '@/services/axiosConfig'

import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { da } from 'element-plus/es/locale/index.mjs'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'





export default function useCourse() {
  const route = useRoute()
  const dialogEditSection = ref<boolean>(false);
  const imageUrl = ref<string | null>(null)
  const courseId = ref<string|number | null>(null)

   // computed property để tự động cập nhật slug khi title thay đổi
  //  const SlugAdd = computed(() => {
  //   return formDataAddCourse.value.title.replace(/\s+/g, '-');
  // });
  // State để lưu dữ liệu form của khóa học
  const formDataAddCourse = ref({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    price: '',
    type_sale: 'price',
    sale_value: '',
    status: 'inactive',
    language_id: '',
    level_id: '',
    category_id: '',
    thumbnail: null,
  })

  // State để lưu danh sách cấp độ và ngôn ngữ
  const courseLevels = ref([])
  const section = ref<TSection[]>([])
  const languages = ref([])
  const loading = ref(false)
  const error = ref(null)

  // const userToken = ref(myToken);
  // Hàm lấy dữ liệu cấp độ khóa học
  const fetchCourseLevels = async () => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.value}`
    try {
      loading.value = true
      const response = await api.get('/course-levels')
      if (response.data.status === 'OK') {
        courseLevels.value = response.data.data.data // Array of levels
        // console.log('Level log:', response.data.data.data)
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
      const response = await api.get('/languages')
      if (response.data.status === 'OK') {
        languages.value = response.data.data.data // Array of languages
        // console.log('lang log:', response.data.data.data)
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
    try {
      loading.value = true
      const formData = new FormData();
       // Gán các trường không phải tệp vào FormData
      for (const key in formDataAddCourse.value) {
        if (formDataAddCourse.value[key]) {
          formData.append(key, formDataAddCourse.value[key]);
        }
      }

      // In dữ liệu form   trước khi tạo FormData
      console.log('Dữ liệu form trước khi tạo FormData:', formDataAddCourse.value)
      formDataAddCourse.value.slug = formDataAddCourse.value.title.replace(/\s+/g, '-');
      const response = await api.post('/auth/courses/', formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
      })
      console.log(response);
      
      if (response.data.status === 'OK') {
        console.log('Phản hồi API:', response.data)
        ElNotification({
          title: 'Thành công',
          message: response.data.message || 'Thêm khoá học thành công',
          type: 'success'
        })
        // Chuyển hướng đến trang chỉnh sửa khóa học
      const courseId = response.data.id;  // Giả sử API trả về course_id
      const router = useRouter();
      router.push({ name: 'editCourse', params: { id: courseId } });
      } else {
        ElNotification({
          title: 'Thất bại',
          message: response.data.message || 'Thêm khoá học không thành công',
          type: 'error'
        })
      }
    } catch (err) {
      // alert('Lỗi khi thêm khóa học: ' + err.message)
    } finally {
      loading.value = false
    }
  }
  function handlePreviewImg(event: any) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        imageUrl.value = reader.result as string
      }
      formDataAddCourse.value.thumbnail = file
      reader.readAsDataURL(file)
    }
  }


  // Lấy dữ liệu khóa học khi component mount
  const fetchCourseData = async () => {
    try {
      loading.value = true;
      courseId.value = route.params.id as string; // Lấy ID từ URL
  
      const response = await api.get(`/auth/courses/${courseId.value}`);
      if (response.data.status === 'OK') {
        formDataEditCourse.value = response.data.data;
        section.value = response.data.data.sections;
      }
    } catch (err) {
      ElNotification({
        title: 'Lỗi',
        message: 'Không thể tải dữ liệu khóa học',
        type: 'error',
      });
    } finally {
      loading.value = false;
    }
  };
  
  
  //EDIT Course

  const formDataEditCourse = ref({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    price: '',
    type_sale: 'price',
    sale_value: '',
    status: '',
    language_id: '',
    level_id: '',
    category_id: '',
    thumbnail: null,
  })
   // computed property để tự động cập nhật slug khi title thay đổi
  //  const SlugEdit = computed(() => {
  //   return formDataEditCourse.value.title.replace(/\s+/g, '-');
  // });

  // Form chỉnh sửa khoá học
  const submitFormEdit = async () => {
    try {
      loading.value = true
      const formDataEdit = new FormData();
       // Gán các trường không phải tệp vào FormData
      for (const key in formDataEditCourse.value) {
        if (formDataEditCourse.value[key]) {
          formDataEdit.append(key, formDataEditCourse.value[key]);
        }
      }
      // formDataEditCourse.value.slug = SlugEdit.value;
      // In dữ liệu form trước khi tạo FormData
      console.log('Dữ liệu form trước khi chỉnh sửa FormEditData:', formDataEditCourse.value)
      formDataEditCourse.value.slug = formDataEditCourse.value.title.replace(/\s+/g, '-');
      const response = await api.put('/auth/courses/', formDataEdit, {
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
      })
      console.log(response);
      
      if (response.data.status === 'OK') {
        console.log('Phản hồi API:', response.data)
        ElNotification({
          title: 'Thành công',
          message: response.data.message || 'Chỉnh sửa học thành công',
          type: 'success'
        })
        // Chuyển hướng đến trang chỉnh sửa khóa học
      const courseId = response.data.id;  // Giả sử API trả về course_id
      const router = useRouter();
      router.push({ name: 'editCourse', params: { id: courseId } });
      } else {
        ElNotification({
          title: 'Thất bại',
          message: response.data.message || 'Chỉnh sửa học không thành công',
          type: 'error'
        })
      }
    } catch (err) {
      // alert('Lỗi khi thêm khóa học: ' + err.message)
    } finally {
      loading.value = false
    }
  }

  // Gán slug đã tính toán vào formDataAddCourse
  // formDataAddCourse.value.slug = SlugAdd.value;


  // SECTIONS
  //Add sections
  courseId.value = route.params.id as string // Lấy ID từ URL

  const formDataAddSection = ref({
    name: '',
    status: 'active',
    course_id : courseId.value
  })
  
  const handelFormSection = async () => {
    try {
      console.log('Dữ liệu form Section Data:', formDataAddSection.value)
      const response = await api.post('/auth/section/', formDataAddSection.value);
      
      if (response.data.status === 'OK') {
        ElNotification({
          title: 'Thành công',
          message: response.data.message || 'Thêm chương thành công',
          type: 'success'
        });
        
        // Cập nhật section.value sau khi thêm mới
        section.value = response.data.data // Đảm bảo sử dụng .value để cập nhật ref
        // Hoặc sử dụng một cách khác để thêm section mới vào đầu mảng
        // section.value = [...section.value, response.data.data]; 

      } else {
        ElNotification({
          title: 'Thất bại',
          message: response.data.message || 'Thêm chương không thành công',
          type: 'error'
        });
      }
      
    } catch (err) {
      ElNotification({
        title: 'Lỗi',
        message: 'Có lỗi xảy ra khi thêm chương',
        type: 'error'
      });
    }
  };
  
  
// chỉnh sửa chương

  const formDataEditSection = ref({
    id: '',
    name: '',  // Các trường cần chỉnh sửa
  });
  // get Id section
  const fetchSectionId = async (id: number | string) => {
    try {
      const response = await api.get(`/auth/section/${id}`);
      formDataEditSection.value = { ...response.data.data };
      if (response.data.status === 'OK') {
        console.log('đã tải dữ liệu chương', response.data.data) ;
      } else {
        console.log('Không thể lấy dữ liệu chỉnh sửa');
      }
    } catch (error) {
      ElNotification({
        title: 'Lỗi',
        message: 'Có lỗi khi tải dữ liệu chỉnh sửa',
        type: 'error',
      });
    }
  }
    
  
  const handleEditSection = async (id: number | string) => {
    console.log('Dữ liệu trc khi chỉnh sửa:', id, formDataEditSection.value);
    try {
      if (!formDataEditSection.value.name || !formDataEditSection.value.id) {
        ElNotification({
          title: 'Lỗi',
          message: 'Dữ liệu chỉnh sửa không hợp lệ',
          type: 'error',
        });
        return;
      }
  
      const response = await api.post(`/auth/section/${id}`, formDataEditSection.value);
      console.log('log dữ liệu sau khi chỉnh sửa:', response);
      
      if (response.data.status === 'OK') {
        // Đảm bảo rằng chỉ thay đổi dữ liệu khi thực sự cần thiết
        if (formDataEditSection.value.id !== response.data.data.id) {
          formDataEditSection.value = { ...response.data.data }; // Cập nhật formDataEditSection chỉ khi cần thiết
        }
        ElNotification({
          title: 'Thành công',
          message: 'Đã tải dữ liệu chỉnh sửa',
          type: 'success',
        });
  
        dialogEditSection.value = false; // Đóng dialog sau khi chỉnh sửa thành công
  
      } else {
        ElNotification({
          title: 'Lỗi',
          message: response.data.response.message || 'Không thể tải dữ liệu chỉnh sửa',
          type: 'error',
        });
      }
    } catch (error) {
      ElNotification({
        title: 'Lỗi',
        message: 'Có lỗi khi tải dữ liệu chỉnh sửa',
        type: 'error',
      });
    }
  };
  
  // Delete sections

  const handleDeleteSection = async (id: number | string) => {
  // Hiển thị hộp thoại xác nhận trước khi xóa
  ElMessageBox.confirm(
    'Bạn có chắc chắn muốn xóa chương này?', // Thông báo xác nhận
    'Xác nhận xóa', // Tiêu đề
    {
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
      type: 'warning', // Loại thông báo
    }
  )
    .then(async () => {
      // Nếu người dùng nhấn "Có", tiếp tục xóa
      try {
        const response = await api.delete(`/auth/section/${id}`);
        // Sau khi xóa thành công, cập nhật lại section.value
        section.value = section.value.filter((s:any) => s.id !== id);
        ElNotification({
          type: 'success',
          message: 'Xóa chương thành công!'
        });
      } catch (error) {
        ElNotification({
          type: 'error',
          message: 'Xóa chương không thành công!'
        });
      }
    })
    .catch(() => {
      // Nếu người dùng nhấn "Không", không làm gì cả
      ElNotification({
        type: 'info',
        message: 'Hủy xóa chương'
      });
    });
  };
  
    // Sort section
    const handleSortSection = async (sortedSection: TSection): Promise<void> => {
      try {
        console.log('Dữ liệu đã sắp xếp:', sortedSection);
        // Gửi mảng đã sắp xếp lên backend
        const response = await api.post('/section/sort', { sortedSection });
        if (response.data.status === 'OK') {
          ElNotification({
            title: 'Thành công',
            message: 'Sắp xếp chương thành công!',
            type: 'success'
          });
        } else {
          ElNotification({
            title: 'Thất bại',
            message: 'Sắp xếp chương không thành công!',
            type: 'error'
          });
        }
      } catch (error) {
        ElNotification({
          title: 'Lỗi',
          message: 'Có lỗi xảy ra khi sắp xếp chương!',
          type: 'error'
        });
      }
    };
  
    // End sort section

  // END SECTIONS


  onMounted(() => {
      fetchCourseData();
  })

  return {
    formDataAddCourse,
    formDataEditCourse,
    formDataAddSection,
    formDataEditSection,
    dialogEditSection,
    handelFormSection,
    courseLevels,
    fetchCourseLevels,
    fetchLanguages,
    fetchSectionId,
    handlePreviewImg,
    languages,
    imageUrl,
    submitForm,
    submitFormEdit,
    fetchCourseData,
    handleDeleteSection,
    handleEditSection,
    handleSortSection,
    courseId,
    loading,
    section,
    error
  }
}
