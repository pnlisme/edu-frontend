<template>
    <div>
        <!-- Overlay loading -->
        <loading :active="isLoading" :is-full-page="true" />
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { ref, onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const isLoading = ref(true); // Trạng thái loading

onMounted(async () => {
    const status = route.params.status;

    try {
        if (status === 'fail') {
            ElMessage.error('Cập nhật thông tin.');
        } else if (status === 'success') {
            ElMessage.success('Cập nhật thành công!');
        }

        // Mô phỏng thời gian xử lý (có thể loại bỏ nếu không cần thiết)
    } finally {
        // Kết thúc loading và chuyển hướng
        isLoading.value = false;
        router.push('/teacher/payment-method');
    }
});
</script>
