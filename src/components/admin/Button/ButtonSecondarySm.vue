<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  link?: string | undefined,
  title?: string,
  icon?: any
}>();

</script>
<template>
  <router-link :to="link" 
  class="flex p-1 border border-gray-400 rounded-[5px] text-[12px] text-gray-500 hover:border-btn-darkmode hover:text-btn-darkmode hover:duration-300">
  {{ title }}
  <component :is="icon" class="w-4" />
  </router-link>
</template>