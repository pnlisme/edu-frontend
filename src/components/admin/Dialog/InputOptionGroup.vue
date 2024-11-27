<script setup lang="ts">
import type { InputOpionGroupProps } from '@/interfaces/admin.interface';
import { defineProps, ref } from 'vue';

const props = defineProps<InputOpionGroupProps>();

const inputValue = ref('');
const tags = ref<string[]>([]);

const addTag = () => {
  const value = inputValue.value.trim();
  if (value && !tags.value.includes(value)) {
    tags.value.push(value);
    inputValue.value = ''; 
  }
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};
</script>
<template>
    <div class="mt-3"
      :class="customsClass"
    >
        <label 
        :for="inputId" 
        class="label-input flex gap-2"
        :class="customsClassChild"
          >{{ label }} 
            <p class="text-red-600 dark:text-red-500">{{ required }}</p></label>
        <div 
        class="relative mt-1 rounded-md shadow-sm"
        :class="customsClassChild2"
        >
        <div class="tag-search">
          <el-input
            v-model="inputValue"
            :placeholder="inputPlaceHoder"
            @keyup.enter="addTag"
            clearable
            class="py-1.5"
          />
          <div class="tags-container">
            <el-tag
              v-for="(tag, index) in tags"
              :key="index"
              closable
              @close="removeTag(index)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        </div>
      </div>
</template>

