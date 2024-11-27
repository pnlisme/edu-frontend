<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps<{
  link: any;
  icon: any;
  text: string;
}>();
</script>

<template>
  <div>
    <RouterLink :to="link">
      <div class="flex gap-1 items-center">
        <component :is="icon" class="w-4" />
        <p class="text-sm">{{ text }}</p>
      </div>
    </RouterLink>
  </div>
</template>
