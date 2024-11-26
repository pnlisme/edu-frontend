<template>
    <div class="mb-20">
        <main>
            <div class="flex justify-end my-5">
                <form action="" class="border-2 border-gray-900 rounded-full items-center flex gap-2 py-1 px-2">
                    <button type="submit" class="flex items-center justify-center">
                        <MagnifyingGlassIcon class="h-6 w-6 text-gray-900" />
                    </button>
                    <input class="focus-visible:outline-none" type="text" name="" id="" placeholder="Tìm kiếm khóa học">
                </form>
            </div>
            <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <CardMyCourse v-for="(item, index) in myCourses" :key="index" :image="item.image" :name="item.name"
                    :lecture="item.lecture" :completed="item.completed" :total="item.total" />
            </div>
        </main>
        <EmptyData v-if="myCourses.length === 0" />
    </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

import CardMyCourse from '@/components/ui/card/CardMyCourse.vue';
import EmptyData from '@/components/ui/empty/EmptyData.vue';
const myCourses = [
    {
        image: 'https://demo.creativeitem.com/academy-laravel/public/uploads/course-thumbnail/-1718521903.jpg',
        name: 'Khóa học Lập trình JavaScript',
        lecture: 'Giảng viên A',
        completed: 68,
        total: 100,
    },
    {
        image: 'https://demo.creativeitem.com/academy-laravel/public/uploads/course-thumbnail/-1718521903.jpg',
        name: 'Khóa học Lập trình JavaScript',
        lecture: 'Giảng viên A',
        completed: 68,
        total: 100,
    },
    {
        image: 'https://demo.creativeitem.com/academy-laravel/public/uploads/course-thumbnail/-1718521903.jpg',
        name: 'Khóa học Lập trình JavaScript',
        lecture: 'Giảng viên A',
        completed: 68,
        total: 100,
    },
];
</script>
