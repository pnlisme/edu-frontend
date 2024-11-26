<template>
    <main class="container-user my-16">
        <div class="flex items-center lg:flex-row flex-col justify-between gap-5">
            <div class="lg:w-1/2 ">
                <div class="md:p-10">
                    <img class="w-full h-[380px] lg:h-[580px]" :src="Banner" alt="">
                </div>
            </div>
            <div class="lg:w-1/2 ">
                <div class="py-6 lg:px-24  flex flex-col gap-5">
                    <h3 class="text-3xl font-bold">Đăng ký và bắt đầu học
                    </h3>
                    <RegisterForm />
                    <div class="text-lg text-center">
                        Bạn đã có tài khoản ? <RouterLink class="text-indigo-600 font-medium" to="/login"> Đăng nhập
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import RegisterForm from '@/components/auth/RegisterForm.vue';
const Banner = 'https://demo.creativeitem.com/academy-laravel/public/assets/frontend/default/image/signup.gif'

</script>
