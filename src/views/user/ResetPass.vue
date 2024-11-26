<template>
    <main class="container-user my-16">
        <div class="flex items-center lg:flex-row flex-col justify-between gap-5">
            <div class="lg:w-1/2 ">
                <div class="md:p-10">
                    <img class="w-full h-[420px] lg:h-[580px]" :src="Banner" alt="">
                </div>
            </div>
            <div class="lg:w-1/2 ">
                <div class="py-5 lg:px-24  flex flex-col gap-5">
                    <h3 class="text-3xl font-bold">Cập nhật mật khẩu mới của bạn</h3>

                    <ResetPassFrom />



                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import ResetPassFrom from '@/components/auth/ResetPassFrom.vue';
const Banner = 'https://demo.creativeitem.com/academy-laravel/public/assets/frontend/default/image/login.gif'
</script>
