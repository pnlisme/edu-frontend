import LayoutCourseVideo from '@/layouts/LayoutCourseVideo.vue'
import TeacherLayout from '@/layouts/TeacherLayout.vue'
import UserDashboard from '@/layouts/UserDashboard.vue'
import CourseListPage from '@/views/teacher/CourseListPage.vue'
import PaymentPage from '@/views/teacher/PaymentPage.vue'
import MyProfile from '@/views/user/MyProfile.vue'
import Security from '@/views/user/Security.vue'
import PaymentMethodPage from '../views/teacher/PaymentMethodPage.vue'
import RedirectHandler from '@/views/RedirectHandler.vue'
import CourseEditPage from '@/views/teacher/CourseEditPage.vue'
import CourseSectionEditPage from '@/views/teacher/CourseSectionEditPage.vue'
import CourseQuizEditPage from '@/views/teacher/CourseQuizEditPage.vue'
import StudentManagerPage from '@/views/teacher/StudentManagerPage.vue'

const teacher = [
  {
    path: '/teacher',
    // component: () => import('@/layouts/ClientLayout.vue'),
    component: TeacherLayout,
    meta: { requiresAuth: true, role: 'instructor', title: 'Thống kê | Edunity' },
    children: [
      {
        path: '/teacher',
        name: 'teacher.index',
        component: () => import('@/views/teacher/DashboardPage.vue'),
        meta: { requiresAuth: true, role: 'instructor', title: 'Thống kê | Edunity' }
      },
      {
        path: '/teacher/security',
        name: 'teacher.security',
        component: Security,
        meta: { requiresAuth: true, role: 'instructor', title: 'Bảo mật | Edunity' }
      },
      {
        path: '/teacher/profile-setting',
        name: 'teacher.profile-setting',
        component: MyProfile,
        meta: { requiresAuth: true, role: 'instructor', title: 'Cài đặt| Edunity' }
      },
      {
        path: '/teacher/course/list',
        name: 'teacher.course',
        component: CourseListPage,
        meta: { requiresAuth: true, role: 'instructor', title: 'Bảo mật | Edunity' }
      },
      {
        path: '/teacher/payment',
        name: 'teacher.payment',
        component: PaymentPage,
        meta: { requiresAuth: true, role: 'instructor', title: 'Bảo mật | Edunity' }
      },
      {
        path: '/teacher/payment-method',
        name: 'teacher.payment-method',
        component: PaymentMethodPage,
        meta: { requiresAuth: true, role: 'instructor', title: 'Phương thức | Edunity' }
      },
      {
        path: '/teacher/payment-method/:status',
        name: 'RedirectHandler',
        component: RedirectHandler,
        meta: { requiresAuth: true, role: 'instructor', title: 'Phương thức | Edunity' }
      },
      {
        path: '/teacher/course/edit/:id',
        name: 'CourseEditPage',
        component: CourseEditPage,
        meta: { requiresAuth: true, role: 'instructor', title: 'Phương thức | Edunity' }
      },
      {
        path: '/teacher/course/section/edit/:id',
        name: 'CourseSectionEditPage',
        component: CourseSectionEditPage,
        meta: { requiresAuth: true, role: 'instructor', title: 'Phương thức | Edunity' }
      },
      {
        path: '/teacher/course/quiz/edit/:id',
        name: 'CourseQuizEditPage',
        component: CourseQuizEditPage,
        meta: { requiresAuth: true, role: 'instructor', title: 'Phương thức | Edunity' }
      },
      {
        path: '/teacher/student-manager',
        name: 'teacher.student-manager',
        component: StudentManagerPage,
        meta: { requiresAuth: true, role: 'instructor', title: 'Phương thức | Edunity' }
      }
    ]
  }
]
export default teacher
