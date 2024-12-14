<template>
    <div v-if="course" class="container-user py-16">
        <Breadcrumb />
        <div class="flex flex-col-reverse lg:flex-row gap-5 my-16">
            <!-- Main Content -->
            <div class="lg:w-4/6 w-full">
                <div>
                    <h3 class="text-2xl font-medium">{{ course.title }}</h3>
                    <div class="flex gap-3 mt-2 items-center">
                        <span>Được tạo bởi: <span class="font-medium">{{ course.creator }}</span></span>
                        <div class="flex items-center gap-1">
                            <StarIcon class="text-yellow-500 h-4 w-4" />
                            <span class="font-medium">{{ course.average_rating }}</span>
                            <span>({{ course.total_reviews }} đánh giá)</span>
                        </div>
                    </div>
                </div>

                <div @click="outerVisible = true" class="relative  rounded-3xl overflow-hidden mt-5">
                    <img class="object-cover brightness-75 w-full h-[480px]" :src="course.thumbnail" alt="">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <div class=" group-hover:scale-110 animation p-5 bg-white rounded-full cursor-pointer">
                            <PlayIcon class="   h-8 w-8 text-gray-900" />
                        </div>
                    </div>
                </div>
                <el-tabs v-model="activeTab" class="mt-5">
                    <el-tab-pane label="Mô tả" name="description">
                        <UserCourseDescribe :contents="course.course_contents || ''" />
                    </el-tab-pane>
                    <el-tab-pane label="Khóa học" name="course">
                        <UserCourseOption :contents="course.course_contents || ''" />
                    </el-tab-pane>
                    <el-tab-pane label="Đánh giá" name="reviews">
                        <UserCourseReview :id="course.id" :reviews="course.reviews.review_list"
                            :totalReviews="course.reviews.total_reviews" :averageRating="course.reviews.average_rating"
                            :ratingPercentages="course.reviews.rating_percentages"
                            :created_at="course.reviews.created_at" />
                    </el-tab-pane>
                    <el-tab-pane label="Giảng viên" name="lecturer">
                        <UserCourseLecturer :rate="course.instructor.average_rating"
                            :review="course.instructor.total_reviews" :students="course.instructor.students_count"
                            :course="course.instructor.courses_count" :name="course.creator" :job="'Giảng viên'"
                            :image="course.instructor.info.avatar"
                            :introduce="course.instructor.info.biography || 'Chưa có mô tả'" />
                    </el-tab-pane>
                </el-tabs>
                <div class="mt-5 flex flex-col gap-5 p-1 ">
                    <h3 class="text-2xl font-bold">Các khóa học khác của <span class="text-indigo-600">{{ course.creator
                            }}</span> </h3>
                    <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-5 w-full">
                        <CardCourse v-for="course in course.order_course_of_instructor" :key="course.id" :id="course.id"
                            :title="course.title"
                            :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                            :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                            :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />
                    </div>
                </div>
            </div>
            <!-- Sidebar -->
            <div class="lg:w-2/6 w-full">
                <div class="p-5 sticky top-0 shadow-lg rounded-lg">
                    <div class="flex flex-col gap-3">
                        <div class="flex items-end gap-3">
                            <div class="text-2xl font-bold">{{ formatPrice(course.current_price) }}</div>
                            <del v-if="course.old_price" class="text-lg text-gray-400">{{
                                formatPrice(course.old_price)
                                }}</del>
                        </div>
                        <div class="w-1/3">

                            <div v-if="course.sale_value"
                                class="bg-pink-500 text-white font-medium p-1 rounded-md text-center">
                                Giảm {{ course.sale_value }}%
                            </div>
                        </div>
                        <div class="" @click="handleAddToCart(course.id)">

                            <Button class="w-full" variant="primary">Thêm vào giỏ hàng</Button>
                        </div>
                        <Button class="w-full" variant="default">Mua ngay</Button>
                        <div>
                            <h3 class="font-medium">Khóa học này bao gồm</h3>
                            <ul class="flex flex-col gap-2 mt-3">
                                <li class="flex items-center gap-2">
                                    <ClipboardDocumentListIcon class="h-5 w-5 text-gray-500" />
                                    {{ course.sections_count }} phần
                                </li>
                                <li class="flex items-center gap-2">
                                    <PlayCircleIcon class="h-5 w-5 text-gray-500" />
                                    {{ course.lectures_count }} bài giảng
                                </li>
                                <li class="flex items-center gap-2">
                                    <ClockIcon class="h-5 w-5 text-gray-500" />
                                    {{ course.total_duration }}
                                </li>
                                <li class="flex items-center gap-2">
                                    <SpeakerWaveIcon class="h-5 w-5 text-gray-500" />
                                    {{ course.language }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="outerVisible" class="!bg-gray-900  !rounded-lg " width="600">
        <div class="flex flex-col gap-3">
            <span class="text-white text-lg">Xem trước khóa học</span>
            <h3 class="text-white text-xl font-medium">{{ course.title }}</h3>
        </div>
        <div class="mt-5 flex flex-col gap-5">
            <div class="rounded-lg overflow-hidden  h-[400px]">
                <vue-plyr>
                    <video ref="videoElement">
                        <source :src="currentVideoLink" type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                </vue-plyr>
            </div>
            <h3 class="text-lg font-medium text-white">Video mẫu miễn phí </h3>
            <!-- <ul class="flex flex-col">
                <VideoFreeItem image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg" title="Giới thiệu"
                    duration="03:57" :isActive="true" />
                <VideoFreeItem image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg" title="Giới thiệu"
                    duration="03:57" :isActive="false" />
            </ul> -->
            <div class="mt-5 flex flex-col gap-5">
                <ul>
                    <li v-for="(video, index) in course.preview_videos" :key="index" @click="setActiveVideo(index)"
                        :class="['cursor-pointer flex justify-between items-center p-3', activeVideoIndex === index ? 'bg-gray-600' : '']">
                        <div class="flex items-center gap-3">
                            <img class="w-50 h-12 rounded-md" :src="course.thumbnail" alt="Video Thumbnail">
                            <PlayCircleIcon class="h-6 w-6 text-white" />
                            <span class="text-white">{{ video.title }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue';
import Button from '@/components/ui/button/Button.vue';
import UserCourseDescribe from '@/components/user/UserCourseDescribe.vue';
import UserCourseLecturer from '@/components/user/UserCourseLecturer.vue';
import UserCourseOption from '@/components/user/UserCourseOption.vue';
import UserCourseReview from '@/components/user/UserCourseReview.vue';
import { useCourseStore } from '@/store/course';
import { formatPrice } from '@/utils/formatPrice';
import { ClipboardDocumentListIcon, ClockIcon, PlayCircleIcon, SpeakerWaveIcon, StarIcon, PlayIcon } from '@heroicons/vue/20/solid';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import CardCourse from '@/components/ui/card/CardCourse.vue';
import { useCart } from '@/composables/user/useCart';
import VideoCourse from '@/components/ui/video/VideoCourse.vue';
import VideoFreeItem from '@/components/ui/video/VideoFreeItem.vue';
const activeTab = ref('description');
const outerVisible = ref(false);
const route = useRoute();
const id = route.params.id ? String(route.params.id) : null;
const activeVideoIndex = ref(0); // Video đầu tiên mặc định được chọn

// Lấy thông tin video hiện tại dựa trên chỉ số
const currentVideoLink = computed(() => {
    return course.value.preview_videos[activeVideoIndex.value]?.content_link || '';
});

// Đổi video đang active
const setActiveVideo = (index: number) => {
    activeVideoIndex.value = index;
};
const courseStore = useCourseStore();
const { course } = storeToRefs(courseStore);
const { handleAddToCart } = useCart();
onMounted(() => {
    if (id) {
        courseStore.fetchCourseDetail(id);
    }
});
</script>
