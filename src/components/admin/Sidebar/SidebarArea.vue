<script setup lang="ts">
import logo from '@/assets/images/logo2.svg'
import logoMinimal from '@/assets/images/minimal-logo.svg'
import SidebarItems from './SidebarItems.vue';
import { computed, ref } from 'vue';
import { WindowIcon, HomeIcon, SquaresPlusIcon, ArchiveBoxIcon, BanknotesIcon, UserGroupIcon, ChatBubbleLeftRightIcon, EnvelopeIcon, DocumentTextIcon, TicketIcon } from '@heroicons/vue/24/outline';
import { Cog8ToothIcon, InboxStackIcon, LanguageIcon, UserCircleIcon } from '@heroicons/vue/20/solid';
import type { MenuGroup } from '@/interfaces/admin.interface';
import { useSidebarStore } from '@/store/sidebar';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

const sidebarStore = useSidebarStore();
const currentLogo = computed(() => {
  return sidebarStore.isSidebarOpen ? logoMinimal : logo;
});
const sidebarClass = computed(() => {
  return sidebarStore.isSidebarOpen ? 'w-[90px]' : 'w-[290px]';
});
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const userRole = state.value.user?.role
const menuGroups = ref<MenuGroup[]>([
  {
    menuItems: [
      {
        icon: HomeIcon,
        label: 'Bảng điều khiển',
        route: '/admin/dashboard',
      },
      {
        icon: SquaresPlusIcon,
        label: 'Danh mục',
        route: '/admin/category'
      },
      {
        icon: ArchiveBoxIcon,
        label: 'Khoá học',
        route: '#',
        children: [
          {
            label: 'Quản lý khoá học',
            route: '/admin/course/manager-course'
          },
          {
            label: 'Thêm khoá học mới',
            route: '/admin/course/add-course'
          },
          {
            label: 'Phiếu giảm giá',
            route: '/admin/course/manager-coupon'
          },
        ]
      },
      {
        icon: BanknotesIcon,
        label: 'Báo cáo doanh thu',
        route: '#',
        children: [
          {
            label: 'Doanh thu admin',
            route: '/admin/reportpayment/admin-revenue'
          },
          {
            label: 'Doanh thu giáo viên',
            route: '/admin/reportpayment/teacher-revenue'
          },
          {
            label: 'Lịch sử mua hàng',
            route: '/admin/reportpayment/history'
          },
        ]
      },
      {
        icon: UserGroupIcon,
        label: 'Người dùng',
        route: '#',
        children: [
          {
            label: 'Giáo viên',
            route: '#',
            children: [
              {
                label: 'Quản lý giáo viên',
                route: '/admin/user/user-teacher/user-manager-teacher',
              },
              {
                label: 'Thêm giáo viên',
                route: '/admin/user/user-teacher/user-add-teacher',
              },
              {
                label: 'Thanh toán',
                route: '/admin/user/user-teacher/payout',
              },
              {
                label: 'Cài đặt thanh toán',
                route: '/admin/user/user-teacher/payout-settings',
              },
              {
                label: 'Phê duyệt',
                route: '/admin/user/user-teacher/accept',
              },
            ]
          },
          {
            label: 'Học viên',
            route: '#',
            children: [
              {
                label: 'Quản lý học viên',
                route: '/admin/user/user-student/user-manager-student',
              },
              {
                label: 'Thêm học viên',
                route: '/admin/user/user-student/user-add-student',
              },
            ]
          },
        ]
      },
      {
        icon: ChatBubbleLeftRightIcon,
        label: 'Tin nhắn',
        route: '/admin/message',
      }
      ,
      {
        icon: TicketIcon,
        label: 'Mã giảm giá',
        route: '/admin/voucher',
      }
      ,
      {
        icon: LanguageIcon,
        label: 'Ngôn ngữ',
        route: '/admin/language',
      }
      ,
      {
        icon: InboxStackIcon,
        label: 'Cấp độ',
        route: '/admin/level',
      }
      ,
      {
        icon: UserCircleIcon,
        label: 'Thông tin cá nhân',
        route: '/admin/profile-settings'
      },
    ]
  }

])
const menuGroupsTeacher = ref<MenuGroup[]>([
  {
    menuItems: [
      {
        icon: HomeIcon,
        label: 'Bảng điều khiển',
        route: '/teacher/dashboard'
      },
      {
        icon: SquaresPlusIcon,
        label: 'Danh mục',
        route: '/teacher/category'
      },
      {
        icon: ArchiveBoxIcon,
        label: 'Khoá học',
        route: '#',
        children: [
          {
            label: 'Quản lý khoá học',
            route: '/teacher/course/manager-course'
          },
          {
            label: 'Thêm khoá học mới',
            route: '/teacher/course/add-course'
          },
        ]
      },
      // {
      //   icon: CubeIcon,
      //   label: 'Quản lý đơn hàng',
      //   route: '#',
      //   children: [
      //     {
      //       label: 'Khoá học đã bán',
      //       route: '/teacher/order/course-sold'
      //     },
      //     {
      //       label: 'Lịch sử mua hàng',
      //       route: '/teacher/order/history'
      //     },
      //   ]
      // },
      // {
      //   icon: CreditCardIcon,
      //   label: 'Thanh toán',
      //   route: '#',
      //   children: [
      //     {
      //       label: 'Rút tiền',
      //       route: '/teacher/payment/teacher-revenue'
      //     },
      //     {
      //       label: 'Cài đặt',
      //       route: '/teacher/payment/history'
      //     },
      //   ]
      // },
      {
        icon: UserGroupIcon,
        label: 'Quản lí học viên',
        route: '/teacher/student',
      },
      {
        icon: ChatBubbleLeftRightIcon,
        label: 'Tin nhắn',
        route: '/teacher/message',
      }

    ]
  },
  {
    menuItems: [
      {
        icon: UserCircleIcon,
        label: 'Thông tin cá nhân',
        route: '/teacher/profile-settings'
      },
    ]

  }
])
const selectedMenuGroups = computed(() => {
  return userRole === 'admin' ? menuGroups.value : menuGroupsTeacher.value;
});
</script>

