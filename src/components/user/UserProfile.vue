<template>
    <div>
        <el-dropdown>
            <span>

                <img class="w-8 h-8 rounded-full hover:border-none" :src="userAvatar" alt="User Avatar">

            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <div class="">
                            <h3>{{ dataUser?.first_name }} {{ dataUser?.last_name }}</h3>
                            <span>{{ dataUser?.email }}</span>
                        </div>

                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <RouterLink to="/mycourses">
                            Khóa học của tôi
                        </RouterLink>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <RouterLink to="/wishlist">
                            Khóa học yêu thích
                        </RouterLink>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <RouterLink to="/register-teacher">
                            Giảng viên Edunity
                        </RouterLink>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <RouterLink to="/history">
                            Lịch sử mua
                        </RouterLink>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <RouterLink to="/myprofile">
                            Cá nhân
                        </RouterLink>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">Đăng xuất</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import type { TUserAuth } from '@/interfaces';
import { useAuthStore } from '@/store/auth'
import { onServerPrefetch, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    dataUser: TUserAuth | null
}>()
const handleLogout = () => {
    router.push('/login') // Redirect to login page
    logout() // Perform the logout
}
const authStore = useAuthStore()
const { logout } = authStore

const userAvatar = ref(
    authStore.state.user?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
);
watch(
    () => authStore.state.user?.avatar,
    (newAvatar) => {
        if (newAvatar) {
            userAvatar.value = newAvatar;
        }
    }
);
</script>
