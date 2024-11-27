<template>
    <div>
        <Loading :active="loading" :is-full-page="true" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRoute, useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import Loading from 'vue-loading-overlay';
import api from '@/services/axiosConfig';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { state, userData } = authStore;
const loading = ref(true); // Đặt loading là true ban đầu

// Lấy session_id từ route query
const session_id = ref<string | undefined>(route.query.session_id as string | undefined);
onMounted(async () => {
    if (session_id.value) {
        try {
            // Gọi API để xác minh thanh toán
            await api.get('/orders/verify-payment/', {
                params: { session_id: session_id.value },
            });
            ElNotification({
                title: 'Thành công',
                message: 'Thanh toán của bạn thành công',
                type: 'success',
            });
            router.push('/'); // Chuyển hướng đến trang chủ
        } catch (error: any) {
            ElNotification({
                title: 'Thông báo',
                message: 'Thanh toán của bạn chưa giải quyết',
                type: 'warning',
            });
            router.push('/'); // Chuyển hướng đến trang chủ nếu có lỗi
        } finally {
            loading.value = false; // Tắt loading khi kết thúc xử lý
        }
    } else {
        loading.value = false; // Tắt loading nếu không có session_id
    }
});
</script>