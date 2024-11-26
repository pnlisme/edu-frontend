<template>
    <div>
        <Loading :active="loading" :is-full-page="true" />
        <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
            <Input v-model="email" label="Email" type="email" placeholder="Nhập email" :errorMessages="emailError" />
            <Input v-model="password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu"
                :errorMessages="passwordError" />
            <RouterLink class="text-indigo-600 text-end" to="/forgot-pass">Quên mật khẩu</RouterLink>
            <Button class="w-full" variant="primary">Đăng nhập</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useLogin } from '@/composables/user/useLogin';
const { email, emailError,
    passwordError, password, handleSubmit, loading } = useLogin();
</script>