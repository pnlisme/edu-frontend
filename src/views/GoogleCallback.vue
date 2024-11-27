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
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { state, userData } = authStore
const loading = ref(false)
onMounted(async () => {
    loading.value = true;
    let token: string | undefined;
    if (Array.isArray(route.params.jwtToken)) {
        token = route.params.jwtToken[0];
    } else {
        token = route.params.jwtToken as string;
    }
    if (token) {
        const success = await authStore.handleGoogleCallback(token);
        await userData()

        if (success) {

            // If login is successful, redirect to home
            router.push('/');
        } else {
            // If there's an error, redirect to login page
            router.push('/login');
        }
    } else {
        // If no token is found in the URL, redirect to login
        router.push('/login');
    }
    loading.value = false;
});
</script>
