import { createRouter, createWebHistory } from 'vue-router'

import user from './user'
import teacher from './teacher'
import admin from './admin'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { ElNotification } from 'element-plus'

const historyStack: string[] = []
const routes = [
  ...user,
  ...teacher,
  ...admin,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'), // Component hiển thị 404
    meta: { requiresAuth: false }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const { state } = storeToRefs(authStore)
  await authStore.userData()
  const isAuthenticated = state.value.token
  const userRole = state.value.user?.role
  // Quản lý lịch sử route
  if (from.fullPath && !historyStack.includes(from.fullPath)) {
    historyStack.push(from.fullPath) // Thêm vào lịch sử
  }

  // Giới hạn độ dài lịch sử (tối đa 20 URL)
  if (historyStack.length > 20) {
    historyStack.shift() // Xóa URL cũ nhất
  }
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    ElNotification({
      title: 'Cảnh báo',
      message: 'Bạn cần đăng nhập để tiếp tục!',
      type: 'warning'
    })
  }
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.role) {
    if (!userRole) {
      next('/')
      return
    }

    // Kiểm tra quyền truy cập dựa trên vai trò
    if (to.meta.role === 'admin' && userRole !== 'admin') {
      next('/') // Chặn nếu không phải admin
      ElNotification({
        title: 'Cảnh báo',
        message: 'Bạn không có quyền try cập!',
        type: 'warning'
      })
    } else if (to.meta.role === 'instructor' && !['instructor', 'admin'].includes(userRole)) {
      ElNotification({
        title: 'Cảnh báo',
        message: 'Bạn không có quyền try cập!',
        type: 'warning'
      })
      next('/') // Chặn nếu không phải teacher hoặc admin
    } else if (to.meta.role === 'student' && userRole !== 'student') {
      ElNotification({
        title: 'Cảnh báo',
        message: 'Bạn không có quyền try cập!',
        type: 'warning'
      })
      next('/') // Chặn nếu không phải user
    } else {
      next() // Cho phép truy cập nếu vai trò phù hợp
    }
  } else {
    next() // Cho phép truy cập nếu route không yêu cầu vai trò đặc biệt
  }
})
export default router
export { historyStack }
