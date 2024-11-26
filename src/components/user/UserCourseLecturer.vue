<template>
    <main>
        <div class="flex flex-col gap-3">
            <h3 class="font-medium text-2xl underline-offset-2 underline">{{ name }}</h3>
            <span class="text-gray-600">{{ job }}</span>
            <div class="flex items-center gap-5">
                <div class="">
                    <el-avatar :size="150" src="https://empty">
                        <img :src="image || defaultAvatar" />
                    </el-avatar>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-3 items-center">
                        <StarIcon class="h-5 w-5" />
                        <span>{{ rate }} xếp hạng giảng viên</span>
                    </div>
                    <div class="flex gap-3 items-center">
                        <ChatBubbleLeftRightIcon class="h-5 w-5" />
                        <span>{{ review }} đánh giá</span>
                    </div>
                    <div class="flex gap-3 items-center">
                        <UserGroupIcon class="h-5 w-5" />
                        <span>{{ students }} học viên</span>
                    </div>
                    <div class="flex gap-3 items-center">
                        <PlayCircleIcon class="h-5 w-5" />
                        <span>{{ course }} khóa học</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-3">

                <span>
                    {{ introduce }}
                </span>


            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { CourseDetailUser } from '@/interfaces/user.interface';
import { StarIcon, UserGroupIcon, ChatBubbleLeftRightIcon, PlayCircleIcon } from '@heroicons/vue/24/outline';
import { defineProps } from 'vue'
defineProps<CourseDetailUser>()
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
</script>
