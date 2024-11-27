<script setup lang="ts">
import type { RadioGroupProps } from '@/interfaces/admin.interface';
import { defineProps } from 'vue';
const props = defineProps<RadioGroupProps>();
</script>
<template>
  <div>
    <div class="mt-3" :class="customsClass">
      <label :class="customsClassChild" class="label-input flex gap-2">{{ label }} <p
          class="text-red-600 dark:text-red-500">{{ required }}</p></label>
      <div class="relative mt-1 " :class="customsClassChild2">
        <slot>
        </slot>
      </div>
    </div>
  </div>
</template>
