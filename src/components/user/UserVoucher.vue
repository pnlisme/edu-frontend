<template>
    <div class="flex flex-col gap-3">
        <h3 class="text-lg">Áp dụng mã giảm giá</h3>
        <div class="border-2 border-gray-900 flex justify-between">
            <input type="text" v-model="voucher" class="px-5 w-[12rem] py-2 focus-visible:outline-none"
                placeholder="Nhập phiếu giảm giá" />
            <button @click="applyVoucherCode" class="h-full bg-gray-900 px-5 py-2 text-white">
                Áp dụng
            </button>
        </div>
    </div>

    <div class="" v-if="discount && total_price_after_discount">
        <div class="">
            <div class="flex flex-col items-start gap-3">
                <div class="text-xl font-medium text-gray-600">
                    Giảm giá voucher: {{ formatPrice(discount) }}
                </div>
                <div class="text-2xl font-bold">
                    Tổng {{ formatPrice(total_price_after_discount) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVoucherStore } from '@/store/voucher';
import { formatPrice } from '@/utils/formatPrice';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
const voucherStore = useVoucherStore();
const { state, discount, total_price_after_discount } = storeToRefs(voucherStore)
const voucher = ref('');

const applyVoucherCode = async () => {

    await voucherStore.applyVoucher(voucher.value);


};
</script>
