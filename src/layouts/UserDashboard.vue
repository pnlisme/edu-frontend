<template>
    <div class="my-16">
        <div class="relative -z-10 bg-gradient-to-t from-indigo-300 via-indigo-200 to-indigo-50 w-full h-72">

        </div>
        <div class="container-user -mt-64 z-10 flex lg:flex-row flex-col gap-5">
            <div class="border-2 border-indigo-600 bg-white  rounded-lg p-5 w-full sm:w-full lg:w-1/4 ">
                <UserSidebar />
            </div>
            <main class="w-full">
                <div class="flex flex-col gap-5">
                    <h3 class="text-2xl font-bold">{{ title }}</h3>
                    <div class="w-full bg-white p-5 rounded-md  shadow-lg">
                        <router-view />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import UserSidebar from '../components/user/UserSidebar.vue';
import { ref, watch } from 'vue';

const route = useRoute();
const title = ref<string>('');
const getTitleByRoute = (path: string) => {
    switch (path) {
        case '/mycourses':
            return 'Khóa học của tôi'
        case '/myprofile':
            return 'Hồ sơ của tôi'
        case '/mycourselist':
            return 'Danh sách của tôi'
        case '/wishlist':
            return 'Danh sách yêu thích'
        case '/security':
            return 'Bảo mật'
        case '/history':
            return 'Lịch sử mua hàng'
        case '/mymessage':
            return 'Tin nhắn'
        default:
            return 'Trang cá nhân';
    }
}

title.value = getTitleByRoute(route.path)
watch(
    () => route.path,
    (newPath) => {
        title.value = getTitleByRoute(newPath);
    }
);
</script>
