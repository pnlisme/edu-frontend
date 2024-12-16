<template>
    <div class="z-10 bg-white drop-shadow-md shadow-sm sticky top-0">
        <div v-loading="loadingVoucher" v-if="firstActiveVoucher" class=" bg-indigo-600  ">
            <div class="text-white font-semibold container-user py-1 flex gap-1 items-center justify-center">
                <span class="font-normal">Chương trình giảm giá</span>
                <h2>{{ firstActiveVoucher.code }}</h2>
            </div>
        </div>
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
        <RouterLink to="/">
            <img class="w-32 absolute top-0 py-[16px]" :src="logo" alt="">
        </RouterLink>
        <el-row>
            <el-col>
                <el-menu default-active="2" class="" @open="handleOpen" @close="handleClose">
                    <el-sub-menu index="1">
                        <template #title>
                            <span>Tất cả khoá học</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(category, index) in apiStore.categoriesWithoutChildren"
                                :key="category.id" :index="`2-${index}`" @click="filterByCategory(category.id || 0)">
                                {{ category.name }}
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu v-for="(category, index) in apiStore.categoriesWithChildren"
                            :key="`sub-${category.id}`" :index="`2-${index}-sub`">
                            <template #title>{{ category.name }}</template>
                            <el-menu-item v-for="(child, childIndex) in category.children" :key="child.id"
                                :index="`2-${index}-${childIndex}`" @click="filterByCategory(child.id || 0)">
                                {{ child.name }}</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-col>
        </el-row>
    </el-drawer>

    <!-- Cart view -->
    <el-drawer v-loading="loadingCart" v-model="isOpenCart" @update:modelValue="isOpenCart = false" title="Giỏ hàng">
        <div v-if="cart?.length > 0">
            <ViewCart :data="cart" />
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
import { useCartStore } from '@/store/cart';
import { useVoucherStore } from '@/store/voucher';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { type DrawerProps } from 'element-plus';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import logo from '../../assets/images/logo3.svg';
import SearchProduct from '../ui/dialog/SearchProduct.vue';
import ViewCart from '../ui/dialog/ViewCart.vue';
import MenuDesktop from '../ui/menu/MenuDesktop.vue';
import UserProfile from './UserProfile.vue';
import { apisStore } from '@/store/apis';
const direction = ref<DrawerProps['direction']>('ltr')
const isOpenNav = ref(false)
const isOpenCart = ref(false)
const searchOpen = ref(false)
const searchDirection = ref<DrawerProps['direction']>('ttb')
const loadingCart = ref(false);
const loadingVoucher = ref(false);
const toggleMenu = () => {
    isOpenNav.value = !isOpenNav.value
}

// const { coursesFilterSection, activeFilter, fetchCoursesSection, changeFilter } = useShop()
const handleOpen = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath)
}
const filterByCategory = (categoryId: number) => {
    router.push({
        name: 'Course',
        query: { category_ids: categoryId }, // Truyền ID danh mục vào query
    });
};

// const toggleCart = () => {
//     isOpenCart.value = !isOpenCart.value
// }
const toggleCart = async () => {
    isOpenCart.value = !isOpenCart.value;
    if (isOpenCart.value) {
        loadingCart.value = true;
        try {
            await fetchCartCourses();
        } finally {
            loadingCart.value = false;
        }
    }
};
const router = useRouter()
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const { userData } = authStore;
const currentPath = router.currentRoute.value.fullPath
localStorage.setItem('redirectAfterLogin', currentPath);

const cartStore = useCartStore()
const { loading, fetchCartCourses, clearCart, formattedTotalPrice, isAuthenticated } = useCart();
const { cart } = storeToRefs(cartStore)
onMounted(async () => {
    loadingCart.value = true;
    loadingVoucher.value = true;
    try {
        await userData();
        await fetchCartCourses();
        await voucherStore.fetchVouchers();
    } catch (error) {
        console.error('Error during onMounted:', error);
    } finally {
        loadingCart.value = false;
        loadingVoucher.value = false;
    }
})

const voucherStore = useVoucherStore();


const firstActiveVoucher = computed(() => voucherStore.firstActiveVoucher);
const apiStore = apisStore()
onMounted(() => {
    voucherStore.fetchVouchers()
    apiStore.fetchCate()
    apiStore.fetchCourse()
})
</script>
