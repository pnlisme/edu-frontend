import api from '@/services/axiosConfig'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartDb = ref<any[]>([])
  const cartLocal = ref<any[]>([])
  const loading = ref(false)
  const token = Cookies.get('token_user_edu')
  const isAuthenticated = computed(() => !!token)
  const cart = computed(() => (isAuthenticated.value ? cartDb.value : cartLocal.value))
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
  const syncLocalCartWithServer = async () => {
    if (cartLocal.value.length > 0 && isAuthenticated.value) {
      for (const item of cartLocal.value) {
        try {
          await api.post('/auth/cart/', { course_id: Number(item.id) })
          await fetchCartCourses()
        } catch (error) {
          console.error(`Failed to sync course ID ${item.id} with server:`, error)
        }
      }
      // Sau khi đồng bộ, xóa giỏ hàng local và tải lại giỏ hàng từ server
      cartLocal.value = []
      removeCartFromLocalStorage()
      // ElNotification({
      //   title: 'Thành công',
      //   message: 'Đồng bộ giỏ hàng lên server thành công',
      //   type: 'success'
      // })
    }
  }
  // Hàm xử lý khi người dùng đăng nhập
  const handleLogin = async () => {
    if (isAuthenticated.value) {
      // await fetchCartCourses()
      await syncLocalCartWithServer()
    }
  }

  loadCartFromLocalStorage()
  return {
    cart,
    cartDb,
    cartLocal,
    loading,
    isAuthenticated,
    addCourseToCart,
    fetchCartCourses,
    removeCourseFromCart,
    clearCart,
    syncLocalCartWithServer,
    handleLogin
  }
})
