<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  icon?: any,
  link?: string,
  title?: string
  customStyle?: string
}>();

</script>
<template>
  <router-link :to="props.link" class="flex bg-bg-primary border-2 border-bg-linear dark:border-bg-linear dark:bg-bg-linear hover:shadow-sidebar duration-75 text-black dark:hover:border-bg-primary dark:hover:duration-75 rounded-[5px]">
    <div class="font-bold flex py-1.5 px-4 items-center gap-2"
    :class="customStyle"
    >
      <component :is="props.icon" class="w-6"/>
      <span >{{ props.title }}</span>
    </div>
  </router-link>
</template>

