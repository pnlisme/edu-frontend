<template>

    <tr>
        <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ voucher_id }}</td> -->
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order_code }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatPrice(total_price) }}</td>
        <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td> -->
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ payment_method }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ payment_status }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span class="block max-w-60 truncate">

                {{ payment_code }} </span>
        </td>

        <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ status }}</td> -->
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ created_at }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex gap-3">
                <div class="" v-if="payment_status === 'cancelled'">

                    <CreditCardIcon @click="BillRestore(id)" class="cursor-pointer h-5 w-5 text-indigo-600" />
                </div>

                <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a> -->
                <EyeIcon @click="openBillDetail(id)" class="cursor-pointer h-5 w-5 text-indigo-600" />
            </div>

        </td>
    </tr>
    <el-dialog v-model="dialogFormVisible" title="Chi tiết đơn" width="800">
        <BillDetail v-if="billHistoryDetail" :data="billHistoryDetail" @closeDialog="closeDialog" />
    </el-dialog>
</template>

<script setup lang="ts">
import type { TBill } from '@/interfaces/bill.interface';
import { defineProps, ref } from 'vue';
import { EyeIcon } from "@heroicons/vue/24/outline";
import BillDetail from '../dialog/BillDetail.vue';
import { apisStore } from '@/store/apis';
import { storeToRefs } from 'pinia';
import { CreditCardIcon } from "@heroicons/vue/24/outline";
import api from '@/services/axiosConfig';
import { ElNotification } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
const dialogFormVisible = ref(false)
const store = apisStore();
const { billHistoryDetail } = storeToRefs(store)
const { fetchBillDetail } = store;
import { formatPrice } from '@/utils/formatPrice'
defineProps<TBill>()
const router = useRouter()


const BillRestore = async (id: number) => {
    const response = await api.patch(`/auth/orders/${id}/restore`)
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
const openBillDetail = async (id: number) => {
    dialogFormVisible.value = true; // Mở dialog
    await fetchBillDetail(id); // Gọi API để lấy chi tiết hóa đơn
};
const closeDialog = () => {
    dialogFormVisible.value = false; // Đóng dialog
};

</script>
