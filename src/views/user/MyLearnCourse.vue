<template>
    <main class="px-10 bg-indigo-100 py-10">
        <div class="flex gap-5">
            <div class="w-4/6">
                <div class=" border-2 bg-white  border-indigo-600 rounded-lg">
                    <VideoCourse :src="videoUrl" />
                    <!-- Quizz -->
                    <!-- <div class="min-h-screen bg-white flex items-center justify-center">
                        <div class="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
                            <h2 class="text-xl font-semibold mb-4 text-center">Bài tập: Biến Python</h2>

                            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div class="bg-blue-500 h-2.5 rounded-full w-2/5"></div>
                            </div>

                            <p class="text-center mb-6">Cách chính xác để khai báo biến Python là gì?</p>

                            <form class="space-y-4">
                                <label class="flex items-center bg-blue-50 p-3 rounded-lg cursor-pointer">
                                    <input type="radio" name="question" class="form-radio h-4 w-4 text-blue-600" />
                                    <span class="ml-2 text-gray-700">var x = 5</span>
                                </label>

                                <label class="flex items-center bg-blue-50 p-3 rounded-lg cursor-pointer">
                                    <input type="radio" name="question" class="form-radio h-4 w-4 text-blue-600" />
                                    <span class="ml-2 text-gray-700">#x = 5</span>
                                </label>

                                <label class="flex items-center bg-blue-50 p-3 rounded-lg cursor-pointer">
                                    <input type="radio" name="question" class="form-radio h-4 w-4 text-blue-600" />
                                    <span class="ml-2 text-gray-700">$x = 5</span>
                                </label>

                                <label class="flex items-center bg-blue-50 p-3 rounded-lg cursor-pointer">
                                    <input type="radio" name="question" class="form-radio h-4 w-4 text-blue-600" />
                                    <span class="ml-2 text-gray-700">x = 5</span>
                                </label>

                                <button type="submit"
                                    class="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-center mt-4">
                                    Gửi câu trả lời
                                </button>
                            </form>
                        </div>
                    </div> -->
                </div>
                <div class="bg-white rounded-lg my-5 p-2">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="Tìm kiếm" name="first">
                            <UserSearch />
                        </el-tab-pane>
                        <el-tab-pane label="Hỏi đáp" name="second">
                            <UserQuestion />
                        </el-tab-pane>
                        <el-tab-pane label="Ghi chú" name="third">

                            <UserNote />
                        </el-tab-pane>
                        <el-tab-pane label="Đánh giá" name="fourth">
                            <UserFeedback />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="w-2/6">
                <div class="bg-white rounded-lg shadow-lg p-3">
                    <header class="p-2 flex items-center gap-3 overflow-hidden bg-gray-800 rounded-lg">
                        <img class="-ms-6 w-20"
                            src="https://ik.imagekit.io/laracasts/series/thumbnails/svg/livewire-basics.svg?tr=w-200"
                            alt="">
                        <div class="flex flex-col gap-3">
                            <h3 class="text-xl font-medium text-white">Build the Livewire App With Me!</h3>
                            <el-progress :percentage="100" status="success" />
                        </div>

                    </header>
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
            </div>
        </div>

    </main>
</template>
<script setup lang="ts">
import VideoCourse from '@/components/ui/video/VideoCourse.vue';
import { ref } from 'vue';
const videoUrl = ref('https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm');
import { PlayCircleIcon, CheckCircleIcon as CheckOuline } from "@heroicons/vue/24/outline";
import { CheckCircleIcon as CheckSolid } from "@heroicons/vue/24/solid";
import type { TabsPaneContext } from 'element-plus'
import UserSearch from '@/components/user/mycourse/UserSearch.vue';
import UserQuestion from '@/components/user/mycourse/UserQuestion.vue';
import UserNote from '@/components/user/mycourse/UserNote.vue';
import UserFeedback from '@/components/user/mycourse/UserFeedback.vue';

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
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

<style scoped></style>