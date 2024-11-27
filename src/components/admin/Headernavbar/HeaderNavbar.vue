<script setup lang="ts">
import {FolderPlusIcon, ArrowLongLeftIcon } from '@heroicons/vue/24/solid';
import ButtonPrimary from '@/components/admin/Button/ButtonPrimary.vue'
import Secondary from '@/components/admin/Button/ButtonSecondary.vue'
import { defineProps } from 'vue';

const props = defineProps<{
  namePage: string
}>();
</script>
<template>
  <div class="bg-white rounded-[10px] shadow-soft px-4 py-2 dark:bg-dark-sidebar border dark:shadow-none flex justify-between items-center">
    <p class="text-xl font-bold">{{ props.namePage }}</p>
    <div class="flex items-center gap-2">
      <!-- <Secondary
      :icon="ArrowLongLeftIcon"
      link="#"
      title="Trước"
      /> -->
      <!-- <ButtonPrimary
      :icon="FolderPlusIcon"
      link="/admin/add-category"
      title="Thêm danh mục"
      /> -->
      <slot>
      </slot>
    </div>

  </div>
</template>

