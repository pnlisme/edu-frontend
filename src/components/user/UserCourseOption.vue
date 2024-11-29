<template>
    <div>
        <h3 class="text-3xl font-bold mb-6">Nội dung khóa học</h3>

        <div class="border-2 rounded-lg shadow-lg bg-white">
            <el-collapse class="border-0" v-model="activeNames" accordion>
                <el-collapse-item v-for="chapter in contents" :key="chapter.id" :name="chapter.id.toString()">
                    <template #title>
                        <div class="px-4 py-3 flex gap-5 items-center justify-between">
                            <div class="flex items-center gap-3">
                                <h3 class="text-lg font-semibold text-gray-800">{{ chapter.title }}</h3>
                                <span class="text-gray-500 text-sm">{{ chapter.duration_display }}</span>
                            </div>
                            <!-- <span class="text-gray-600">
                                {{ chapter.content_done }}/{{ chapter.content_count }} hoàn thành
                            </span> -->
                        </div>
                    </template>

                    <!-- Hiển thị các bài giảng trong chương -->
                    <div v-for="section in chapter.section_content" :key="section.id"
                        class="cursor-pointer flex justify-between items-center px-6 py-3 bg-gray-50 hover:bg-gray-100 transition">
                        <div class="flex items-center gap-3">
                            <div class="" v-if="section.type === 'video'">
                                <PlayCircleIcon class="h-6 w-6 text-indigo-500" />
                            </div>
                            <div class="" v-else>
                                <DocumentIcon class="h-6 w-6 text-indigo-500" />
                            </div>

                            <div>
                                <h4 class="text-gray-800 font-medium" :class="{ 'text-indigo-600': section.learned }">
                                    {{ section.title }}
                                </h4>
                                <span class="text-gray-500 text-sm">{{ section.duration_display }}</span>
                            </div>
                        </div>
                        <!-- <span v-if="section.percent" class="text-sm text-gray-600">
                            {{ section.percent }}% hoàn thành
                        </span> -->
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DocumentIcon, PlayCircleIcon } from '@heroicons/vue/24/outline';

// Props nhận từ cha
defineProps<{
    contents: Array<{
        id: number;
        title: string;
        duration_display: string;
        content_count: number;
        content_done: number;
        section_content: Array<{
            id: number;
            title: string;
            type: string;
            duration_display: string;
            learned: boolean | null;
            percent: number | null;
        }>;
    }>;
}>();

const activeNames = ref([]);
</script>

<style scoped>
/* Tùy chỉnh thêm CSS nếu cần */
</style>