<template>
    <header class="bg-gray-900 py-2 px-10 flex items-center justify-between">
        <div class="">
            <img class="w-32" :src="logo" alt="">
        </div>
        <h3 class="text-white text-lg font-medium">Khoas hocj nayf dinh vcl</h3>
        <div class="">
            <Button class="hover:shadow-none" variant="default">
                Khóa học của tôi
            </Button>
        </div>
    </header>
</template>

<script setup lang="ts">
import logo from '../../assets/images/logo2.svg'
import Button from '../ui/button/Button.vue';
</script>
