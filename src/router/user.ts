import LayoutCourseVideo from '@/layouts/LayoutCourseVideo.vue'
import UserDashboard from '@/layouts/UserDashboard.vue'

const user = [
  {
    path: '/',
    component: () => import('@/layouts/ClientLayout.vue'),
    children: [
      {
        path: '/',
        name: 'user.home',
        component: () => import('@/views/user/HomePage.vue')
      },
      {
        path: '/course',
        name: 'user.course',
        component: () => import('@/views/user/CoursePage.vue')
      },
      {
        path: '/course/detail',
        name: 'user.course.detail',
        component: () => import('@/views/user/CourseDetailView.vue')
      },
      // {
      //   path: '/course/:id',
      //   name: 'user.course.detail',
      //   component: () => import('@/views/user/CourseDetailView.vue'),
      //   prop: true
      // },
      {
        path: '/cart',
        name: 'user.cart',
        component: () => import('@/views/user/CartPage.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/user/Register.vue')
      },

      {
        path: '/verify-email/:token',
        name: '/verify-email',
        component: () => import('@/views/user/Verify.vue')
      },
      {
        path: '/reset-pass/:token',
        name: 'reset-pass',
        component: () => import('@/views/user/ResetPass.vue')
      },
      {
        path: '/forgot-pass',
        name: 'forgot-pass',
        component: () => import('@/views/user/ForgotPass.vue')
      },
      {
        path: '',
        component: UserDashboard,
        children: [
          {
            path: '/mycourses',
            name: 'mycourses',
            component: () => import('@/views/user/MyCourses.vue')
          },
          {
            path: '/myprofile',
            name: 'myprofile',
            component: () => import('@/views/user/MyProfile.vue')
          },
          {
            path: '/wishlist',
            name: 'wishlist',
            component: () => import('@/views/user/MyWishlist.vue')
          },
          {
            path: '/history',
            name: 'history',
            component: () => import('@/views/user/MyHistory.vue')
          },
          {
            path: '/security',
            name: 'security',
            component: () => import('@/views/user/Security.vue')
          },
          {
            path: '/mymessage',
            name: 'mymessage',
            component: () => import('@/views/user/MyMessage.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: LayoutCourseVideo,
    children: [
      {
        path: '/mylearncourse',
        name: 'mylearncourse',
        component: () => import('@/views/user/MyLearnCourse.vue')
      }
    ]
  }
]

export default user
