<template>

    <div
        class=" cursor-pointer rounded-lg p-3 bg-white shadow-md hover:shadow-lg hover:transition-all transition-all hover:duration-300 duration-300 group ">
        <div class="relative overflow-hidden">
            <!-- IMAGE  -->
            <div class="rounded-lg overflow-hidden">
                <img @click="navigateToDetail(id)"
                    class="group-hover:scale-105  scale-100 hover:transition-all transition-all hover:duration-300 duration-300 cursor-pointer object-cover w-full h-36"
                    :src="thumbnail" alt="Product Image" />
            </div>
            <!-- BODY  -->
            <div @click="navigateToDetail(id)" class="mt-2 flex flex-col gap-2">
                <div v-if="tag" class="flex justify-between items-center">
                    <span class="text-sm w-32">{{ creator }}</span>
                    <button v-if="tag !== 'none'" :class="tag === 'Mới nhất' ? 'bg-green-400' : 'bg-pink-400'"
                        class="text-sm border rounded-md px-2 py-0.5 text-white">{{ tag }}</button>
                </div>
                <h3 class="text-[16px] font-medium leading-6">{{ title }}</h3>
                <ul class="flex  gap-3">
                    <!-- <li class="flex items-center gap-1">
                        <ClockIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">120 Giờ</span>
                    </li> -->
                    <li class="flex items-center gap-1">
                        <BookOpenIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ lectures_count }} Chương học</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <RocketLaunchIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ level }}</span>
                    </li>
                </ul>

                <div class="flex items-end gap-3">
                    <span class="text-lg text-gray-800 font-bold">{{ formatPrice(current_price) }}</span>
                    <del v-if="old_price" class="text-gray-500">{{ formatPrice(old_price) }}</del>
                </div>
            </div>
            <div
                class="absolute  top-2 right-2 opacity-0 translate-x-11 group-hover:translate-x-0  hover:transition-all duration-300 group-hover:opacity-100  ">
                <div class="flex flex-col gap-2">
                    <button @click="openReviewDialog"
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <EllipsisHorizontalIcon class="h-5 w-5  text-white" />
                    </button>

                </div>
            </div>
        </div>
    </div>

    <!-- Bảng hiển thị bình luận -->
    <el-dialog v-model="reviewDialogVisible" title="Danh sách Bình luận">
        <el-button @click="openReviewDialogDelete">Khôi phục đánh giá</el-button>
        <el-table :data="state.listReview" class="mt-4">
            <el-table-column prop="comment" label="Bình luận" />
            <el-table-column prop="user.last_name" label="Người dùng" />
            <el-table-column prop="status" label="Trạng thái" />
            <el-table-column prop="created_at" label="Ngày tạo" />
            <el-table-column label="Hành động">
                <template #default="{ row }">
                    <el-button @click="handleDelete(row.id)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>


    <el-dialog v-model="deletedCommentsDialogVisible" title="Danh sách bình luận đã xóa">
        <el-table :data="state.listReviewDelete">
            <el-table-column prop="comment" label="Bình luận" />
            <el-table-column prop="user.last_name" label="Người dùng" />
            <el-table-column prop="status" label="Trạng thái" />
            <el-table-column prop="created_at" label="Ngày tạo" />
            <el-table-column label="Hành động">
                <template #default="{ row }">
                    <el-button @click="restoreComment(row.id)">Khôi phục</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue';
import { formatPrice } from '@/utils/formatPrice';
import { BookOpenIcon, RocketLaunchIcon } from "@heroicons/vue/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/vue/20/solid";

import type { TCardCourse } from '@/interfaces/course.interface';
import { useCart } from '@/composables/user/useCart';
import { useRouter } from 'vue-router';
import { useReviewsStore } from '@/store/review';
import { storeToRefs } from 'pinia';

const props = defineProps<TCardCourse>();
const router = useRouter();
const navigateToDetail = (id: number) => {
    router.push({ name: 'user.course.detail', params: { id: String(id) } });
};
const { handleAddToCart } = useCart();
const commentStore = useReviewsStore();
const { state } = storeToRefs(commentStore)
const { fetchReviews,
    createReview,
    updateReview,
    deleteReview,
    restoreReview,
    fetchReviewsDelete } = commentStore
const reviewDialogVisible = ref(false);
const deletedCommentsDialogVisible = ref(false);

// Mở Dialog bình luận
const openReviewDialog = async () => {
    reviewDialogVisible.value = true;
    // Fetch bình luận của khóa học ngay khi mở dialog
    await fetchReviews(props.id);
};
const openReviewDialogDelete = async () => {
    deletedCommentsDialogVisible.value = true;
    // Fetch bình luận của khóa học ngay khi mở dialog
    await fetchReviewsDelete(props.id);
};
const handleDelete = (commentId: number) => {
    deleteReview(props.id, commentId);
    reviewDialogVisible.value = false
};
const restoreComment = (commentId: number) => {
    restoreReview(props.id, commentId)
    deletedCommentsDialogVisible.value = false;
}
</script>