<template>

    <div
        class=" cursor-pointer rounded-lg p-3 bg-white shadow-md hover:shadow-lg hover:transition-all transition-all hover:duration-300 duration-300 group ">
        <div class="relative overflow-hidden">
            <!-- IMAGE  -->
            <div class="rounded-lg overflow-hidden">
                <img @click="navigateToDetail(id)"
                    class="group-hover:scale-105  scale-100 hover:transition-all transition-all hover:duration-300 duration-300 cursor-pointer object-cover w-full h-36"
                    :src="thumbnail" alt="Product Image" />
            </div>
            <!-- BODY  -->
            <div @click="navigateToDetail(id)" class="mt-2 flex flex-col gap-2">
                <div v-if="tag" class="flex justify-between items-center">
                    <span class="text-sm w-32">{{ creator }}</span>
                    <button v-if="tag !== 'none'" :class="tag === 'Mới nhất' ? 'bg-green-400' : 'bg-pink-400'"
                        class="text-sm border rounded-md px-2 py-0.5 text-white">{{ tag }}</button>
                </div>
                <h3 class="text-[16px] font-medium leading-6">{{ title }}</h3>
                <ul class="flex  gap-3">
                    <!-- <li class="flex items-center gap-1">
                        <ClockIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">120 Giờ</span>
                    </li> -->
                    <li class="flex items-center gap-1">
                        <BookOpenIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ lectures_count }} Chương học</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <RocketLaunchIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ level }}</span>
                    </li>
                </ul>

                <div class="flex items-end gap-3">
                    <span class="text-lg text-gray-800 font-bold">{{ formatPrice(current_price) }}</span>
                    <del v-if="old_price" class="text-gray-500">{{ formatPrice(old_price) }}</del>
                </div>
            </div>
            <div
                class="absolute  top-2 right-2 opacity-0 translate-x-11 group-hover:translate-x-0  hover:transition-all duration-300 group-hover:opacity-100  ">
                <div class="flex flex-col gap-2">
                    <button @click="handleAddToCart(id)"
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <ShoppingCartIcon class="h-5 w-5  text-white" />
                    </button>
                    <button v-if="state.token" @click="toggleWishlist(id)"
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">

                        <HeartIconSolid v-if="isInWishlist(id)" class="h-5 w-5  text-white" />
                        <HeartIcon v-else class="h-5 w-5  text-white" />

                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { formatPrice } from '@/utils/formatPrice';
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/20/solid";
import { BookOpenIcon, HeartIcon, RocketLaunchIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { defineProps } from 'vue';

import { useCart } from '@/composables/user/useCart';
import type { TCardCourse } from '@/interfaces/course.interface';
import { useAuthStore } from '@/store/auth';
import { useWishlistStore } from '@/store/wishlist';
import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const useAuth = useAuthStore()
const { state } = storeToRefs(useAuth)
defineProps<TCardCourse>();
// const { navigateToDetail } = useCourseDetail()
const router = useRouter();
const navigateToDetail = (id: number) => {
    router.push({ name: 'user.course.detail', params: { id: String(id) } });
};
const { handleAddToCart } = useCart();


// wishlist 
const wishlistStore = useWishlistStore();
const { addToWishlist, removeFromWishlist } = wishlistStore
const { wishlist } = storeToRefs(wishlistStore)

// Hàm kiểm tra nếu khóa học có trong wishlist
const isInWishlist = (id: number) => {
    return wishlist.value.some((item) => item.id === id);
};

// Hàm thêm/xóa khóa học khỏi wishlist
const toggleWishlist = (id: number) => {
    if (isInWishlist(id)) {
        removeFromWishlist(id);
        ElNotification({
            title: 'Thông báo',
            message: 'Đã xóa vào mục yêu thích',
            type: 'success',
            duration: 1000
        })
    } else {
        addToWishlist(id);
        ElNotification({
            title: 'Thông báo',
            message: 'Đã thêm vào mục yêu thích',
            type: 'success',
            duration: 1000
        })
    }
};
</script>