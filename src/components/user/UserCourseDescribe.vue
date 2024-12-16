<template>
    <div class="mt-5">
        <div class="border-2 border-gray-900 p-5 ">
            <h3 class="text-xl font-bold">Nội dung khóa học</h3>

            <div v-for="content in contents" :key="content.id" class="grid md:grid-cols-2  gap-5 mt-3">
                <div v-for="section in content.section_content" :key="section.id" class="flex items-center gap-3">
                    <CheckIcon class="h-5 w-5 text-gray-900" />
                    <span class="text-sm leading-4">{{ section.title }}</span>
                </div>

            </div>

        </div>
        <div class="mt-5 flex flex-col gap-3">
            <h3 class="text-lg font-medium">
                Mô tả ngắn
            </h3>
            <ul class="flex flex-col gap-1">
                <li>
                    {{ short_description }}
                </li>

            </ul>
        </div>
        <div class="mt-5 flex flex-col gap-3">
            <h3 class="text-lg font-medium">
                Mô tả chi tiết
            </h3>
            <ul class="flex flex-col gap-1">
                <li>
                    {{ description }}
                </li>
            </ul>
        </div>

    </div>

</template>
<script setup lang="ts">
defineProps<{
    contents: Array<{
        id: number;
        title: string;
        section_content?: Array<{
            id: number;
            title: string;
        }>;
    }>;
    short_description: string,
    description: string
}>();
import { CheckIcon } from '@heroicons/vue/20/solid';
import CourseContentItem from '../ui/item/CourseContentItem.vue';
import CardCourse from '../ui/card/CardCourse.vue';
</script>