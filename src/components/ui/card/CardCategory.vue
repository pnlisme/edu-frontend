<template>
    <div class="border-1 p-3 flex flex-row items-center gap-5 shadow-md rounded-lg ">
        <img class="w-20" :src="image" alt="">
        <div class="">
            <h3 class="text-xl font-medium">{{ name }}</h3>
            <span class="text-gray-500"> {{ countCourse }} Khóa học</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

import type { Category } from '@/interfaces';
import { defineProps } from 'vue';


defineProps<Category>()


</script>