<script setup lang="ts">
import type { InputGroupProps } from '@/interfaces/admin.interface';
import { defineProps, defineEmits } from 'vue';
const props = defineProps<InputGroupProps>();
const emit = defineEmits(['update:modelValue']);
// Hàm phát ra sự kiện thay đổi giá trị
const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>
<template>
  <div class="mt-3" :class="customsClass">
    <label :for="inputId" class="label-input flex gap-2" :class="customsClassChild">{{ label }}
      <p class="text-red-600 dark:text-red-500">{{ required }}</p>
    </label>
    <div class="relative mt-1 rounded-md shadow-sm" :class="customsClassChild2">
      <input type="text" :name="inputId" :id="inputId" :placeholder="inputPlaceHoder" @input="handleInput"
        class="input-style" />
    </div>
  </div>
</template>
