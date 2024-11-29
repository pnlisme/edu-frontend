<script setup lang="ts">
import type { DescriptionGroupProps } from '@/interfaces/admin.interface';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<DescriptionGroupProps>();
const emit = defineEmits(['update:modelValue']);
// Hàm phát ra sự kiện thay đổi giá trị
const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
};
</script>

<template>
  <div class="mt-3" :class="customsClass">
    <label :for="inputId" class="label-input" :class="customsClassChild">
      {{ label }}
    </label>
    <textarea :id="inputId" :name="inputId" :placeholder="inputPlaceHoder" :v-model="props.value" @input="handleInput"
      rows="4" class="block p-2.5 input-style" :class="customsClassChild2"></textarea>
  </div>
</template>
