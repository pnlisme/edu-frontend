<template>
    <div class="flex flex-col">
        <div class="flex gap-3">
            <div>
                <!-- Use default image if none is provided -->
                <el-avatar :src="image || defaultAvatar" />
            </div>
            <div class="flex flex-col">
                <div class="flex justify-between">
                    <h3 class="font-medium">{{ name }}</h3>
                    <div class="flex gap-2">
                        <PencilSquareIcon @click="openEditDialog" class="h-4 w-4 text-blue-500 cursor-pointer" />
                        <TrashIcon @click="handleDelete" class="h-4 w-4 text-red-500 cursor-pointer" />
                    </div>
                </div>
                <div class="flex gap-2 items-center">
                    <!-- Render stars based on the rate prop -->
                    <div class="flex gap-1">
                        <StarIcon v-for="n in rate" :key="n" class="w-4 h-4 text-yellow-400" />
                    </div>
                    <span class="text-gray-600">{{ created_at }}</span>
                </div>
            </div>
        </div>
        <span class="text-md leading-5">{{ isExpanded ? content : truncatedContent }}</span>
        <button v-if="content.length > maxLength" @click="toggleContent"
            class="flex mt-2 underline cursor-pointer text-indigo-600"> {{ isExpanded ? 'Ẩn bớt' : 'Xem thêm'
            }}</button>
    </div>
    <el-dialog v-model="isEditDialogVisible" title="Chỉnh sửa đánh giá" width="500px" :destroy-on-close="true">
        <el-form :model="editForm" ref="editFormRef" label-width="100px" class="flex flex-col gap-4">
            <el-form-item label="Rating" prop="rating">
                <el-rate v-model="editForm.rating" />
            </el-form-item>
            <el-form-item label="Comment" prop="comment">
                <el-input type="textarea" v-model="editForm.comment" :rows="4" placeholder="Nhập đánh giá của bạn" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="flex justify-end gap-2">
                <el-button @click="closeEditDialog">Hủy</el-button>
                <el-button type="primary" @click="handleUpdate">Cập nhật</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">

import type { CourseComment } from '@/interfaces/ui.interface';
import { useAuthStore } from '@/store/auth';
import { useReviewsStore } from '@/store/review';
import { StarIcon } from '@heroicons/vue/20/solid';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { defineProps, ref, computed } from 'vue'
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const props = defineProps<CourseComment>()


// ẩn, xem thêm
const isExpanded = ref(false)
const isEditDialogVisible = ref(false);
const maxLength = 200
const truncatedContent = computed(() => props.content.slice(0, maxLength) + '...')
const toggleContent = () => {
    isExpanded.value = !isExpanded.value
}
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
    }).format(new Date(date));
};
const editForm = ref<{
    rating: number | string;
    comment: string;
}>({

    rating: props.rate, // Correct property name
    comment: props.content,
});
// References
const editFormRef = ref(null);


// Open edit dialog
const openEditDialog = () => {
    isEditDialogVisible.value = true;
};

// Close edit dialog
const closeEditDialog = () => {
    isEditDialogVisible.value = false;
};

// Handle update review
const reviewsStore = useReviewsStore()
const handleUpdate = async () => {
    await reviewsStore.updateReview(props.course_id, props.id, editForm.value);
    isEditDialogVisible.value = false;
};
const handleDelete = async () => {
    await reviewsStore.deleteReview(props.course_id, props.id)
}
</script>
