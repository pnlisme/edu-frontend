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

                <div v-for="(review, index) in listReview" :key="index">
                    <CardCourseComment :rate="review.rating" :name="review.user.last_name" :content="review.comment"
                        :image="review.user.avatar" :created_at="review.created_at" />

                    <!-- <h2>{{ review.comment }}</h2> -->
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
import { useReviewsStore } from '@/store/review';
import { MagnifyingGlassIcon, StarIcon as StarIconSolid, XMarkIcon } from '@heroicons/vue/20/solid';
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
export interface TReview {
    id: number
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
    course_id: props.idCourse, // Replace with dynamic course ID
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

const resetForm = () => {
    form.value.rating = 0;
    form.value.comment = '';
};
</script>
