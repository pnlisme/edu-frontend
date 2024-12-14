<template>
    <div class="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg border border-gray-200">
        <!-- Header Section -->
        <div class="text-center mb-10">
            <img :src="logo" alt="Logo" class="mx-auto mb-6 w-24 h-24 object-contain">
            <h1 class="text-4xl font-bold text-gray-800 mb-2 uppercase">Chứng chỉ hoàn thành</h1>
            <p class="text-lg text-gray-600">Khóa học học viên</p>
        </div>

        <!-- Main Content -->
        <div class="text-center mb-12">
            <p class="text-2xl font-medium text-gray-800 mb-6">Chúng tôi xin chứng nhận rằng</p>
            <h2 class="text-4xl font-bold text-gray-800 my-4 uppercase">{{ state.user?.last_name }}</h2>
            <p class="text-xl text-gray-700 mb-6">
                Đã hoàn thành khóa học <span class="font-semibold italic">{{ courseName }}</span>
            </p>
            <p class="text-lg text-gray-600 mb-6">Với kết quả xuất sắc trong quá trình học tập và rèn luyện</p>
            <div class="flex justify-center items-center gap-4">
                <div class="border-t-2 border-gray-400 w-1/4"></div>
                <p class="text-lg text-gray-600">Ngày cấp: {{ issueDate }}</p>
                <div class="border-t-2 border-gray-400 w-1/4"></div>
            </div>
        </div>

        <!-- Footer Section -->
        <div class="flex justify-between items-center mt-8">
            <!-- Instructor Signature -->
            <div class="text-center">
                <p class="text-gray-700 text-lg font-medium">Giảng viên</p>
                <p class="text-gray-800 font-bold">{{ instructorName }}</p>
            </div>

            <!-- Verification Seal -->
            <div class="text-center">
                <p class="text-gray-700 text-lg font-medium">Chữ ký</p>
                <p class="text-xl font-bold text-gray-800 italic">_______________</p>
                <p class="text-gray-600 text-sm mt-1">Dấu xác nhận</p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import logo from '../../assets/images/logo1.svg';
import logo2 from '../../assets/images/logo2.svg';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const { userData } = authStore;
interface TCertificate {
    courseName: string
    issueDate: Date
    instructorName: string
}
const props = defineProps<TCertificate>()
</script>
