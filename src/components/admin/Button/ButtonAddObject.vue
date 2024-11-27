<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import { defineProps } from 'vue';

const props = defineProps<{
  link?: string,
  title: string
}>();

</script>
<template>
  <RouterLink to="link" class="mt-5 ">
    <div
      class="py-12 font-bold px-20 flex justify-center flex-wrap border border-dashed dark:border-bg-primary border-btn-darkmode bg-bg-primary rounded-xl size-sm text-btn-darkmode dark:bg-btn-darkmode dark:text-bg-primary gap-2 hover:shadow-lg hover:duration-200 dark:shadow-gray-50">
      <div class="w-full flex justify-center">
        <PlusCircleIcon class="w-7 size-lg" />
      </div>
      <div class="text-center">
        {{ title }}
      </div>
    </div>
  </RouterLink>
</template>