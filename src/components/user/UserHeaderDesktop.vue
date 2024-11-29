<template>
    <div class="z-10 bg-white drop-shadow-md shadow-sm sticky top-0">
        <div class="container-user py-2 ">
            <div class="flex items-center justify-between">
                <div class="lg:hidden" @click="toggleMenu">
                    <Bars3Icon class="h-8 w-8 text-gray-900" />
                </div>
                <div class="flex items-center gap-5">
                    <RouterLink to="/">
                        <img class="w-32" :src="logo" alt="">
                    </RouterLink>
                    <nav class="hidden lg:block">
                        <MenuDesktop />
                    </nav>
                    <div class="hidden lg:block">
                        <form @click="searchOpen = true"
                            class="flex gap-5 py-2 px-4 border-[1px] rounded-3xl border-gray-900">
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
                            <RouterLink class="animation hover:text-indigo-600" to="/register-teacher">
                                Giảng viên trên Edunity
                            </RouterLink>
                        </ul>

                        <el-badge @click="toggleCart" :value="cart?.length || 0" type="primary" badge-style="text-lg">
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
                <div class="xl:hidden block">
                    <div class="" v-if="state.token">
                        <UserProfile :dataUser="state.user" />
                    </div>
                    <div v-else class="flex items-center gap-3">

                        <RouterLink class="text-indigo-600" to="/register">Đăng ký</RouterLink>
                        <RouterLink class="text-indigo-600" to="/login">Đăng Nhập</RouterLink>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <el-drawer size="50%" v-model="isOpenNav" title="I am the title" :direction="direction">
        <span>Hi, there!</span>
    </el-drawer>

    <!-- Cart view -->
    <el-drawer v-model="isOpenCart" @update:modelValue="isOpenCart = false" title="Giỏ hàng">
        <div v-if="cart?.length > 0">

            <ViewCart />
        </div>
        <div v-else class="flex items-center flex-col justify-center">
            <img class="w-48" src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="">
            <h3 class="text-2xl font-bold mt-3 text-indigo-900 ">Giỏ hàng trống</h3>
        </div>
    </el-drawer>

    <el-drawer v-model="searchOpen" size="50%" title="Tìm kiếm khóa học của bạn" :direction="searchDirection">
        <SearchProduct />
    </el-drawer>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useCart } from '@/composables/user/useCart';
import { useAuthStore } from '@/store/auth';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { ElNotification, type DrawerProps } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import logo from '../../assets/images/logo1.svg';
import SearchProduct from '../ui/dialog/SearchProduct.vue';
import ViewCart from '../ui/dialog/ViewCart.vue';
import MenuDesktop from '../ui/menu/MenuDesktop.vue';
import UserProfile from './UserProfile.vue';
const direction = ref<DrawerProps['direction']>('ltr')
const isOpenNav = ref(false)
const isOpenCart = ref(false)
const searchOpen = ref(false)
const searchDirection = ref<DrawerProps['direction']>('ttb')
const toggleMenu = () => {
    isOpenNav.value = !isOpenNav.value
}
const { cart, loading } = useCart();
const toggleCart = () => {
    isOpenCart.value = !isOpenCart.value
}
const router = useRouter()
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const { userData } = authStore;
const currentPath = router.currentRoute.value.fullPath
localStorage.setItem('redirectAfterLogin', currentPath);
onMounted(async () => {
    await userData()
})


</script>
