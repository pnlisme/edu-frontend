<template>
    <div class="mb-20 p-4">
        <main>
            <UpdateProfileFrom v-if="dataUser" :dataUser="dataUser" @update-success="handleUpdateSuccess" />
        </main>
    </div>
</template>

<script setup lang="ts">
import UpdateProfileFrom from '@/components/auth/UpdateProfileFrom.vue';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const language = ref('vi')
const authStore = useAuthStore()
const dataUser = authStore.state.user;
const handleUpdateSuccess = async () => {
    await authStore.userData(); // Tải lại dữ liệu user khi cập nhật thành công
};
</script>

<style scoped></style>