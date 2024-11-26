<template>
    <div
        class="cursor-pointer  hover:-translate-y-5 hover:bg-gray-800 px-10 hover:border-0 rounded-3xl py-10 hover:transition-all duration-300 hover:duration-500 transition-all  flex sm:items-start items-center gap-3 flex-col">
        <img :src="image" class="w-1/4" alt="">
        <h3 class="text-white font-medium text-lg text-center">{{ heading }}</h3>
        <span class="text-center sm:text-start text-white w-4/5">{{ description }}</span>
    </div>
</template>
<script setup lang="ts">
import type { CardService } from '@/interfaces/ui.interface';
import { defineProps } from 'vue';

defineProps<CardService>()
</script>
