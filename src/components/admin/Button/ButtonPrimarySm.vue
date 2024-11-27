<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  link?: string,
  title: string
}>();

</script>
<template>
  <router-link :to="link" 
  class="py-1 px-2 bg-bg-primary rounded-[5px] text-sm size-sm text-gray-500 hover:bg-btn-darkmode hover:text-white">
  {{ title }}
  </router-link>
</template>