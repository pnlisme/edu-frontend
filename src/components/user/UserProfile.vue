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
                        <router-link to="">
                            Khóa học của tôi
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link to="">
                            Khóa học yêu thích
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link to="">
                            Lịch sử mua
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link to="">
                            Cá nhân
                        </router-link>
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
import { onServerPrefetch } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    dataUser: TUserAuth | null
}>()
const handleLogout = () => {
    logout() // Perform the logout
    router.push('/login') // Redirect to login page
}
const authStore = useAuthStore()
const { logout } = authStore

const userAvatar = props.dataUser?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
</script>
