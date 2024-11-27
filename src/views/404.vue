<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <!-- Phần tiêu đề lớn -->
        <h1 class="text-9xl font-bold text-red-500 mb-4">404</h1>
        <p class="text-2xl font-semibold text-gray-700 mb-2">Oops! Trang bạn tìm kiếm không tồn tại.</p>
        <p class="text-gray-600 mb-6">Có vẻ bạn đã đi lạc, hãy quay lại trang chủ.</p>

        <!-- Nút quay về trang chủ -->
        <RouterLink to="/"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all">
            Quay về trang chủ
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<style scoped>
/* Kiểu thêm để cải thiện giao diện */
body {
    margin: 0;
    font-family: 'Arial', sans-serif;
}
</style>