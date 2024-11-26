<template>

    <div
        class=" rounded-lg p-3 bg-white shadow-md hover:shadow-lg hover:transition-all transition-all hover:duration-300 duration-300 group ">
        <div class="relative overflow-hidden">
            <!-- IMAGE  -->
            <div class="rounded-lg overflow-hidden">
                <img class="group-hover:scale-105  scale-100 hover:transition-all transition-all hover:duration-300 duration-300 cursor-pointer object-cover w-full h-36"
                    :src="image" alt="Product Image" />
            </div>
            <!-- BODY  -->
            <div class="mt-2 flex flex-col gap-2">
                <div class="flex justify-between items-center">
                    <span class="text-sm">{{ lecture }}</span>
                    <button :class="status === 'Mới' ? 'bg-green-400' : 'bg-pink-400'"
                        class="text-sm  border rounded-md px-2 py-0.5 text-white">{{ status }}</button>
                </div>
                <h3 class="text-[16px] font-medium leading-6">{{ name }}</h3>
                <ul class="flex  gap-3">
                    <!-- <li class="flex items-center gap-1">
                        <ClockIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">120 Giờ</span>
                    </li> -->
                    <li class="flex items-center gap-1">
                        <BookOpenIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ lessons }} Chương học</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <RocketLaunchIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ level }}</span>
                    </li>
                </ul>

                <div class="flex items-end gap-3">
                    <span class="text-lg text-gray-800 font-bold">{{ price }}đ</span>
                    <del v-if="oldPrice" class="text-gray-500">{{ oldPrice }}đ</del>
                </div>
            </div>
            <div
                class="absolute top-2 right-2 opacity-0 translate-x-11 group-hover:translate-x-0  hover:transition-all duration-300 group-hover:opacity-100  ">
                <div class="flex flex-col gap-2">
                    <button
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <ShoppingCartIcon class="h-5 w-5  text-white" />
                    </button>
                    <button
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <HeartIcon class="h-5 w-5  text-white" />
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ClockIcon, BookOpenIcon, RocketLaunchIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import type { CardCourse } from '@/interfaces/course.interface';

defineProps<CardCourse>();
</script>