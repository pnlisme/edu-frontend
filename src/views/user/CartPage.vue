<template>
    <main class="pb-16">
        <div class="container-user mt-16 flex flex-col gap-5">
            <h3 class="text-4xl font-bold">Giỏ hàng</h3>
            <div class="flex md:flex-row flex-col gap-5">
                <!-- COURSE ITEM -->




                <div v-if="cart?.length > 0" class="flex flex-col md:w-4/6 w-full gap-5">
                    <div class="flex justify-between items-center">
                        <span class="text-lg"> <span class="font-semibold">{{ cart.length }} </span> khóa học trong giỏ
                            hàng</span>
                        <button @click="clearCart" class="text-md text-indigo-600">Xóa tất cả</button>
                    </div>
                    <CardCourseCart v-for="course in cart" :key="course.id" :id="course.id" :title="course.title"
                        :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                        :old_price="course.old_price" :current_price="course.current_price"
                        :category="course.category_name || course.category.name" :level="course.level"
                        :average_rating="course.average_rating" :reviews_count="course.reviews_count"
                        :lectures_count="course.lectures_count" :creator="course?.creator" />

                </div>
                <div v-else class=" items-center flex flex-col md:w-4/6 w-full gap-5 justify-center">
                    <img class="w-48" src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="">
                    <h3 class="text-2xl font-bold mt-3 text-indigo-900 ">Giỏ hàng trống</h3>
                    <RouterLink to="/course"><Button variant="primary">Quay lại chọn khóa học</Button></RouterLink>
                </div>
                <!-- TOTAL -->
                <div class="md:w-2/6 w-full">
                    <div class="p-5 sticky top-0 shadow-lg rounded-lg">
                        <div class="flex flex-col gap-5">
                            <div class="flex flex-col">
                                <span class="text-2xl font-medium">Tạm tính</span>
                                <div class="flex items-end gap-3">

                                    <div class="text-2xl font-bold">{{ formatPrice(formattedTotalPrice) }}</div>
                                    <del class="text-xl font-medium text-gray-600">{{
                                        formatPrice(formattedTotalPriceOld) }}</del>
                                </div>

                            </div>
                            <UserVoucher />
                            <form @submit.prevent="handlePayment">
                                <div id="card-element" class="my-4"></div>
                                <div id="card-errors" role="alert" class="text-red-500 mt-2">{{ cardError }}</div>
                                <Button type="submit" variant="primary" class="w-full  text-white py-2 rounded">
                                    Thanh toán
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import CardCourseCart from '@/components/ui/card/CardCourseCart.vue';
import { useCart } from '@/composables/user/useCart';
import { useCartStore } from '@/store/cart';
import { onMounted, ref } from 'vue';

// Type-only imports
import UserVoucher from '@/components/user/UserVoucher.vue';
import api from '@/services/axiosConfig';
import { useAuthStore } from '@/store/auth';
import { useVoucherStore } from '@/store/voucher';
import { formatPrice } from '@/utils/formatPrice';
import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const cartStore = useCartStore()

const { cart, formattedTotalPrice, formattedTotalPriceOld, clearCart } = useCart();


const router = useRouter()

const paymentLoading = ref(false);
const cardError = ref('');

const token = ref<string | null>(null)

const authStore = useAuthStore()
const { state, userData } = authStore
const voucherStore = useVoucherStore()
const { voucher } = storeToRefs(voucherStore)
onMounted(async () => {
    await userData()
    token.value = state.token
});
const handlePayment = async () => {
    console.log(voucher.value)
    const data = {
        token: token.value, currency: 'vnd', voucher: voucher.value
    }
    console.log(data)
    const response = await api.post('auth/orders', data)
    if (response.data.status === 'success') {
        const checkUrl = response.data.checkout_url;
        if (checkUrl) {
            window.location.href = checkUrl

        } else {
            ElNotification({
                title: 'Thất bại',
                message: 'Thanh toán thất bại',
                type: 'error'
            })
        }
    } else {
        ElNotification({
            title: 'Thất bại',
            message: 'Cần đăng nhập để mua khóa học',
            type: 'warning'
        })
        router.push('/login')
    }

}




</script>
