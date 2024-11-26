<script setup lang="ts">
import CardCourse from '@/components/ui/card/CardCourse.vue';
import UserCourseFilter from '@/components/user/UserCourseFilter.vue';
import UserHero2 from '@/components/user/UserHero2.vue';
import UserNewsLetter from '@/components/user/UserNewsLetter.vue';
import { UsersIcon, FunnelIcon } from "@heroicons/vue/24/outline";
import { ref } from 'vue';
const fillter = ref(false)
</script>

<template>
    <main class="py-16">
        <!-- PRODUCT FILTER-->
        <section class="container-user mt-5">
            <div class="flex flex-col gap-3">
                <h1 class="text-4xl font-semibold">Các khóa học về <span class="text-indigo-600">khoa học máy
                        tính</span></h1>
                <div class="flex gap-3">
                    <UsersIcon class="h-6 w-6 text-gray-900" />
                    <span class="text-sm">2853852 người học</span>
                </div>
            </div>
            <div class="mt-5">
                <h3 class=" font-semibold text-2xl">Các khóa học giúp bạn bắt đầu</h3>
                <span>Khám phá các khóa học từ các chuyên gia giàu kinh nghiệm thực tế.</span>
                <!-- FILTER -->
                <div class="mt-5">

                    <ul class="sm:flex gap-3 hidden ">
                        <li class="text-lg font-medium p-2  border-indigo-600 border-b-4 text-indigo-600">Phổ biến
                        </li>
                        <li
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 cursor-pointer animation text-gray-500">
                            Mới</li>
                        <li
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 cursor-pointer animation text-gray-500">
                            Hàng đầu</li>
                        <li
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 cursor-pointer animation text-gray-500">
                            Yêu thích nhất</li>


                    </ul>
                    <div class="flex">
                        <RouterLink to="/course" class="sm:hidden block ">
                            <div class="px-3 py-3 flex items-center justify-center rounded-lg bg-indigo-600">
                                <FunnelIcon class="h-5  font-semibold w-5 text-white " />
                            </div>
                        </RouterLink>
                    </div>
                    <h3 class="mt-5 font-semibold text-2xl">
                        Giúp bạn có thêm cơ hội nghề nghiệp với Thiết kế đồ họa
                    </h3>
                </div>
                <div class="mt-5 gap-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
                    <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                        lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                        level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                    <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                        lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                        level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                </div>
            </div>
        </section>
        <!-- COURSE MAIN -->
        <section class="container-user my-16">
            <div class="flex flex-col gap-3">
                <h1 class="text-4xl font-semibold">Tất cả khóa học về <span class="text-indigo-600">khoa học máy
                        tính</span></h1>
            </div>

            <!-- MAIN -->
            <div class="flex flex-col md:flex-row mt-10 gap-5">

                <!-- FILTER  -->
                <div class=" ">
                    <div class="md:w-72 w-full sticky top-0 shadow-md rounded-md p-3 flex flex-col gap-5">
                        <div class="flex items-center justify-between">
                            <div class="md:hidden block">
                                <div @click="fillter = true" class="  cursor-pointer bg-indigo-600 rounded-md p-2">
                                    <FunnelIcon class="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <span class="text-indigo-600 font-medium">Clear filters</span>
                        </div>

                        <div class="hidden md:block">

                            <UserCourseFilter />
                        </div>

                    </div>
                </div>
                <el-drawer direction="ltr" v-model="fillter" title="I am the title" :with-header="false" size="50%">
                    <UserCourseFilter />
                </el-drawer>

                <!-- RESUILT -->
                <div class="">
                    <h3 class="text-lg">Hiển thị <span class="font-medium">2.312</span> kết quả của <span
                            class="font-medium">Khoa học máy tính</span>
                    </h3>
                    <div class="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-2  gap-5 mt-5">
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                    </div>
                    <div class=" mt-10  flex justify-center">

                        <el-pagination size="medium" background layout="prev, pager, next" :total="1000" />
                    </div>
                </div>
            </div>
        </section>
        <UserNewsLetter />
    </main>
</template>

<style scoped></style>