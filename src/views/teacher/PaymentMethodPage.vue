<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Nội dung chính -->
        <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
            <!-- Chọn phương thức thanh toán -->
            <section v-if="!state.listPaymentUser">
                <h2 class="text-lg font-bold mb-4">Cập nhật phương thức thanh toán</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <el-card v-for="method in stripeMethods" :key="method.id" class="hover:shadow-md cursor-pointer"
                        @click="handleStripeClick">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 overflow-hidden rounded-sm">
                                <img :src="method.logo" alt="Stripe method" class="w-full h-full object-contain" />
                            </div>
                            <div>
                                <p class="font-semibold">{{ method.name }}</p>
                                <p class="text-sm text-gray-500">{{ method.description }}</p>
                            </div>
                        </div>
                    </el-card>
                </div>
            </section>
            <!-- Phương thức thanh toán hiện tại -->
            <section v-else>
                <h2 class="text-lg font-bold mb-4">Phương thức thanh toán hiện tại</h2>
                <div class="flex items-center justify-between bg-gray-100 p-4 rounded-md">
                    <div>
                        <p class="font-semibold text-gray-800 uppercase">
                            {{ state.listPaymentUser.type }}
                        </p>
                        <p class="text-gray-600">
                            **** **** **** {{ maskedAccountInfoNumber }}
                        </p>
                        <p class="text-gray-600">Trạng thái: {{ state.listPaymentUser.status }}</p>
                        <p class="text-sm text-gray-400">Ngày tạo: {{ formattedCreatedAt }}</p>
                    </div>
                    <div class="flex space-x-4">
                        <el-button type="primary" size="small" @click="handleStripeClick">Cập nhật</el-button>
                    </div>
                </div>
            </section>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { useTeacherStore } from "@/store/teacher";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

// Store
const useTeacher = useTeacherStore();
const { state } = storeToRefs(useTeacher)
const { fetchReportTeacherPayment, getCallBackStripe, getListPaymentByUser } = useTeacher;



const stripeMethods = ref([
    {
        id: 1,
        name: "Stripe",
        description: "Hỗ trợ thanh toán qua Stripe",
        logo: "https://www.afscm.org/wp-content/uploads/2019/08/quel-terminal-de-paiement-pour-stripe.png",
    },
]);


const handleStripeClick = async () => {
    try {
        await getCallBackStripe(); // Gọi API để lấy URL callback Stripe
        if (state.value.urlCallBackStripe) {
            // Chuyển hướng sang URL nhận được
            window.location.href = state.value.urlCallBackStripe;
        } else {
            console.error("Không nhận được URL từ API.");
        }
    } catch (error) {
        console.error("Lỗi khi lấy URL Stripe:", error);
    }
};
onMounted(async () => {
    await getListPaymentByUser()
})

const formattedCreatedAt = computed(() => {
    const createdAt = state.value.listPaymentUser?.created_at;
    if (!createdAt) return "Không xác định";
    return new Date(createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
});
const maskedAccountInfoNumber = computed(() => {
    const accountInfoNumber = state.value.listPaymentUser?.account_info_number;
    if (!accountInfoNumber) return "N/A";
    // Lấy 4 ký tự cuối và che phần còn lại
    const last4 = accountInfoNumber.slice(-4);
    return `**** **** **** ${last4}`;
});
</script>
