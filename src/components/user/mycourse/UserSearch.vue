<template>
    <div class="flex items-center flex-col my-5 ">
        <h3 class="text-xl font-medium">Bắt đầu tìm kiếm mới</h3>
        <span class="text-gray-600">Để tìm phụ đề bài giảng hoặc tài nguyên</span>
        <form class="mt-5 flex items-center border-2 p-2 rounded-[50px] border-gray-900">
            <input class="px-4 w-64 focus-visible:outline-none" type="text">
            <button>
                <MagnifyingGlassIcon class="h-6 w-6 text-gray-500" />
            </button>
        </form>
        <span class="text-center mt-5">Kết quả cho "chỉnh sửa" (75 bài giảng)</span>
    </div>
    <div class="mt-5">
        <!-- Nodata -->
        <el-collapse class="border-0" v-model="activeNames" accordion>
            <el-collapse-item v-for="chapter in chapters" :key="chapter.name" :name="chapter.name">
                <template #title>
                    <div class="px-4 !text-gray-900 flex gap-5 items-center justify-between leading-5">
                        <h3 class="text-lg">{{ chapter.title }}</h3>
                        <div class="flex gap-1">
                            <span class="text-gray-500">{{ chapter.videosCount }}/{{ chapter.totalVideos }}
                                Videos</span> •
                            <span class="text-pink-500">{{ chapter.totalDuration }}</span>
                        </div>
                    </div>
                </template>

                <!-- Loop through lessons within each chapter -->
                <div v-for="lesson in chapter.lessons" :key="lesson.name"
                    class="cursor-pointer flex justify-between items-start bg-gray-50 px-4 py-2">
                    <div class="flex items-center gap-3">
                        <CheckOuline class="h-5 w-5 " />
                        <div class="flex flex-col">
                            <h3>{{ lesson.name }}</h3>
                            <div class="flex items-center gap-1">
                                <PlayCircleIcon class="h-4 w-4 text-gray-600" />
                                <span class="text-pink-500">{{ lesson.duration }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Show preview link if available -->
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
const activeNames = ref(['1']);
import { PlayCircleIcon, CheckCircleIcon as CheckOuline } from "@heroicons/vue/24/outline";
import { CheckCircleIcon as CheckSolid } from "@heroicons/vue/24/solid";
// Chapters data including lessons
const chapters = ref([
    {
        name: '1',
        title: 'Chương 1: Course Overview',
        videosCount: 1,
        totalVideos: 12,
        totalDuration: '1h 28m',
        lessons: [
            { name: 'Cài đặt phần mềm', duration: '12m', check: false },
            { name: 'Code giao diện', duration: '18m', check: true },
        ],
    },
    {
        name: '2',
        title: 'Chương 2: Curriculum',
        videosCount: 1,
        totalVideos: 12,
        totalDuration: '1h 28m',
        lessons: [
            { name: 'Vue Templating', duration: '12m', check: true },
            { name: 'Vue Forms', duration: '23m', check: false },
            { name: 'Vue Styling', duration: '57m', check: false },
            { name: 'Vue Routing', duration: '1h 30m', check: false },
            { name: 'Vue Animation', duration: '1h 19m', check: false },
        ],
    },
]);
</script>
