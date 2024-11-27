<template>
    <div class="p-3 flex flex-col justify-between h-full">
        <div class="">
            <div class="flex justify-end ">
                <button @click="clearCart" class="text-indigo-600 pb-3 ">Xóa tất cả </button>
            </div>
            <div v-if="loading" class="flex justify-center items-center">
                <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
            </div>
            <div class="flex flex-col gap-3">
                <CardCourseViewCart v-for="course in cart" :key="course.id" :id="course.id" :title="course.title"
                    :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                    :old_price="course.old_price" :current_price="course.current_price"
                    :category="course.category_name || course.category.name" />

            </div>
        </div>
        <div class="">
            <div class="py-3 font-bold text-xl">
                Tổng cộng : {{ formatPrice(formattedTotalPrice) }}
            </div>
            <RouterLink to="/cart"> <Button variant="primary" class="w-full">Xem giỏ hàng</Button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import CardCourseViewCart from '../card/CardCourseViewCart.vue';
import Button from '../button/Button.vue';
import { useCart } from '@/composables/user/useCart';
import { formatPrice } from '@/utils/formatPrice';

const { cart, loading, fetchCartCourses, clearCart, formattedTotalPrice } = useCart();

onMounted(async () => {
    await fetchCartCourses();
});

</script>
