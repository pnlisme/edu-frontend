<template>
    <div>
        <img :src="logo" alt="">
        <div class="mt-4">
            <p><strong>Mã đơn hàng:</strong> {{ data.order_code }}</p>
            <p><strong>Tổng giá:</strong> {{ data.total_price }} {{ data.currency }}</p>
            <p><strong>Phương thức thanh toán:</strong> {{ data.payment_method }}</p>
            <p><strong>Trạng thái thanh toán:</strong> {{ data.payment_status }}</p>
            <p><strong>Mã thanh toán:</strong> {{ data.payment_code }}</p>
            <p><strong>Ngày tạo:</strong> {{ data.created_at }}</p>
        </div>

        <h3 class="mt-6 font-bold">Các khóa học trong đơn hàng</h3>
        <table class="min-w-full mt-2">
            <thead>
                <tr>
                    <th class="px-6 py-2 text-left">ID</th>
                    <th class="px-6 py-2 text-left">Khóa học ID</th>
                    <th class="px-6 py-2 text-left">Giá</th>
                    <th class="px-6 py-2 text-left">Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data.order_items" :key="item.id">
                    <td class="px-6 py-4">{{ item.id }}</td>
                    <td class="px-6 py-4">{{ item.course_id }}</td>
                    <td class="px-6 py-4">{{ item.price }}</td>
                    <td class="px-6 py-4">{{ item.status }}</td>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-end mt-5" v-if="data.payment_status === 'pending'">
            <Button @click="handleCancelOrder" variant="primary" class="!py-2 px-2">
                Hủy đơn hàng
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
import type { TBill } from '@/interfaces/bill.interface';
import logo from '../../../assets/images/logo1.svg';
import Button from '../button/Button.vue';
import { useBill } from '@/composables/user/userBill';
const { cancelOrder } = useBill();
const props = defineProps<{ data: TBill }>();
const emit = defineEmits(['closeDialog']);
const handleCancelOrder = () => {
    if (props.data && props.data.id) {
        cancelOrder(props.data.id); // Gọi hàm hủy đơn hàng
        emit('closeDialog');
    }
};
</script>
