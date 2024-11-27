import LayoutCourseVideo from '@/layouts/LayoutCourseVideo.vue'
import TeacherLayout from '@/layouts/TeacherLayout.vue'
import AddCourse from '@/views/admin/Course/AddCourse.vue'
import EditCourse from '@/views/admin/Course/EditCourse.vue'
import ManagerCourse from '@/views/admin/Course/ManagerCourse.vue'

const teacher = [
  {
    path: '/teacher/',
    component: TeacherLayout,
    children: [
      {
        path: '',
        name: 'teacher.index',
        component: () => import('@/views/teacher/DashboardPage.vue')
      },
      {
        path: '/teacher/course/manager-course',
        name: 'teacher.course',
        component: ManagerCourse,
        meta: { requiresAuth: true, role: 'instructor', title: 'Khoá học | Edunity' }
      },
      {
        path: '/teacher/course/add-course',
        name: 'teacher.add-course',
        component: AddCourse,
        meta: { requiresAuth: true, role: 'instructor', title: 'Thêm khoá học mới | Edunity' }
      },
      {
        path: '/teacher/course/edit-course/:id',
        name: 'teacher.edit-course',
        component: EditCourse,
        meta: { requiresAuth: true, role: 'instructor', title: 'Thêm khoá học mới | Edunity' }
      },
    ]
  }
]
export default teacher
