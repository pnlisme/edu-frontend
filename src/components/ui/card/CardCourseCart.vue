<template>
    <div>
        <div class="border border-indigo-50 shadow-md p-3 flex justify-between rounded-lg">
            <div class="flex gap-3 sm:flex-row flex-col">
                <img class="rounded-lg w-64" :src="thumbnail" alt="">
                <div class="flex flex-col gap-1">
                    <h3 class="text-lg font-medium">{{ title }}</h3>
                    <span class="text-gray-600">by {{ creator }}</span>
                    <div class="flex items-end gap-3">
                        <span class="text-xl font-semibold">{{ formatPrice(current_price) }}</span>
                        <del v-if="old_price" class="text-gray-600">{{ formatPrice(old_price) }}</del>
                    </div>
                    <div class="flex items-center gap-5">
                        <!-- <div :class="status === 'Mới' ? 'bg-green-400' : 'bg-pink-400'"
                            class="text-sm  border rounded-md px-2 py-0.5 text-white">{{ status }}</div> -->
                        <div class="flex items-center gap-3">
                            <div class="flex">
                                <!-- Use v-for to display stars based on rate -->
                                <StarIcon v-for="n in Math.floor(average_rating ?? 0)" :key="n"
                                    class="h-4 w-4 text-yellow-400" />
                            </div>
                            <span class="text-gray-500 text-sm">{{ average_rating }} ({{ reviews_count }})</span>
                        </div>
                    </div>
                    <ul class="flex mt-1 gap-3">
                        <!-- <li class="flex items-center gap-1">
                            <ClockIcon class="h-4 w-4 text-gray-500" />
                            <span class="text-[12px]">120 Giờ</span>
                        </li> -->
                        <li class="flex items-center gap-1">
                            <BookOpenIcon class="h-4 w-4 text-gray-500" />
                            <span class="text-[12px]">{{ lectures_count }} Chương học</span>
                        </li>
                        <li class="flex items-center gap-1">
                            <RocketLaunchIcon class="h-4 w-4 text-gray-500" />
                            <span class="text-[12px]">{{ level }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <button @click="handleRemoveFromCart(id)" class="text-indigo-600">
                    Xóa
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BookOpenIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline';
import { StarIcon } from "@heroicons/vue/20/solid";
import { defineProps } from 'vue';
import type { TCardCourse } from '@/interfaces/course.interface';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '@/composables/user/useCart';
const { handleRemoveFromCart } = useCart();


defineProps<TCardCourse>()

</script>

<style scoped></style>