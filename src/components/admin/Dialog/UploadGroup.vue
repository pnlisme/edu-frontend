<script setup lang="ts">
import type { UploadGroupProps } from '@/interfaces/admin.interface';
import {ref, defineProps } from 'vue';

const props = defineProps<UploadGroupProps>();
// Gọi hàm xử lý sự kiện từ component cha
const handleChange = (event: Event) => {
  if (typeof props.handlePreviewImg === 'function') {
    props.handlePreviewImg(event);
  }
};

</script>

<template>
  <div class="mt-3"
  :class="customsClass"
  >
  <label :for="inputId"
    :class="customsClassChild" class="label-input flex gap-2">{{ label }} 
    <p class="text-red-600 dark:text-red-500">{{ required }}</p>
  </label>
    <div class="relative mt-1 rounded-md shadow-sm"
    :class="customsClassChild2"
    >
    <img v-if="imageUrl" :src="imageUrl" class="w-[200px] h-[70px]" />
    <input 
      type="file" 
      :name="inputId" 
      :id="inputId"
      class="input-style dark:bg-white"
      @change="handleChange"
    />
    </div>
  </div>
</template>

