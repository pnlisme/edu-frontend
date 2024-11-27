import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axiosConfig'
import Cookies from 'js-cookie'
import { ElNotification } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
  const cartDb = ref<any[]>([])
  const cartLocal = ref<any[]>([])
  const loading = ref(false)
  const token = Cookies.get('token_user_edu')
  const isAuthenticated = computed(() => !!token)
  const loadCartFromLocalStorage = () => {
    const storeCart = localStorage.getItem('cart_courses')
    if (storeCart) {
      cartLocal.value = JSON.parse(storeCart)
    } else {
      cartLocal.value = []
    }
  }
  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart_courses', JSON.stringify(cartLocal.value))
  }
  const removeCartFromLocalStorage = () => {
    localStorage.removeItem('cart_courses')
  }
  const removeCourseFromLocalStorage = (courseId: number) => {
    cartLocal.value = cartLocal.value.filter((course) => course.id !== courseId)
    saveCartToLocalStorage()
  }

  const addCourseToCart = async (courseId: number) => {
    loading.value = true
    try {
      if (isAuthenticated.value) {
        try {
          await api.post('/auth/cart/', { course_id: courseId })

          ElNotification({
            title: 'Thành công',
            message: 'Sản phẩm của bạn đã thêm vào giỏ hàng',
            type: 'success'
          })
        } catch (error: any) {
          ElNotification({
            title: 'Thông báo',
            message: error.response.data.message,
            type: 'warning'
          })
        }

        await fetchCartCourses()
      } else {
        const courseExists = cartLocal.value.some((course) => course.id === courseId)
        if (courseExists) {
          ElNotification({
            title: 'Thông báo',
            message: 'Khóa học đã có trong giỏ hàng.',
            type: 'warning'
          })
        } else {
          ElNotification({
            title: 'Thành công',
            message: 'Sản phẩm của bạn đã thêm vào giỏ hàng',
            type: 'success'
          })
          const res = await api.get(`/courses/${courseId}`)

          const dataCartItem = res.data.data
          cartLocal.value.push(dataCartItem)
          saveCartToLocalStorage()
        }
      }
    } catch (error: any) {
      console.error('Error adding course to cart:', error)
    } finally {
      loading.value = false
    }
  }
  const fetchCartCourses = async () => {
    loading.value = true
    try {
      if (isAuthenticated.value) {
        const response = await api.get('/auth/cart/')
        cartDb.value = await response.data.data
      } else {
        //
      }
    } catch (error) {
      console.error('Error fetching cart courses:', error)
    } finally {
      loading.value = false
    }
  }

  const removeCourseFromCart = async (courseId: number) => {
    loading.value = true
    ElNotification({
      title: 'Thành công',
      message: 'Sản phẩm đã được xóa giỏ hàng',
      type: 'success'
    })
    try {
      if (isAuthenticated.value) {
        await api.delete(`/auth/cart/${courseId}`)
        await fetchCartCourses()
      } else {
        removeCourseFromLocalStorage(courseId)
        await fetchCartCourses()
      }
    } catch (error) {
      console.error('Error removing course from cart:', error)
    } finally {
      loading.value = false
    }
  }
  const clearCart = async () => {
    loading.value = true
    ElNotification({
      title: 'Thành công',
      message: 'Bạn đã xóa tất cả giỏ hàng',
      type: 'success'
    })
    try {
      if (isAuthenticated.value) {
        await api.delete('/auth/cart/all')
        await fetchCartCourses()
        cartDb.value = []
      } else {
        cartLocal.value = []
        removeCartFromLocalStorage()
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    } finally {
      loading.value = false
    }
  }

  // DONG BO DU LIEU GIO HANG LOCAL LEN SERVER
  // const syncLocalCartWithServer = async () => {
  //   // Kiểm tra xem giỏ hàng local có sản phẩm nào không
  //   if (cartLocal.value.length > 0 && isAuthenticated.value) {
  //     for (const item of cartLocal.value) {
  //       try {
  //         await api.post('/auth/cart/courses', { course_id: item.id })
  //       } catch (error) {
  //         console.error(`Failed to sync course ID ${item.id} with server:`, error)
  //       }
  //     }
  //     // Xóa giỏ hàng local sau khi đã đồng bộ
  //     cartLocal.value = []
  //     saveCartToLocalStorage()
  //     await fetchCartCourses()
  //   }
  // }

  // const handleLogin = async () => {
  //   if (isAuthenticated.value) {
  //     // Nếu người dùng đăng nhập, đồng bộ giỏ hàng từ local lên server
  //     await syncLocalCartWithServer()
  //   }
  // }

  // const handleLogout = () => {
  //   // Khi người dùng đăng xuất, lưu giỏ hàng từ server vào localStorage
  //   if (cartDb.value.length > 0) {
  //     cartLocal.value = cartDb.value
  //     saveCartToLocalStorage()
  //   }
  //   cartDb.value = []
  // }
  fetchCartCourses()
  loadCartFromLocalStorage()
  return {
    cartDb,
    cartLocal,
    loading,
    addCourseToCart,
    fetchCartCourses,
    removeCourseFromCart,
    clearCart
    // syncLocalCartWithServer,
    // handleLogin,
    // handleLogout
  }
})
