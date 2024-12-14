<template>
  <header
    class=" bg-white dark:bg-dark-sidebar rounded-tl-[16px] text-black py-3 px-5 border-b shadow-bottom border-gray-400">
    <div class="flex justify-between relative items-center">
      <div class="flex gap-5 items-center">
        <WindowIcon class="w-6 h-6 dark:hover:text-gray-200 text-gray-400"
          @click.prevent="sidebarStore.toggleSidebar" />
        <div class="">
          <span class="font-semibold text-xl block dark:text-white">Trang quản trị</span>
          <router-link target="_blank" to="/"
            class="flex gap-2 items-center text-xs text-gray-400 hover:text-black hover:underline dark:hover:text-gray-200">
            Xem trang web
            <ArrowTopRightOnSquareIcon class="h-4 w-4" />
          </router-link>
        </div>
      </div>
      <div class="flex items-center">
        <ul class="function flex gap-5 items-center">
          <DarkModeSwitcher />
          <DropdownNotification />

          <div class="" v-if="state.token">
            <UserProfile :dataUser="state.user" />
          </div>
        </ul>
        <!-- User Area -->
        <!-- User Area -->
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
// import '@/assets/css/style.css'
import { WindowIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import DarkModeSwitcher from '@/components/admin/Header/DarkModeSwitcher.vue';
// import DropdownMessage from '@/components/admin/Header/DropdownMessage.vue';
import DropdownNotification from '@/components/admin/Header/DropdownNotification.vue';
import DropdownUser from '@/components/admin/Header/DropdownUser.vue';

import { useSidebarStore } from '@/store/sidebar';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth';
import UserProfile from '@/components/user/UserProfile.vue';
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const sidebarStore = useSidebarStore();
</script>
