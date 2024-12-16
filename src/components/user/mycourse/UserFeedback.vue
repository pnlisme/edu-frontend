<template>
    <div class="mx-20 my-5">
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


        <!-- COMMENT -->
        <div class="mt-5">
            <div class="flex flex-col gap-5">

                <div v-for="(review, index) in listReview" :key="index">
                    <CardCourseComment :user_id="state.user?.id" :user_comment_id="review.user_id"
                        :course_id="review.course_id || 0" :id="review.id || 0" :rate="review.rating || 0"
                        :name="review.user?.last_name || 'Ẩn danh'" :content="review.comment || ''"
                        :image="review.user?.avatar || ''" :created_at="review.created_at || ''" />


                </div>
            </div>
            <div class="flex items-center justify-center mt-5">
                <Button variant="default"> Xem thêm</Button>
            </div>
        </div>
    </div>


    <!-- add cmt -->
    <div class="p-4 border rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Đánh giá của bạn</h2>
        <el-form :model="form" ref="formRef" label-width="100px">
            <el-form-item label="Rating" prop="rating">
                <el-rate v-model="form.rating" />
            </el-form-item>
            <el-form-item label="Comment" prop="comment">
                <el-input type="textarea" v-model="form.comment" :rows="3" placeholder="Viết đánh giá tại đây..." />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitReview">Xác nhận</el-button>
                <el-button @click="resetForm" class="ml-2">Đặt lại</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import CardCourseComment from '@/components/ui/card/CardCourseComment.vue';
import { useAuthStore } from '@/store/auth';
import { useReviewsStore } from '@/store/review';
import { MagnifyingGlassIcon, StarIcon as StarIconSolid, XMarkIcon } from '@heroicons/vue/20/solid';
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)

const { userData } = authStore;
export interface TReview {
    id: number
    user_id: number
    course_id: number
    rating: number
    comment: string
    created_at: string
    status: 'active' | 'inactive'
    user: {
        id: number
        avatar: string
        first_name: string
        last_name: string
    }
}
const props = defineProps<{
    listReview: TReview[]; idCourse: number
}>();

const reviewsStore = useReviewsStore()
const form = ref({
    course_id: props.idCourse,
    rating: 0,
    comment: '',
})
const rules = {
    rating: [{ required: true, message: 'Please provide a rating.', trigger: 'blur' }],
    comment: [{ required: true, message: 'Comment cannot be empty.', trigger: 'blur' }],
};
const submitReview = async () => {
    await reviewsStore.createReview(form.value); // Call the store function
    resetForm();

}
onMounted(async () => {

    try {
        await userData();
    } catch (error) {
        console.error('Error during onMounted:', error);
    }
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
    await reviewsStore.filterReview(props.idCourse, {
        comment: filterKeyword.value,
        rating: filterRating.value,
    });
};
</script>