<template>
  <aside class="sticky top-0 z-[20]" :class="{
    'ssm:hidden': !sidebarStore.isSidebarOpen,
  }">
    <div
      class=" w-[250px] h-[97vh] max-h-screen relative dark:bg-dark-sidebar bg-primary-sidebar rounded-[16px] shadow-sidebar transform duration-100 overflow-y-auto scroll-hidden"
      :class="sidebarClass">
      <!-- SIDEBAR HEADER -->
      <RouterLink class="flex items-center justify-center" to="/admin">
        <img class="pt-4 w-36  " :class="{ 'p-4': currentLogo == logoMinimal }" :src="currentLogo" alt="">
        <!-- <WindowIcon 
            class="hidden sm:block w-6 h-6 dark:hover:text-gray-200 text-gray-400"
        /> -->
      </RouterLink>
      <!-- note 1: Phím show hide sidebar -->
      <!-- END SIDEBAR HEADER -->

      <div class="text-white gap-1.5"
        :class="{ 'p-4': sidebarStore.isSidebarOpen, 'p-6': !sidebarStore.isSidebarOpen }">
        <!-- Sidebar Menu -->
        <nav>
          <template v-for="menuGroup in selectedMenuGroups" :key="menuGroup.name">
            <div>
              <!-- <h3 class="title text-base pl-4 pb-3 uppercase pt-6" :class="{ 'opacity-0': sidebarStore.isSidebarOpen }">
                {{ menuGroup.name }}</h3> -->
              <ul class="gap-1 flex flex-col">
                <SidebarItems v-for="(menuItem, index) in menuGroup.menuItems" :item="menuItem" :key="index"
                  :index="index" />
              </ul>
            </div>
          </template>
        </nav>
        <!-- End Sidebar Menu -->
        <div class="pt-7 text-center text-sm text-zinc-400">
          Create by Edunity 2024
        </div>
      </div>
    </div>

  </aside>
</template>
<style scoped>
.scroll-hidden {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
}

.scroll-hidden::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}
</style>