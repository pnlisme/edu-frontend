<template>
    <div class="flex items-center flex-col my-5 ">
        <h3 class="text-xl font-medium">Bắt đầu tìm kiếm mới</h3>
        <span class="text-gray-600">Để tìm phụ đề bài giảng hoặc tài nguyên</span>
        <form @submit.prevent="handleSubmit" class="mt-5 flex items-center border-2 p-2 rounded-[50px] border-gray-900">
            <input v-model="searchQuery" class="px-4 w-64 focus-visible:outline-none" type="text">
            <button type="submit">
                <MagnifyingGlassIcon class="h-6 w-6 text-gray-500" />
            </button>
        </form>
        <span v-if="textSearch" class="text-center mt-5">Kết quả cho "{{ textSearch }}"</span>
    </div>
    <div class="mt-5">
        <el-collapse class="border-0" accordion>
            <el-collapse-item v-for="(content, index) in courseStudySearch" :key="content.id" :name="index">
                <template #title>
                    <div class="px-4 !text-gray-900 flex gap-5 items-center justify-between leading-5">
                        <h3 class="text-lg">{{ content.title }}</h3>
                        <div class="flex gap-1" v-if="content.content_course_type === 'section'">

                        </div>
                        <!-- <div @click="handleChangeContent(content)" -->
                        <!-- <div @click="handleChangeContent(content)" v-if="content.content_course_type === 'quiz'" -->
                        <div v-if="content.content_course_type === 'quiz'" class=" text-blue-500">
                            Quiz
                        </div>
                    </div>
                </template>

                <div v-for="lesson in content.section_content" :key="lesson.id"
                    class="cursor-pointer flex justify-between items-start bg-gray-50  py-2">
                    <div class="flex items-center gap-3 w-full px-4" @click="handleLessonClick(lesson)"
                        :class="{ 'bg-gray-200 rounded-lg': currentContent.id === lesson.id }">
                        <CheckOuline :class="lesson.percent >= 100 ? 'text-green-500' : 'text-gray-500'"
                            class="h-5 w-5" />
                        <div class=" flex flex-col">
                            <h3>{{ lesson.title }}</h3>
                            <div>
                                <div class="flex items-center gap-1" v-if="lesson.type === 'video'">
                                    <PlayCircleIcon class="h-4 w-4 text-gray-600" />
                                    <span class="text-pink-500">{{ lesson.duration_display }}</span>
                                </div>
                                <div class="flex items-center gap-1" v-else-if="lesson.type === 'file'">
                                    <DocumentIcon class="h-4 w-4 text-gray-600" />
                                    <span class="text-pink-500">{{ lesson.duration_display }}</span>

                                </div>
                                <!-- Nếu không, hiển thị biểu tượng câu hỏi -->
                                <div class="flex items-center gap-1" v-else-if="lesson.content_section_type === 'quiz'">
                                    <QuestionMarkCircleIcon class="h-4 w-4 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
const activeNames = ref(['1']);
import { PlayCircleIcon, CheckCircleIcon as CheckOuline, DocumentIcon, QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import { CheckCircleIcon as CheckSolid } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useCourseStore } from "@/store/course";
// Chapters data including lessons
const courseStore = useCourseStore();
const textSearch = ref<string>('')
const { currentContent, courseStudySearch } = storeToRefs(courseStore);
const searchQuery = ref("");
const props = defineProps<{
    course_id: number;
}>();

const handleSubmit = async () => {
    if (searchQuery.value.trim()) {
        textSearch.value = searchQuery.value
        await courseStore.searchLetureStudy(props.course_id, searchQuery.value)
    }
};
const handleLessonClick = async (lesson: any) => {
    try {
        await courseStore.changeContent({
            course_id: props.course_id,
            content_type: lesson.content_section_type,
            content_id: lesson.id,
        });
    } catch (error) {
        console.error('Failed to change content:', error);
    }
};
</script>
