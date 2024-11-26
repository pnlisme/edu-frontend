<!-- <div v-if="course">
    <h1>{{ course.title }}</h1>
    <p>{{ course.description }}</p>
</div>
<div v-else>
    <p>Loading...</p>
</div>  -->
<template>
    <main class="container-user py-16">
        <div class="">
            <Breadcrumb />
        </div>
        <div class="flex  flex-col-reverse lg:flex-row gap-5 my-16">
            <!-- DETAIL COURSE -->
            <div class="lg:w-4/6 w-full">
                <div class="flex cursor-pointer group flex-col  gap-5">
                    <div class="flex flex-col gap-5">
                        <!-- INFO -->
                        <div class="">

                            <h3 class="text-2xl font-medium">Learn Figma - UI/UX Design Essential Training</h3>
                            <div class="flex gap-3 mt-2 items-start md:items-center md:flex-row flex-col">
                                <span class="text-[16px]">Được tạo bởi: <span class="font-medium">Nguyễn Hoàng
                                        Thông</span></span>
                                <div class="flex gap-1  items-center">
                                    <div class="flex gap-1 items-center">
                                        <StarIcon class="text-yellow-500 h-4 w-4" />
                                        <span class="font-medium"> 4.8</span>
                                    </div>
                                    <span>(1,812 đánh giá)</span>
                                </div>
                            </div>
                        </div>
                        <!-- VIDEO BANNER -->
                        <div @click="outerVisible = true" class="relative  rounded-3xl overflow-hidden">
                            <img class="object-cover brightness-75 w-full h-[480px]"
                                src="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg" alt="">
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                <div class=" group-hover:scale-110 animation p-5 bg-white rounded-full cursor-pointer">
                                    <PlayIcon class="   h-8 w-8 text-gray-900" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- DETAIL INFO -->
                <el-tabs v-model="activeName" class="demo-tabs mt-5" @tab-click="handleClick">
                    <el-tab-pane label="Mô tả" name="first">
                        <UserCourseDescribe />
                    </el-tab-pane>
                    <el-tab-pane label="Khóa học" name="second">
                        <UserCourseOption />

                    </el-tab-pane>
                    <el-tab-pane label="Đánh giá" name="third">
                        <UserCourseReview />
                    </el-tab-pane>
                    <el-tab-pane label="Giảng viên" name="fourth">
                        <UserCourseLecturer :rate=4.8 :review=870289 :students=2853852 :course=7
                            name="Nguyen Hoang Thong" job="Developer and Lead Instructor"
                            image="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" introduce=" I'm Angela, I'm a developer with a passion for teaching. I'm thelead instructorat the London App
                    Brewery, London's leadingProgramming Bootcamp. I've helped hundreds of thousands of students learn
                    to
                    code and change their lives by becoming a developer. I've been invited by companies such as Twitter,
                    Facebook and Google to teach their employees.
                    I'm Angela, I'm a developer with a passion for teaching. I'm thelead instructorat the London App
                    Brewery, London's leadingProgramming Bootcamp. I've helped hundreds of thousands of students learn
                    to
                    code and change their lives by becoming a developer. I've been invited by companies such as Twitter,
                    Facebook and Google to teach their employees.
                    I'm Angela, I'm a developer with a passion for teaching. I'm thelead instructorat the London App
                    Brewery, London's leadingProgramming Bootcamp. I've helped hundreds of thousands of students learn
                    to
                    code and change their lives by becoming a developer. I've been invited by companies such as Twitter,
                    Facebook and Google to teach their employees." />
                    </el-tab-pane>
                </el-tabs>
                <!-- VIDEO RELATE TO -->
                <div class="mt-5 flex flex-col gap-5 p-1 ">
                    <h3 class="text-2xl font-bold">Các khóa học khác của <span class="text-indigo-600">Nguyen
                            Hoang
                            Thong</span> </h3>
                    <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-5 w-full">
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                        <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                            lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training"
                            lessons="12" level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                    </div>
                </div>
            </div>
            <!-- CHECKOUT COURSE -->
            <div class="lg:w-2/6 w-full">
                <div class="p-5 sticky top-0 shadow-lg rounded-lg">
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-3">
                            <div class="flex items-end gap-3">
                                <div class="text-2xl font-bold">788.000 vnđ</div>
                                <del class="text-lg text-gray-400">999.999 vnđ</del>
                            </div>
                            <div class="bg-pink-500 text-white font-medium p-1 rounded-md w-24 flex justify-center">Giảm
                                20%</div>
                        </div>
                        <div class="flex gap-3">
                            <Button class="w-4/5" variant="primary">Thanh toán</Button>

                            <div class="w-1/5 group hover:bg-indigo-100 animation  border-indigo-600 cursor-pointer border rounded-lg justify-center flex items-center"
                                variant="default">
                                <HeartIcon class="h-8 w-8 text-indigo-600" />
                            </div>
                        </div>
                        <Button class="w-full" variant="default">Mua ngay</Button>

                        <div class="">
                            <h3 class="font-medium">Khóa học này bao gồm</h3>
                            <ul class="flex flex-col gap-2 mt-3">
                                <li class="flex items-center gap-2">
                                    <ClipboardDocumentListIcon class="h-5 w-5 text-gray-500" />
                                    22 phần
                                </li>
                                <li class="flex items-center gap-2">

                                    <PlayCircleIcon class="h-5 w-5 text-gray-500" />
                                    152 bài giảng
                                </li>
                                <li class="flex items-center gap-2">
                                    <ClockIcon class="h-5 w-5 text-gray-500" />
                                    52 giờ video theo yêu cầu
                                </li>
                                <li class="flex items-center gap-2">

                                    <SpeakerWaveIcon class="h-5 w-5 text-gray-500" />
                                    English
                                </li>
                                <li class="flex items-center gap-2">
                                    <ComputerDesktopIcon class="h-6 w-6 text-gray-500" />
                                    Giấy chứng nhận hoàn thành
                                </li>
                            </ul>
                            <div class="flex gap-5 mt-5">
                                <div class="flex gap-2  cursor-pointer" @click="share = true">
                                    <ShareIcon class="h-6 w-6 text-gray-900" />
                                    Chia sẻ
                                </div>
                                <div class="flex gap-2">
                                    <GiftIcon class="h-6 w-6 text-gray-900" />
                                    Tặng khóa học
                                </div>
                            </div>

                        </div>



                        <div class="flex flex-col gap-3">
                            <h3 class="text-lg">Áp dụng mã giảm giá</h3>
                            <div class="border-2  border-gray-900 flex justify-between">
                                <input type="text" class="px-3 w-[11rem] py-2 focus-visible:outline-none"
                                    placeholder="Nhập phiếu giảm giá">
                                <button class="h-full bg-gray-900 px-5 py-2 text-white">Áp dụng</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main>
    <UserNewsLetter class="mb-16" />
    <!-- VIDEO DETAIl -->
    <el-dialog v-model="outerVisible" class="!bg-gray-900  !rounded-lg " width="600">
        <div class="flex flex-col gap-3">
            <span class="text-white text-lg">Xem trước khóa học</span>
            <h3 class="text-white text-xl font-medium">Learn Figma - UI/UX Design Essential Training</h3>
        </div>
        <div class="mt-5 flex flex-col gap-5">
            <div class="rounded-lg overflow-hidden">
                <!-- VIDEO -->
                <VideoCourse src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" />
            </div>
            <h3 class="text-lg font-medium text-white">Video mẫu miễn phí </h3>
            <ul class="flex flex-col">
                <!-- VIDEO ITEM -->
                <VideoFreeItem image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg" title="Giới thiệu"
                    duration="03:57" :isActive="true" />
                <VideoFreeItem image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg" title="Giới thiệu"
                    duration="03:57" :isActive="false" />
            </ul>
        </div>
    </el-dialog>

    <!-- SHARE -->
    <el-dialog v-model="share" title="Chia sẻ khóa học này" width="500" align-center>
        <div class="">
            <el-input v-model="hardcodedText" placeholder="Hardcoded Text" class="w-full mb-4" readonly></el-input>

            <!-- Button to copy the text -->
            <Button variant="default" class="!p-1 !rounded-sm" @click="copyText">
                Copy Link
            </Button>
        </div>

    </el-dialog>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue';
