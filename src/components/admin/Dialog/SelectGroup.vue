<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { SelectGroupProps } from '@/interfaces/admin.interface';

// Nhận các props từ component cha
const props = defineProps<SelectGroupProps>();
const emit = defineEmits(['update:modelValue']);

// Khởi tạo giá trị 'value' trong component này (SelectGroup)
const value = ref(props.modelValue);  // Truyền giá trị vào từ parent component thông qua 'modelValue'

// Đồng bộ giá trị của 'value' khi 'category_id' thay đổi trong parent
watch(() => props.modelValue, (newValue) => {
  value.value = newValue;  // Cập nhật giá trị 'value' trong SelectGroup khi modelValue thay đổi
});

// Phát sự kiện khi giá trị thay đổi
const handleChange = (selectedValue: string | number) => {
  emit('update:modelValue', selectedValue);  // Gửi giá trị thay đổi về parent
};

</script>
<template>
  <div>
    <div class="mt-3"
      :class="props.customsClass"
    >
        <label :for="props.inputId"
        :class="props.customsClassChild" class="label-input flex gap-2">{{ props.label }} <p class="text-red-600 dark:text-red-500">{{ props.required }}</p></label>
        <div class="rounded-md mt-1"
        :class="props.customsClassChild2"
        >
          <el-select
          v-model="value"
          :placeholder="props.inputPlaceHoder"
          class="w-full"
          filterable
          @change="handleChange"
          >
          <template #empty>
              <span>Không có giá trị nào</span> 
            </template>
              <el-option
                v-for="item in props.optionsData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              <span>{{ item.name }}</span>
              </el-option>
          </el-select>
        </div>
      </div>
  </div>
</template>

