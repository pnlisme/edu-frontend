<template>
    <div class="mb-20 p-4">
        <div class="">
            <SecurityFrom v-if="dataUser" :dataUser="dataUser" @update-success="handleUpdateSuccess" />
        </div>
    </div>
</template>

<script setup lang="ts">
import SecurityFrom from '@/components/auth/SecurityFrom.vue';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore()
const dataUser = authStore.state.user;
const handleUpdateSuccess = async () => {
    await authStore.userData(); // Tải lại dữ liệu user khi cập nhật thành công
};
</script>
