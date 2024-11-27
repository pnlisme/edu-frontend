<template>
    <div @click="handleDetail(id)" class="group animation shadow-md cursor-pointer flex flex-col gap-2 rounded-lg p-3">
        <div class="relative rounded-lg overflow-hidden">
            <img class="animation group-hover:scale-105 w-full h-48 rounded-lg" :src="thumbnail" alt="" />
            <div class="absolute w-full top-0 hidden group-hover:block animation">
                <div class="h-48 animation flex justify-center items-center bg-opacity-35 bg-gray-950">
                    <PlayCircleIcon class="h-12 w-12 text-white" />
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-1">
            <div>
                <h3 class="text-lg font-bold">{{ title }}</h3>
                <span class="font-medium">Người tạo: {{ creator }}</span>
            </div>
            <div class="flex flex-col">
                <el-progress :percentage="progress_percent" />
                <span class="text-sm text-gray-500">Tiến độ: {{ completed_lectures }}/{{ total_lectures }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlayCircleIcon } from "@heroicons/vue/20/solid";
import type { TCardMyCourse } from "@/interfaces/course.interface";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<TCardMyCourse>();
const handleDetail = (id: number) => {
    router.push({ name: 'mylearncourse', params: { id } });
}
</script>