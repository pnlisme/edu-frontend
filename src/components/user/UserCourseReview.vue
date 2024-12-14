3<template>
    <div>
        <!-- STAR REVIEW -->
        <h3 class="text-xl font-bold">Đánh giá học viên</h3>
        <!-- Fillter rate -->
        <div class="mt-5 flex items-center gap-2">

            <!-- Filter by Keyword -->
            <input type="text" v-model="filterKeyword" placeholder="Tìm kiếm đánh giá..."
                class="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 w-1/2" />

            <!-- Filter by Rating -->
            <select v-model="filterRating" class="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 w-1/4">
                <option value="">Tất cả</option>
                <option v-for="rating in [5, 4, 3, 2, 1]" :key="rating" :value="rating">
                    {{ rating }} sao
                </option>
            </select>

            <!-- Apply Filter -->
            <button class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600" @click="applyFilter">
                Lọc
            </button>
        </div>
        <div class="mt-5">
            <h3 class="text-xl font-bold mb-5">Đánh giá</h3>
            <ul class="flex flex-col gap-5">
                <div v-for="(review, index) in state.listReview" :key="index">
                    <CardCourseCommentDetail :course_id="review.course_id" :id="review.id" :rate="review.rating"
                        :name="review.user.last_name" :content="review.comment" :image="review.user.avatar"
                        :created_at="review.created_at" />


                </div>
            </ul>

        </div>
    </div>
</template>
<script setup lang="ts">
import { StarIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import CardCourseComment from '../ui/card/CardCourseComment.vue';
import Button from '../ui/button/Button.vue';
import CardCourseCommentDetail from '../ui/card/CardCourseCommentDetail.vue';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useReviewsStore } from '@/store/review';
import { storeToRefs } from 'pinia';
const reviewsStore = useReviewsStore()
const { state } = storeToRefs(reviewsStore)
const { fetchReviews } = reviewsStore
const props = defineProps<{
    id: number
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


const form = ref({
    rating: 0,
    comment: '',
})
const filterKeyword = ref(''); // Từ khóa filter
const filterRating = ref<number | ''>(''); // Rating filter
const resetForm = () => {
    form.value.rating = 0;
    form.value.comment = '';
};
const applyFilter = async () => {
    if (!filterKeyword.value.trim() && !filterRating.value) {
        ElMessage.warning('Vui lòng nhập từ khóa hoặc chọn số sao để lọc');
        return;
    }

    // Gọi API với tham số comment và rating
    await reviewsStore.filterReview(props.id, {
        comment: filterKeyword.value,
        rating: filterRating.value,
    });
};
onMounted(() => {
    fetchReviews(props.id)
})
</script>
