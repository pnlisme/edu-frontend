<template>
    <div>
        <h3 class="text-2xl font-bold">Nội dung khóa học</h3>

        <div class="border-2 mt-5">
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
                        <div class="flex flex-col">
                            <h3 :class="lesson.preview ? 'text-indigo-600' : ''">{{ lesson.name }}</h3>
                            <div class="flex items-center gap-1">
                                <PlayCircleIcon class="h-4 w-4 text-gray-600" />
                                <span class="text-pink-500">{{ lesson.duration }}</span>
                            </div>
                        </div>
                        <!-- Show preview link if available -->
                        <span v-if="lesson.preview" class="text-indigo-600">Xem trước</span>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PlayCircleIcon } from "@heroicons/vue/20/solid";

// Keep track of which chapters are open
const activeNames = ref(['1']);

// Chapters data including lessons
const chapters = ref([
    {
        name: '1',
        title: 'Chương 1: Course Overview',
        videosCount: 1,
        totalVideos: 12,
        totalDuration: '1h 28m',
        lessons: [
            { name: 'Cài đặt phần mềm', duration: '12m', preview: false },
            { name: 'Code giao diện', duration: '18m', preview: true },
        ],
    },
    {
        name: '2',
        title: 'Chương 2: Curriculum',
        videosCount: 1,
        totalVideos: 12,
        totalDuration: '1h 28m',
        lessons: [
            { name: 'Vue Templating', duration: '12m', preview: true },
            { name: 'Vue Forms', duration: '23m', preview: false },
            { name: 'Vue Styling', duration: '57m', preview: false },
            { name: 'Vue Routing', duration: '1h 30m', preview: false },
            { name: 'Vue Animation', duration: '1h 19m', preview: false },
        ],
    },
]);

</script>