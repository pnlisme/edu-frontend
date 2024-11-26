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
                <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                    lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                    level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                    lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                    level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                    lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                    level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                    lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                    level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                    lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                    level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
            </div>
        </main>
        <!-- <EmptyData v-if="Course.length === 0" /> -->
    </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import MyCourses from './MyCourses.vue';
import CardCourse from '@/components/ui/card/CardCourse.vue';


</script>

<style scoped></style>