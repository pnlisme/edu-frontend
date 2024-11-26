<script setup lang="ts">
import CardService from '../ui/card/CardService.vue';
</script>

<template>
    <section class="container-user mt-16">
        <div class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-3xl">
            <div class="grid lg:grid-cols-4 sm:grid-cols-2  gap-5">
                <CardService
                    image="https://demo.creativeitem.com/academy-laravel/public/assets/page-builder/block-image/p1.png"
                    heading="Hiệu suất nhanh"
                    description="Một sự thật đã được chứng minh từ lâu là người đọc sẽ bị mất tập trung." />
                <CardService
                    image="https://demo.creativeitem.com/academy-laravel/public/assets/page-builder/block-image/p2.png"
                    heading="Phản hồi hoàn hảo"
                    description="Một sự thật đã được chứng minh từ lâu là người đọc sẽ bị mất tập trung." />
                <CardService
                    image="https://demo.creativeitem.com/academy-laravel/public/assets/page-builder/block-image/p3.png"
                    heading="Hỗ trợ nhanh chóng và thân thiện"
                    description="Một sự thật đã được chứng minh từ lâu là người đọc sẽ bị mất tập trung." />
                <CardService
                    image="https://demo.creativeitem.com/academy-laravel/public/assets/page-builder/block-image/p4.png"
                    heading="Dễ sử dụng"
                    description="Một sự thật đã được chứng minh từ lâu là người đọc sẽ bị mất tập trung." />
            </div>
        </div>
    </section>
</template>
