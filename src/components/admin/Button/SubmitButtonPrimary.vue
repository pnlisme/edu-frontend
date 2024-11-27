<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  title: string
}>();

</script>
<template>
  <div  class="flex bg-dark-sidebar border-2 border-dark-sidebar dark:bg-btn-darkmode dark:border-btn-darkmode hover:shadow-sidebar duration-75 text-white dark:hover:border-bg-primary dark:hover:duration-75 rounded-[5px]">
    <input type="submit" :value="props.title" class=" font-bold flex py-1.5 px-4 items-center gap-2"/>
  </div>
</template>

