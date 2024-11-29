<script setup lang="ts">
import type { SelectGroupProps, TBaseInputProps } from '@/interfaces/admin.interface';
import { defineProps, defineEmits ,ref} from 'vue';
const props = defineProps<SelectGroupProps>();
const value = ref(''); 
const emit = defineEmits(['update:modelValue']); // Phát sự kiện để cập nhật dữ liệu

const handleChange = (selectedValue: string | number) => {
  emit('update:modelValue', selectedValue); // Phát sự kiện khi dữ liệu thay đổi
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
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              <span>{{ item.label }}</span>
              </el-option>
          </el-select>
        </div>
      </div>
  </div>
</template>

