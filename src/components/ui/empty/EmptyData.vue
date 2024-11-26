<template>
    <div class="flex flex-col justify-center items-center">
        <img class="w-[480px]" :src="image" alt="">
        <div class="flex flex-col gap-2 items-center">
            <h3 class="text-2xl font-bold">Không tìm thấy dữ liệu!</h3>
            <span>Hãy thử sử dụng các từ khóa thích hợp.</span>
            <div class="text-xl text-gray-600">
                <router-link to="/">
                    <Button variant="primary">Quay lại</Button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '../button/Button.vue';

const image = 'https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid'
</script>
