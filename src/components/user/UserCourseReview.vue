<template>
    <div>
        <!-- STAR REVIEW -->
        <div class="flex flex-col gap-5">
            <div class="flex items-end gap-3">
                <StarIcon class="h-10 w-10 text-yellow-400" />
                <h3 class="text-2xl font-bold">4,7 xếp hạng khóa học - 320K xếp hạng</h3>
            </div>
            <ul>
                <li class="flex cursor-pointer gap-1 items-center">
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <span class="text-indigo-600">75%</span>
                    <button>
                        <XMarkIcon class="h-4 w-4" />
                    </button>
                </li>
                <li class="flex cursor-pointer gap-1 items-center">
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <span class="text-indigo-600">60%</span>
                </li>
                <li class="flex cursor-pointer gap-1 items-center">
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <span class="text-indigo-600">50%</span>
                </li>
                <li class="flex cursor-pointer gap-1 items-center">
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <StarIcon class="w-4 h-4 text-yellow-400" />
                    <span class="text-indigo-600">40%</span>
                </li>
            </ul>
        </div>
        <!-- SEARCH -->
        <div class="mt-5 flex items-center border-gray-900 border w-2/3 justify-between p-1">
            <input type="text" class="focus-visible:outline-none w-2/3">
            <button class="px-2">
                <MagnifyingGlassIcon class="h-5 w-5" />
            </button>
        </div>
        <!-- COMMENT -->
        <div class="mt-5">
            <div class="flex flex-col gap-5">
                <CardCourseComment :rate=4 name="Hoang thong" content="I can't thank you enough, Dr. Angela Yu, for this incredible
            course!
            Despite being an
            online course, it has guided me to a solid level of Python programming knowledge. Your
            lessons are not only informative but also challenging, pushing me closer to my career
            goals." />
                <CardCourseComment :rate=4 name="Hoang thong" content="I can't thank you enough, Dr. Angela Yu, for this incredible
            course!
            Despite being an
            online course, it has guided me to a solid level of Python programming knowledge. Your
            lessons are not only informative but also challenging, pushing me closer to my career
            goals." />
                <CardCourseComment :rate=4 name="Hoang thong" content="I can't thank you enough, Dr. Angela Yu, for this incredible
            course!
            Despite being an
            online course, it has guided me to a solid level of Python programming knowledge. Your
            lessons are not only informative but also challenging, pushing me closer to my career
            goals." />
            </div>
            <div class="flex items-center justify-center mt-5">
                <Button class="" variant="default"> Xem thêm</Button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { StarIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import CardCourseComment from '../ui/card/CardCourseComment.vue';
import Button from '../ui/button/Button.vue';


</script>

<style scoped></style>