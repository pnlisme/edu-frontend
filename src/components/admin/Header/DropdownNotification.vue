
<script setup lang="ts">
import { ref } from 'vue';
import { BellIcon } from '@heroicons/vue/24/outline';
import { onClickOutside } from '@vueuse/core';

const target = ref(null);
const dropdownOpen = ref(false);
const notifying = ref(true);

onClickOutside(target, () => {
  dropdownOpen.value = false
})

const notificationItems = ref([
  {
    route: '#',
    title: 'Edit your information in a swipe',
    details:
      'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    time: '12 May, 2025'
  },
  {
    route: '#',
    title: 'It is a long established fact',
    details: 'that a reader will be distracted by the readable.',
    time: '24 Feb, 2025'
  },
  {
    route: '#',
    title: 'There are many variations',
    details: 'of passages of Lorem Ipsum available, but the majority have suffered',
    time: '04 Jan, 2025'
  },
  {
    route: '#',
    title: 'There are many variations',
    details: 'of passages of Lorem Ipsum available, but the majority have suffered',
    time: '01 Dec, 2024'
  }
])
</script>
<template>
  <li class="relative">
    <router-link 
    class="group bg-gray-200 dark:bg-gray-600 h-9 w-9 items-center justify-center rounded-full flex transition-colors duration-400" 
    to="#"
    @click.prevent="(dropdownOpen = !dropdownOpen), (notifying = false)">
      <span 
      :class="!notifying && 'hidden'"
      class="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 " >
        <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
      </span>
      <BellIcon class="w-6 h-6 hover:group-hover:text-btn-darkmode dark:group-hover:text-btn-darkmode text-gray-500 dark:text-gray-100 rounded-full flex transition-colors duration-300"/>
    </router-link>
    <!-- Dropdown Start -->
    <div
      v-show="dropdownOpen"
      class="absolute left-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80"
    >
      <div class="px-4 py-3">
        <h5 class="text-sm font-medium text-bodydark2">Notification</h5>
      </div>

      <ul class="flex h-auto flex-col overflow-y-auto">
        <template v-for="(item, index) in notificationItems" :key="index">
          <li>
            <router-link
              class="flex flex-col gap-2.5 border-t border-stroke px-4 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              :to="item.route"
            >
              <p class="text-sm">
                <span class="text-black dark:text-white">{{ item.title }}</span>
                {{ item.details }}
              </p>
              <p class="text-xs">{{ item.time }}</p>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
    <!-- Dropdown End -->
  </li>
</template>
