<template>
    <div class="flex gap-3 items-center">
        <CheckIcon class="h-6 w-6 text-gray-900" />
        <span class="text-sm leading-4"> {{ content }}</span>
    </div>
</template>

<script setup lang="ts">
import type { CourseContentItem } from '@/interfaces/ui.interface';
import { CheckIcon } from '@heroicons/vue/20/solid';
import { defineProps } from 'vue';
defineProps<CourseContentItem>()
</script>
