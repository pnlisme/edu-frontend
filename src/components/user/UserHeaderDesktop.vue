<template>
    <!-- HEADER MAIN -->
    <div class="z-10 bg-white drop-shadow-md shadow-sm sticky top-0">
        <div class="container-user py-2 ">
            <div class="flex items-center justify-between">
                <!-- LEFT -->
                <!-- RIGHT (Hamburger Menu Icon) -->
                <div class="lg:hidden" @click="toggleMenu">
                    <Bars3Icon class="h-8 w-8 text-gray-900" />

                </div>
                <div class="flex items-center gap-5">

                    <!-- LOGO -->
                    <img class="w-32" :src="logo" alt="">
                    <!-- NAVBAR -->
                    <nav class="hidden lg:block">
                        <!-- <el-text text @click="drawer = true" class="cursor-pointer animation hover:text-indigo-600">Thể
                            loại</el-text> -->
                        <!-- <div class="cursor-pointer animation hover:text-indigo-600">Thể
                            loại</div> -->
                        <el-menu class="text" mode="horizontal" :ellipsis="false">
                            <!-- Workspace Menu -->
                            <el-sub-menu class="" index="2">
                                <!-- Just display the text 'Workspace' -->
                                <template #title>
                                    <p class="">Thể loại</p>
                                    <!-- <span
                                        class="hover:text-indigo-600 text-gray-700">Workspace</span> -->
                                </template>

                                <el-menu-item index="2-1">item
                                    one</el-menu-item>
                                <el-menu-item index="2-2">item two</el-menu-item>
                                <el-menu-item index="2-3">item three</el-menu-item>
                                <el-sub-menu index="2-4">
                                    <template #title>item four</template>
                                    <el-menu-item index="2-4-1">item one</el-menu-item>
                                    <el-menu-item index="2-4-2">item two</el-menu-item>
                                    <el-sub-menu index="2-4-4">
                                        <template #title>item four</template>
                                        <el-menu-item index="2-4-4-1">item one</el-menu-item>
                                        <el-menu-item index="2-4-4-2">item two</el-menu-item>
                                        <el-menu-item index="2-4-4-3">item three</el-menu-item>
                                    </el-sub-menu>
                                </el-sub-menu>
                            </el-sub-menu>
                        </el-menu>

                    </nav>
                    <!-- SEARCH -->
                    <div class="hidden lg:block">


                        <form class="flex gap-5 py-2 px-4 border-[1px] rounded-3xl border-gray-900">

                            <MagnifyingGlassIcon class=" h-6 w-6 text-gray-900" />
                            <input class=" pe-24 focus-visible:outline-none border-none" type="text"
                                placeholder="Tìm  kiếm nội dung bất kì">
                        </form>
                    </div>
                </div>
                <!-- RIGHT -->

                <div class="hidden xl:block">
                    <div class=" flex items-center gap-5">
                        <ul class="flex gap-5">
                            <router-link class="animation hover:text-indigo-600" to="/">
                                Giảng viên trên Edunity
                            </router-link>


                        </ul>
                        <el-badge :value="3" type="primary" badge-style="text-lg">
                            <ShoppingCartIcon class="h-6 w-6 text-gray-900" />
                        </el-badge>
                        <!-- CART -->

                        <!-- NO USER -->
                        <div class="">
                            <div class="" v-if="state.token">
                                <UserProfile :dataUser="state.user" />
                            </div>
                            <div v-else class="flex gap-5">
                                <Button variant="default">
                                    <RouterLink to="/register">Đăng ký</RouterLink>
                                </Button>
                                <Button variant="primary">

                                    <RouterLink to="/login">Đăng nhập</RouterLink>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- RIGHT MOBILE -->
                <div class="xl:hidden block">
                    <div class="" v-if="state.token">
                        <UserProfile :dataUser="profileData" />
                    </div>
                    <div v-else class="flex items-center gap-3">

                        <RouterLink class="text-indigo-600" to="/register">Đăng ký</RouterLink>
                        <RouterLink class="text-indigo-600" to="/login">Đăng Nhập</RouterLink>

                    </div>
                </div>

            </div>

        </div>

    </div>
    <!-- MOBILE NAVBAR (ẩn/hiện dựa trên trạng thái) -->

    <el-drawer size="50%" v-model="isOpenNav" title="I am the title" :direction="direction">
        <span>Hi, there!</span>
    </el-drawer>
    <!-- HEADER CATEGORY  -->
    <!-- <div class="z-20 bg-green-600 drop-shadow-md shadow-sm sticky top-[76px]">
        <div class="container-user py-2 ">
            <div class="px-20">
                <ul>
                    <li>
                        Phát triển
                    </li>
                </ul>
            </div>
        </div>
    </div> -->

    <!-- <el-drawer direction="ltr" v-model="drawer" title="I am the title" :with-header="false" size="15%">
        <span>Thể loại</span>
    </el-drawer> -->

</template>

<script setup lang="ts">
import logo from '../../assets/images/logo1.svg'
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import Button from '@/components/ui/button/Button.vue';
import { onMounted, ref } from 'vue'
import { ElNotification, type DrawerProps } from 'element-plus';
import { Bars3Icon } from "@heroicons/vue/24/outline";
import UserProfile from './UserProfile.vue';

import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
const direction = ref<DrawerProps['direction']>('ltr')
const isOpenNav = ref(false)
const toggleMenu = () => {
    isOpenNav.value = !isOpenNav.value
}
const router = useRouter()
const authStore = useAuthStore()
const { state, userData } = authStore
const profileData = ref(null)
const currentPath = router.currentRoute.value.fullPath
localStorage.setItem('redirectAfterLogin', currentPath);
onMounted(async () => {
    if (!state.user && state.token) {
        const res = await userData()
        if (res?.status === 'FAIL') {
            authStore.logout()
            router.push('/')
            ElNotification({
                title: 'Thất bại',
                message: res.message || 'Bạn không có quyền truy cập',
                type: 'error'
            })
        } else {
            profileData.value = res
        }
    }
})


</script>
<style scoped>
.el-menu--horizontal.el-menu {
    border: none;
}
</style>