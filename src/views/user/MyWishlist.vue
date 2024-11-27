<template>
    <div class="mb-20">
        <main>
            <div class="flex justify-end my-5">
                <!-- <form action="" class="border-2 border-gray-900 rounded-full items-center flex gap-2 py-1 px-2">
                    <button type="submit" class="flex items-center justify-center">
                        <MagnifyingGlassIcon class="h-6 w-6 text-gray-900" />
                    </button>
                    <input class="focus-visible:outline-none" type="text" name="" id="" placeholder="Tìm kiếm khóa học">
                </form> -->
            </div>
            <div class="">
                <div v-if="wishlist.length > 0" class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <CardCourse v-for="course in wishlist" :key="course.id" :id="course.id" :title="course.title"
                        :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                        :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                        :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />
                </div>
                <div v-else class="flex justify-center flex-col items-center">

                    <img class="w-1/3 "
                        src="https://cdni.iconscout.com/illustration/premium/thumb/no-wishlist-illustration-download-in-svg-png-gif-file-formats--empty-list-product-ecommerce-pack-e-commerce-shopping-illustrations-6632287.png?f=webp"
                        alt="">
                    <h3 class="text-3xl font-bold text-gray-800">Không có sản phẩm yêu thích</h3>
                </div>
            </div>
        </main>
        <!-- <EmptyData v-if="Course.length === 0" /> -->
    </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import MyCourses from './MyCourses.vue';
import CardCourse from '@/components/ui/card/CardCourse.vue';
import { useWishlistStore } from '@/store/wishlist';
import { storeToRefs } from 'pinia';

const wishlistStore = useWishlistStore();
const { wishlist } = storeToRefs(wishlistStore)
console.log(wishlist)
</script>
