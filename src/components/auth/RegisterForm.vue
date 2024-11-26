<template>
    <div class="">
        <Loading :active="loading" :is-full-page="true" />

        <form class="flex flex-col gap-5 " @submit.prevent="handleSubmit">
            <div class="grid grid-cols-2 gap-5">
                <Input v-model="lname" label="Họ" type="text" placeholder="Nhập họ" :errorMessages="lnameError" />
                <Input v-model="fname" label="Tên" type="text" placeholder="Nhập tên" :errorMessages="fnameError" />
            </div>

            <Input v-model="email" label="Email" type="email" placeholder="Nhập email" :errorMessages="emailError" />
            <Input v-model="password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu"
                :errorMessages="passwordError" />
            <Button class="w-full" variant="primary">Đăng ký</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import Input from '../ui/input/Input.vue';
import { useRegister } from '@/composables/user/useRegister';
import Loading from 'vue-loading-overlay'
const { lname, fname, email, password, handleSubmit, fnameError,
    lnameError,
    emailError, passwordError, authStore, loading } = useRegister();


</script>

<style scoped></style>