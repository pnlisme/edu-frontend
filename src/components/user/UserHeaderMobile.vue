<template>
    <div class="block xl:hidden">
        <div
            class="z-50 fixed bottom-0 shadow-indigo-600 drop-shadow-2xl w-full bg-white p-4 flex justify-between items-center">
            <div class="container mx-auto flex gap-3 items-center justify-between">

                <!-- Home Link -->
                <RouterLink to="/" exact v-slot="{ isActive }">
                    <div class="flex flex-col items-center cursor-pointer">
                        <HomeIcon :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="h-6 w-6" />
                        <span :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="text-[10px] font-medium">
                            Trang chủ
                        </span>
                    </div>
                </RouterLink>

                <!-- Search Button -->
                <div @click="searchOpen = true" class="flex items-center cursor-pointer group flex-col">
                    <MagnifyingGlassIcon class="h-6 w-6 text-gray-900 group-hover:text-indigo-600 animation" />
                    <span class="text-gray-900 text-[10px] group-hover:text-indigo-600 animation font-medium">
                        Tìm kiếm
                    </span>
                </div>

                <!-- Course Link -->
                <RouterLink to="/course" v-slot="{ isActive }">
                    <div class="flex flex-col items-center cursor-pointer">
                        <InboxStackIcon :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="h-6 w-6" />
                        <span :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="text-[10px] font-medium">
                            Thể loại
                        </span>
                    </div>
                </RouterLink>

                <!-- Cart Link -->
                <RouterLink to="/cart" v-slot="{ isActive }">
                    <div class="flex flex-col items-center cursor-pointer">
                        <ShoppingCartIcon :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="h-6 w-6" />
                        <span :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="text-[10px] font-medium">
                            Giỏ hàng
                        </span>
                    </div>
                </RouterLink>

                <!-- My Courses Link -->
                <RouterLink to="/mycourses" v-slot="{ isActive }">
                    <div class="flex flex-col items-center cursor-pointer">
                        <UserIcon :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="h-6 w-6" />
                        <span :class="isActive ? 'text-indigo-600' : 'text-gray-900'" class="text-[10px] font-medium">
                            Cá nhân
                        </span>
                    </div>
                </RouterLink>

            </div>
        </div>

        <!-- Search Drawer -->
        <el-drawer v-model="searchOpen" size="50%" title="Tìm kiếm khóa học của bạn" :direction="searchDirection">
            <SearchProduct />
        </el-drawer>
    </div>
</template>


<script setup lang="ts">
import { HomeIcon, ShoppingCartIcon, UserIcon, InboxStackIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import type { DrawerProps } from "element-plus";
import { ref } from "vue";
import SearchProduct from "../ui/dialog/SearchProduct.vue";
const searchOpen = ref(false)
const searchDirection = ref<DrawerProps['direction']>('ttb')

</script>
