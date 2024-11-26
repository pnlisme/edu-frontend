<template>
    <div class="bg-gray-800 py-10">

        <div class="container-user">
            <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap-5   pb-10 border-b-2">
                <div class="flex sm:justify-start justify-center">
                    <img class="w-48" :src="logo" alt="">
                </div>
                <div class="text-center sm:text-start">
                    <ul class="text-white flex flex-col gap-3">
                        <router-link to="/" lass="cursor-pointer">Web Programming</router-link>
                        <router-link to="/" lass="cursor-pointer">Mobile Programming</router-link>
                        <router-link to="/" lass="cursor-pointer">Java Beginner</router-link>
                        <router-link to="/" lass="cursor-pointer">PHP Beginner</router-link>
                    </ul>
                </div>
                <div class="text-center sm:text-start">
                    <ul class="text-white flex flex-col gap-3">
                        <router-link to="/" lass="cursor-pointer">Adobe Illustrator</router-link>
                        <router-link to="/" lass="cursor-pointer">Adobe Photoshop</router-link>
                        <router-link to="/" lass="cursor-pointer">Design Logo</router-link>
                    </ul>
                </div>
                <div class="text-center sm:text-start">
                    <ul class="text-white flex flex-col gap-3">
                        <router-link to="/" lass="cursor-pointer">Writing Course</router-link>
                        <router-link to="/" lass="cursor-pointer">Photography</router-link>
                        <router-link to="/" lass="cursor-pointer">Java Beginner</router-link>
                        <router-link to="/" lass="cursor-pointer">Video Making</router-link>
                    </ul>
                </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
                <span class="text-white">Copyright © Edunity.asia 2024. All Rights Reserved</span>
                <div class="flex gap-3">
                    <router-link to="/">
                        <img :src="tw" alt="">
                    </router-link>
                    <router-link to="/">
                        <img :src="ig" alt="">
                    </router-link>
                    <router-link to="/">
                        <img :src="fb" alt="">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import tw from '../../assets/images/tw.svg'
import ig from '../../assets/images/ig.svg'
import fb from '../../assets/images/fb.svg'
import logo from '../../assets/images/logo2.svg'
</script>