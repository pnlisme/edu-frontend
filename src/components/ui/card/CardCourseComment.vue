<template>
    <div class="flex flex-col">
        <div class="flex gap-3">
            <div>
                <!-- Use default image if none is provided -->
                <el-avatar :src="image || defaultAvatar" />
            </div>
            <div class="flex flex-col">
                <h3 class="font-medium">{{ name }}</h3>
                <div class="flex gap-2 items-center">
                    <!-- Render stars based on the rate prop -->
                    <div class="flex gap-1">
                        <StarIcon v-for="n in rate" :key="n" class="w-4 h-4 text-yellow-400" />
                    </div>
                    <span class="text-gray-600">{{ formatDate(created_at) }}</span>
                </div>
            </div>
        </div>
        <span class="text-md leading-5">{{ isExpanded ? content : truncatedContent }}</span>
        <button v-if="content.length > maxLength" @click="toggleContent"
            class="flex mt-2 underline cursor-pointer text-indigo-600"> {{ isExpanded ? 'Ẩn bớt' : 'Xem thêm'
            }}</button>
    </div>
</template>

<script setup lang="ts">

import type { CourseComment } from '@/interfaces/ui.interface';
import { StarIcon } from '@heroicons/vue/20/solid';
import { defineProps, ref, computed } from 'vue'
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const props = defineProps<CourseComment>()


// ẩn, xem thêm
const isExpanded = ref(false)
const maxLength = 200
const truncatedContent = computed(() => props.content.slice(0, maxLength) + '...')
const toggleContent = () => {
    isExpanded.value = !isExpanded.value
}
const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
    }).format(new Date(date));
};
</script>
