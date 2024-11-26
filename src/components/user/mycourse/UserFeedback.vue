<template>
    <div class="mx-20 my-5">
        <h3 class="text-xl font-bold">Đánh giá học viên</h3>
        <!-- Fillter rate -->
        <div class="flex gap-5 items-center mt-5">
            <div class="flex  flex-col items-center gap-1">
                <h3 class="text-6xl font-bold text-yellow-400 ">4.7</h3>
                <div class="flex items-center">
                    <StarIconSolid class="h-5 w-5 text-yellow-400" />
                    <StarIconSolid class="h-5 w-5 text-yellow-400" />
                    <StarIconSolid class="h-5 w-5 text-yellow-400" />
                    <StarIconSolid class="h-5 w-5 text-yellow-400" />
                    <StarIconSolid class="h-5 w-5 text-yellow-400" />
                </div>
                <span class="font-medium text-lg">Đánh giá khóa học</span>
            </div>
            <!-- <StarIconSolid class="text-yellow-400" /> -->
            <div class="flex">
                <ul>
                    <li class="flex cursor-pointer gap-1 items-center">
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <span class="text-indigo-600">75%</span>
                        <button>
                            <XMarkIcon class="h-4 w-4" />
                        </button>
                    </li>
                    <li class="flex cursor-pointer gap-1 items-center">
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconOutline class="w-4 h-4 text-yellow-400" />
                        <span class="text-indigo-600">60%</span>
                    </li>
                    <li class="flex cursor-pointer gap-1 items-center">
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconOutline class="w-4 h-4 text-yellow-400" />

                        <StarIconOutline class="w-4 h-4 text-yellow-400" />

                        <span class="text-indigo-600">50%</span>
                    </li>
                    <li class="flex cursor-pointer gap-1 items-center">
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconSolid class="w-4 h-4 text-yellow-400" />
                        <StarIconOutline class="w-4 h-4 text-yellow-400" />

                        <StarIconOutline class="w-4 h-4 text-yellow-400" />

                        <StarIconOutline class="w-4 h-4 text-yellow-400" />
                        <span class="text-indigo-600">40%</span>
                    </li>
                </ul>
            </div>
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
import Button from '@/components/ui/button/Button.vue';
import CardCourseComment from '@/components/ui/card/CardCourseComment.vue';
import { MagnifyingGlassIcon, StarIcon as StarIconSolid } from '@heroicons/vue/20/solid';
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';

</script>

<style scoped></style>