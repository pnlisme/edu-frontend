<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
  icon?: any,
  link?: string,
  title: string
}>();

</script>
<template>
  <RouterLink to="link"
    class="flex bg-dark-sidebar border-2 border-dark-sidebar dark:bg-btn-darkmode dark:border-btn-darkmode hover:shadow-sidebar duration-75 text-white dark:hover:border-bg-primary dark:hover:duration-75 rounded-[5px]">
    <div class=" font-bold flex py-1.5 px-4 items-center gap-2">
      <component :is="icon" class="w-6" />
      <span>{{ title }}</span>
    </div>
  </RouterLink>
</template>
