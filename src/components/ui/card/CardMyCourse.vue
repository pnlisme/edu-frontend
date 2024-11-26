<template>
    <div class="group animation shadow-md cursor-pointer flex flex-col gap-2 rounded-lg p-3">
        <div class="relative rounded-lg overflow-hidden">
            <img class="animation group-hover:scale-105 w-full h-48 rounded-lg" :src="image" alt="">
            <div class="absolute w-full top-0 hidden group-hover:block aniamtion">
                <div class=" h-48 animation flex justify-center items-center  bg-opacity-35 bg-gray-950">
                    <PlayCircleIcon class="h-12 w-12 text-white" />
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-1">
            <div class="">
                <h3 class="text-lg font-bold">{{ name }}</h3>
                <span class="font-medium">{{ lecture }}</span>
            </div>
            <div class="flex flex-col">
                <el-progress :percentage="percentage" />
                <span class="text-sm text-gray-500">Bài giảng: {{ formattedPercentage }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlayCircleIcon } from "@heroicons/vue/20/solid";
import type { CardMyCourse } from '@/interfaces/course.interface';
import { defineProps, computed } from 'vue';
const props = defineProps<CardMyCourse>()
// Hàm format để định dạng số bài giảng đã học
const format = (completed: number, total: number): string => {
    return completed === total ? 'Full' : `${completed}/${total}`;
};
// Tính tỷ lệ phần trăm
const percentage = computed(() => {
    return props.total > 0 ? (props.completed / props.total) * 100 : 0;
});
// Tạo computed property để sử dụng trong template
const formattedPercentage = computed(() => format(props.completed, props.total));
</script>
