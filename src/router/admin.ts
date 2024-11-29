import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import Category from '@/views/admin/Category.vue'
import ManagerCourse from '@/views/admin/Course/ManagerCourse.vue'
import ManagerCoupon from '@/views/admin/Course/ManagerCoupon.vue'
import AddCourse from '@/views/admin/Course/AddCourse.vue'
import AddCourseDetail from '@/views/admin/Course/AddCourseDetail.vue'
import ReportpaymentAdmin from '@/views/admin/Reportpayment/ReportpaymentAdmin.vue'
import ReportpaymentTeacher from '@/views/admin/Reportpayment/ReportpaymentTeacher.vue'
import PaymentHistory from '@/views/admin/Reportpayment/PaymentHistory.vue'
import ManagerTeacher from '@/views/admin/Users/ManagerTeacher.vue'
import AddNewTeacher from '@/views/admin/Users/AddNewTeacher.vue'
import PayoutTeacher from '@/views/admin/Users/PayoutTeacher.vue'
import SettingsTeacher from '@/views/admin/Users/SettingsTeacher.vue'
import AcceptTeacher from '@/views/admin/Users/AcceptTeacher.vue'
import Voucher from '@/views/admin/Voucher.vue'
import Level from '@/views/admin/Level.vue'
import Language from '@/views/admin/Language.vue'
import User from '@/views/admin/User.vue'
import Security from '@/views/user/Security.vue'
import MyProfile from '@/views/user/MyProfile.vue'
const admin = [
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,

    meta: { requiresAuth: true, role: 'admin', title: 'Trang quản trị | Edunity' },

    children: [
      {
        path: '/admin',
        name: 'admin.dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, role: 'admin', title: 'Bảng điều khiển ' }
      },
      {
        path: '/admin/category',
        name: 'admin.category',
        component: Category,

        meta: { requiresAuth: true, role: 'admin', title: 'Danh mục khoá học | Edunity' }
      },
      // {
      //   path: '/admin/add-category',
      //   name: 'admin.add-category',
      //   component: AddCategory,
      //   meta: {
      //     title: 'Danh mục khoá học | Edunity'
      //   }
      // },
      {
        path: '/admin/course',
        name: 'admin.course',
        component: ManagerCourse,

        meta: { requiresAuth: true, role: 'admin', title: 'Khoá học | Edunity' }
      },
      {
        path: '/admin/course/manager-course',
        name: 'admin.manager-course',
        component: ManagerCourse,
        meta: { requiresAuth: true, role: 'admin', title: 'Quản lý khoá học | Edunity' }
      },
      {
        path: '/admin/course/add-course',
        name: 'admin.add-course',
        component: AddCourse,
        meta: { requiresAuth: true, role: 'admin', title: 'Thêm khoá học mới | Edunity' }
      },
      {
        path: '/admin/course/manager-coupon',
        name: 'admin.manager-coupon',
        component: ManagerCoupon,
        meta: { requiresAuth: true, role: 'admin', title: 'Thêm khoá học mới | Edunity' }
      },
      {
        path: '/admin/course/add-course-detail',
        name: 'admin.add-course-detail',
        component: AddCourseDetail,
        meta: { requiresAuth: true, role: 'admin', title: 'Thêm khoá học chi tiết | Edunity' }
      },
      {
        path: '/admin/reportpayment',
        name: 'admin.reportpayment',
        component: ReportpaymentAdmin,
        meta: { requiresAuth: true, role: 'admin', title: 'Báo cáo danh thu ADMIN  | Edunity' }
      },
      {
        path: '/admin/reportpayment/admin-revenue',
        name: 'admin.admin-revenue',
        component: ReportpaymentAdmin,
        meta: { requiresAuth: true, role: 'admin', title: 'Báo cáo danh thu ADMIN  | Edunity' }
      },
      {
        path: '/admin/reportpayment/teacher-revenue',
        name: 'admin.teacher-revenue',
        component: ReportpaymentTeacher,
        meta: { requiresAuth: true, role: 'admin', title: 'Báo cáo danh thu giáo viên  | Edunity' }
      },
      {
        path: '/admin/reportpayment/history',
        name: 'admin.history',
        component: PaymentHistory,
        meta: { requiresAuth: true, role: 'admin', title: 'Lịch sử mua hàng  | Edunity' }
      },
      {
        path: '/admin/user/user-teacher/user-manager-teacher',
        name: 'admin.manager-teacher',
        component: ManagerTeacher,
        meta: { requiresAuth: true, role: 'admin', title: 'Quản lý giáo viên  | Edunity' }
      },
      {
        path: '/admin/user/user-teacher/user-add-teacher',
        name: 'admin.add-teacher',
        component: AddNewTeacher,
        meta: { requiresAuth: true, role: 'admin', title: 'Thêm mới giáo viên  | Edunity' }
      },
      {
        path: '/admin/user/user-teacher/payout',
        name: 'admin.payout-teacher',
        component: PayoutTeacher,
        meta: { requiresAuth: true, role: 'admin', title: 'Thanh toán giáo viên  | Edunity' }
      },
      {
        path: '/admin/user/user-teacher/payout-settings',
        name: 'admin.settings-teacher',
        component: SettingsTeacher,
        meta: { requiresAuth: true, role: 'admin', title: 'Phê duyệt giáo viên  | Edunity' }
      },
      {
        path: '/admin/user/user-teacher/accept',
        name: 'admin.accept-teacher',
        component: AcceptTeacher,
        meta: { requiresAuth: true, role: 'admin', title: 'Phê duyệt giáo viên  | Edunity' }
      },
      {
        path: '/admin/voucher',
        name: 'admin.voucher',
        component: Voucher,
        meta: { requiresAuth: true, role: 'admin', title: 'Giảm giá  | Edunity' }
      },
      {
        path: '/admin/level',
        name: 'admin.level',
        component: Level,
        meta: { requiresAuth: true, role: 'admin', title: 'Trình độ  | Edunity' }
      },
      {
        path: '/admin/language',
        name: 'admin.language',
        component: Language,
        meta: { requiresAuth: true, role: 'admin', title: 'Ngôn ngữ  | Edunity' }
      },
      {
        path: '/admin/user',
        name: 'admin.user',
        component: User,
        meta: { requiresAuth: true, role: 'admin', title: 'Người dùng | Edunity' }
      },
      {
        path: '/admin/profile-security',
        name: 'admin.profile-security',
        component: Security,
        meta: { requiresAuth: true, role: 'admin', title: 'Bảo mật | Edunity' }
      },
      {
        path: '/admin/profile-setting',
        name: 'admin.user',
        component: MyProfile,
        meta: { requiresAuth: true, role: 'admin', title: 'Chỉnh sửa thông tin | Edunity' }
      }
    ]
  }
]
export default admin
