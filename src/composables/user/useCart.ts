import { useCartStore } from '@/store/cart'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

export function useCart() {
  const cartStore = useCartStore()
  const { cartDb, cartLocal, loading } = storeToRefs(cartStore)
  const isAuthenticated = ref(!!Cookies.get('token_user_edu'))
  watchEffect(() => {
    isAuthenticated.value = !!Cookies.get('token_user_edu')
    if (isAuthenticated.value) {
      // Gọi hàm handleLogin khi người dùng đăng nhập
      cartStore.handleLogin()
    }
    // if (isAuthenticated.value) {
    //   cartStore.handleLogin()
    // } else {
    //   cartStore.handleLogout()
    // }
  })

  const cart = computed(() => {
    return isAuthenticated.value ? cartDb.value : cartLocal.value
  })

  const handleAddToCart = (courseId: number) => {
    cartStore.addCourseToCart(courseId)
  }

  const handleRemoveFromCart = (courseId: number) => {
    cartStore.removeCourseFromCart(courseId)
  }
  const formattedTotalPrice = computed(() => {
    return cart.value.reduce((total, course) => {
      // Tính tổng, nếu có giá khuyến mãi thì trừ đi giá khuyến mãi, nếu không thì dùng giá hiện tại
      const finalPrice = course.old_price ? course.current_price : course.current_price
      return total + finalPrice
    }, 0)
  })
  const formattedTotalPriceOld = computed(() => {
    return cart.value.reduce((total, course) => {
      // Tính tổng, nếu có giá khuyến mãi thì trừ đi giá khuyến mãi, nếu không thì dùng giá hiện tại
      const finalPrice = course.old_price
      return total + finalPrice
    }, 0)
  })
  const formatPrice = (price: number | undefined) => {
    return price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : null
  }
  return {
    cart,
    isAuthenticated,
    formattedTotalPrice,
    formattedTotalPriceOld,
    formatPrice,
    loading,
    clearCart: cartStore.clearCart,
    fetchCartCourses: cartStore.fetchCartCourses,
    handleAddToCart,
    handleRemoveFromCart
  }
}
