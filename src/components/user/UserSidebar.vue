<template>
    <div class="flex flex-col">
        <CardProfile />
        <div class="flex flex-col mt-5 gap-2">
            <router-link v-for="item in menuItems" :key="item.path" :to="item.path"
                class="nav-item flex hover:bg-indigo-600 hover:text-white rounded-lg animation font-bold items-center space-x-2 p-2"
                :class="{
                    'text-white bg-indigo-600': isActive(item.path),
                    'text-gray-600': !isActive(item.path)
                }">
                <component :is="item.icon" class="w-6 h-6" />
                <span>{{ item.label }}</span>
            </router-link>
            <button
                class="flex text-gray-600 hover:bg-indigo-600 hover:text-white rounded-lg animation font-bold items-center space-x-2 p-2">
                <ArrowLeftStartOnRectangleIcon class="w-6 h-6" />
                <span>Logout</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CardProfile from '../ui/card/CardProfile.vue';
import { useRoute } from 'vue-router';
import { ArrowLeftStartOnRectangleIcon, ClipboardDocumentCheckIcon, FolderOpenIcon, ChatBubbleLeftEllipsisIcon, HeartIcon, HomeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline';
import type { MenuItem } from '@/interfaces/ui.interface';

const route = useRoute();
const menuItems: MenuItem[] = [
    { path: '/mycourses', label: 'Khóa học của tôi', icon: HomeIcon },
    { path: '/myprofile', label: 'Hồ sơ của tôi', icon: UserIcon },
    { path: '/wishlist', label: 'Yêu thích', icon: HeartIcon },
    { path: '/security', label: 'Bảo mật', icon: LockClosedIcon },
    { path: '/history', label: 'Lịch sử mua hàng', icon: ClipboardDocumentCheckIcon },
    { path: '/mymessage', label: 'Tin nhắn', icon: ChatBubbleLeftEllipsisIcon }
];

const isActive = (path: string) => route.path === path;

</script>