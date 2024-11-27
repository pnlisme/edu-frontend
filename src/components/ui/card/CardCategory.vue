<template>
    <div class="border-1 cursor-pointer p-3 flex flex-row items-center gap-5 shadow-md rounded-lg ">
        <img class="w-20 rounded-sm" :src="computedImage" alt="">
        <div class="">
            <h3 class="text-xl font-medium">{{ name }}</h3>
            <span class="text-gray-500"> {{ courses_count }} Khóa học</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

import type { TCategory } from '@/interfaces/category.interface';
import { computed, defineProps } from 'vue';


const props = defineProps<TCategory>()
const computedImage = computed(() => {
    if (typeof props.image === 'string') {
        return props.image; // Nếu là string, trả về trực tiếp
    } else if (props.image instanceof File) {
        return URL.createObjectURL(props.image); // Nếu là File, tạo URL tạm thời
    }
    // Trả về ảnh mặc định nếu không có image
    return 'https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/web-development-logo-1718273508.png';
});
</script>