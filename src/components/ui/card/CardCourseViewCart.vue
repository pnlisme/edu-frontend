<template>
    <div class="flex  items-center justify-between">
        <div class="flex gap-5">

            <img class="w-28 h-20 rounded-lg" :src="thumbnail" alt="Course Thumbnail">
            <div class="">
                <h3 class="text-lg  font-semibold">{{ title }}</h3>
                <span class="text-gray-600">{{ category }}</span>
                <div class="flex gap-3 items-end">
                    <span class="text-md font-bold">{{ formatPrice(current_price) }}</span>
                    <del>{{ formatPrice(old_price) }} </del>
                </div>
            </div>
        </div>
        <button @click="handleRemoveFromCart(id)">
            <XMarkIcon class="h-6 w-6 text-red-500" />
        </button>
    </div>
</template>

<script setup lang="ts">

import { useCart } from '@/composables/user/useCart';
import type { TCartCourseViewItem } from '@/interfaces/course.interface';
import { XMarkIcon } from '@heroicons/vue/20/solid';
const { handleRemoveFromCart, formatPrice } = useCart();
defineProps<TCartCourseViewItem>();
</script>