import Button from '@/components/ui/button/Button.vue';
import VideoCourse from '@/components/ui/video/VideoCourse.vue';
import VideoFreeItem from '@/components/ui/video/VideoFreeItem.vue';
import { PlayIcon, StarIcon, PlayCircleIcon, ClipboardDocumentListIcon, ClockIcon, SpeakerWaveIcon, ComputerDesktopIcon, ShareIcon, GiftIcon } from '@heroicons/vue/20/solid';
import { HeartIcon, ListBulletIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue'
const outerVisible = ref(false)
const share = ref(false)
import { ElNotification, type TabsPaneContext } from 'element-plus'
import UserCourseDescribe from '@/components/user/UserCourseDescribe.vue';
import CardCourse from '@/components/ui/card/CardCourse.vue';
import UserNewsLetter from '@/components/user/UserNewsLetter.vue';
import UserCourseReview from '@/components/user/UserCourseReview.vue';
import UserCourseLecturer from '@/components/user/UserCourseLecturer.vue';
import UserCourseOption from '@/components/user/UserCourseOption.vue';
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
// import { onMounted, ref } from 'vue';
// import { useRoute } from 'vue-router';
// // import { fetchCourseDetail } from '@/services/courseService'; // Đảm bảo bạn đã tạo file này

// const course = ref<any>(null);
// const route = useRoute();

// onMounted(async () => {
//     const courseId = route.params.id as string; // Đảm bảo rằng courseId là chuỗi
//     course.value = await fetchCourseDetail(courseId);
// });
// Hardcoded text that we want to copy
const hardcodedText = ref('https://hoangthong.asia/');

// State to check if the text has been copied

// Function to copy the text
const copyText = () => {
    // Create a temporary textarea to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = hardcodedText.value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    ElNotification({
        title: 'Thành công',
        message: 'Bạn đã copy đường dẫn',
        type: 'success',
    })

};
</script>
