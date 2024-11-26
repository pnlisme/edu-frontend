<template>
    <li :class="['cursor-pointer flex justify-between items-center p-3', isActive ? 'bg-gray-600' : '']">
        <div class="flex items-center gap-3">

            <img class="w-50 h-12 rounded-md" :src="image" alt="">
            <PlayCircleIcon class="h-6 w-6 text-white " />
            <span class="text-white">{{ title }}</span>
        </div>
        <span class="text-white">{{ duration }}</span>
    </li>
</template>

<script setup lang="ts">
import { PlayCircleIcon } from '@heroicons/vue/20/solid';
import { defineProps } from 'vue';
import type { VideoFreeItem } from '@/interfaces/ui.interface';
defineProps<VideoFreeItem>()
</script>
