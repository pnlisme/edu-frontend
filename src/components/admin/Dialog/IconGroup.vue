<script setup lang="ts">
import { useIconPickerStore } from '@/store/iconpicker';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const iconPickerStore = useIconPickerStore();
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  label: string
  inputId: string
  inputPlaceHoder: string
  modelValue: string;
}>();

// Khai báo emits
const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

// Phát sự kiện khi icon được chọn
const selectIcon = (icon: string) => {
  iconPickerStore.selectedIcon = icon;
  emits('update:modelValue', icon); // Phát sự kiện với giá trị mới
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null; // Ép kiểu và kiểm tra null
  if (target) {
    emits('update:modelValue', target.value); // Truy cập `value` một cách an toàn
  }
};
</script>

<template>
<div class="mt-3">
    <label for="inputId" class="label-input">
      {{ label }}
    </label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input type="text" name="inputId" id="inputId"
        class="input-style"
        v-model="iconPickerStore.selectedIcon"
        @click="iconPickerStore.toggleDropdown" 
        @input="handleInput"
        placeholder="Chọn icon cho danh mục." />
    </div>
    <!-- dropdown -->
    <div v-if="iconPickerStore.showDropdown" class="absolute z-10 bg-white border border-gray-300 mt-1 right-20 rounded-md shadow-md w-[300px]">
      <input 
      v-model="iconPickerStore.search" 
      type="text" placeholder="Nhập để tìm kiếm"
      class="border-b border-gray-300 p-2 w-full" 
      @input="iconPickerStore.filteredIcons"
      />
      <div class="max-h-52 overflow-y-auto grid grid-cols-4">
        <a 
          v-for="icon in iconPickerStore.filteredIcons.slice().reverse()" 
          :key="icon.title" 
          @click="selectIcon(icon.title)"
          class="flex justify-center iconpicker-item items-center p-2 cursor-pointer hover:bg-gray-100" 
          title="icon.title">
          <FontAwesomeIcon :icon="icon.icon" class="w-full size-5" />
        </a>
      </div>
    </div>
  </div>
</template>

