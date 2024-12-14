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
            ElMessage.error('Thanh toán thất bại');
        } else if (status === 'success') {
            ElMessage.success('Thanh toán  thành công!');
        }

        // Mô phỏng thời gian xử lý (có thể loại bỏ nếu không cần thiết)
    } finally {
        // Kết thúc loading và chuyển hướng
        isLoading.value = false;
        router.push('/admin/payment');
    }
});
</script>
