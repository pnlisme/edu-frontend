<template>
    <el-button type="info" plain @click="goBack">
        <ChevronLeftIcon class="h-4 w-4 text-gray-500 " />

        Quay lại
    </el-button>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { useRoute, useRouter } from 'vue-router';
import { historyStack } from '@/router';

const router = useRouter();
const route = useRoute();

// const goBack = () => {
//     const previousURL = localStorage.getItem('previousURL');
//     if (previousURL) {
//         router.push(previousURL); // Điều hướng về URL trước đó
//     } else {
//         router.push('/'); // Mặc định điều hướng về trang chủ nếu không có URL trước đó
//     }
// };
const goBack = () => {
    if (historyStack.length > 1) {
        historyStack.pop(); // Xóa URL hiện tại khỏi stack
        const previousURL = historyStack.pop(); // Lấy URL trước đó
        router.push(previousURL || '/'); // Điều hướng về URL trước đó hoặc mặc định
    } else {
        router.push('/'); // Nếu không còn lịch sử, quay lại trang chủ
    }
};
</script>

<style scoped></style>