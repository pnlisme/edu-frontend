3<template>
    <div>
        <!-- STAR REVIEW -->
        <div class="flex flex-col gap-5">
            <div class="flex items-end gap-3">
                <StarIcon class="h-10 w-10 text-yellow-400" />
                <h3 class="text-2xl font-bold">{{ averageRating }} xếp hạng khóa học - {{ totalReviews
                    }} xếp hạng</h3>
            </div>
            <ul>
                <li v-for="star in 5" :key="star" class="flex cursor-pointer gap-1 items-center">
                    <!-- Hiển thị sao -->
                    <div class="flex gap-1">
                        <StarIcon v-for="n in star" :key="n" class="w-4 h-4 text-yellow-400" />
                    </div>
                    <!-- Phần trăm đánh giá -->
                    <span class="text-indigo-600">
                        {{ ratingPercentages[star] || 0 }}%
                    </span>
                    <!-- <button>
                        <XMarkIcon class="h-4 w-4" />
                    </button> -->
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
        <!-- <div class="mt-5">
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
        </div> -->
        <div class="mt-5">
            <h3 class="text-xl font-bold">Đánh giá</h3>
            <ul>
                <li v-for="(review, index) in reviews" :key="index" class="my-2">
                    <CardCourseComment :image="review.user_avatar" :rate="review.rating" :name="review.user_name"
                        :content="review.comment" :time="review.time_diff" />
                </li>
            </ul>

        </div>
    </div>
</template>
<script setup lang="ts">
import { StarIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import CardCourseComment from '../ui/card/CardCourseComment.vue';
import Button from '../ui/button/Button.vue';
defineProps<{
    reviews: Array<{
        user_avatar: string;
        user_name: string;
        comment: string;
        rating: number;
        time_diff: string;
    }>;
    totalReviews: number;
    averageRating: number;
    ratingPercentages: Record<number, number>;
}>();

</script>

<style scoped></style>