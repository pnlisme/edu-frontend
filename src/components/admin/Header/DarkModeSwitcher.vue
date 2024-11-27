<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';
import { useDarkModeStore } from '@/store/darkmode';

const darkModeStore = useDarkModeStore();
</script>
<template>
  <label class="w-14 h-7.5  rounded-full relative flex items-center transition-transform duration-300"
    :class="{ 'bg-btn-darkmode': darkModeStore.darkMode, 'bg-bg-primary': !darkModeStore.darkMode }"
    @click.prevent="darkModeStore.toggleDarkMode">
    <span class="absolute flex items-center " :class="{ 'hidden': darkModeStore.darkMode }">
      <input type="checkbox" class="h-full w-full opacity-0 absolute p-2" name="" id="">
      <SunIcon class="p-0.5 absolute left-1 w-6 h-6 bg-white text-gray-400 shadow-switcher rounded-full flex" />
    </span>
    <span class="absolute flex items-center right-0 " :class="{ 'hidden': !darkModeStore.darkMode }">
      <input type="checkbox" class="h-full w-full opacity-0 absolute p-2" name="" id="">
      <MoonIcon class="p-1 absolute right-1 w-6 h-6 bg-white text-gray-400 shadow-switcher rounded-full flex" />
    </span>
  </label>
</template>
