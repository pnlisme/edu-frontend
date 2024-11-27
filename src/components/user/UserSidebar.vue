<template>
    <div class="flex flex-col">
        <CardProfile :dataUser="dataUser" />
        <div class="flex flex-col mt-5 gap-2">
            <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path"
                class="nav-item flex hover:bg-indigo-600 hover:text-white rounded-lg animation font-bold items-center space-x-2 p-2"
                :class="{
                    'text-white bg-indigo-600': isActive(item.path),
                    'text-gray-600': !isActive(item.path)
                }">
                <component :is="item.icon" class="w-6 h-6" />
                <span>{{ item.label }}</span>
            </RouterLink>
            <button @click="handleLogout"
                class="flex text-gray-600 hover:bg-indigo-600 hover:text-white rounded-lg animation font-bold items-center space-x-2 p-2">
                <ArrowLeftStartOnRectangleIcon class="w-6 h-6" />
                <span>Logout</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CardProfile from '../ui/card/CardProfile.vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftStartOnRectangleIcon, ClipboardDocumentCheckIcon, FolderOpenIcon, ChatBubbleLeftEllipsisIcon, HeartIcon, HomeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline';
import type { MenuItem } from '@/interfaces/ui.interface';
import type { TUserAuth } from '@/interfaces';
import { useAuthStore } from '@/store/auth';

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


const router = useRouter()

const authStore = useAuthStore()
const dataUser = authStore.state.user;
const handleLogout = () => {
    logout()
    router.push('/login')
}
const { logout } = authStore
</script>