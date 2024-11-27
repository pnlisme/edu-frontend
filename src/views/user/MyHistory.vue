<template>
    <div class="mb-20">
        <div class=" w-full" v-if="noBill">

            <div class=" flex justify-center items-center">

                <img class="" src="https://cdn3d.iconscout.com/3d/premium/thumb/search-notes-5066175-4235211.png?f=webp"
                    alt="">
            </div>

        </div>

        <div class="w-full" v-else>
            <div class="overflow-x-auto">
                <table class=" bg-white">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 border-b-2 border-gray-200  text-left text-xs   uppercase tracking-wider">
                                Mã đơn </th>
                            <th
                                class="px-6 py-3 border-b-2 border-gray-200  text-left text-xs   uppercase tracking-wider">
                                Thành tiền</th>
                            <th
                                class="px-6 py-3 border-b-2 border-gray-200  text-left text-xs   uppercase tracking-wider">
                                Phương thức</th>
                            <th
                                class="px-6 py-3 border-b-2 border-gray-200  text-left text-xs   uppercase tracking-wider">
                                Trang thái</th>
                            <th class="px-6 py-3 border-b-2 border-gray-200 ">Mã thanh toán</th>
                            <th class="px-6 py-3 border-b-2 border-gray-200 ">Ngày</th>
                            <th class="px-6 py-3 border-b-2 border-gray-200 ">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <BillItem v-for="item in apiStore.billHistory" :key="item.id" :id="item.id"
                            :voucher_id="item.voucher_id" :order_code="item.order_code" :total_price="item.total_price"
                            :currency="item.currency" :payment_method="item.payment_method"
                            :payment_status="item.payment_status" :payment_code="item.payment_code"
                            :status="item.status" :created_at="item.created_at" />

                    </tbody>
                </table>
            </div>
        </div>

        <!-- <EmptyData /> -->
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import EmptyData from '@/components/ui/empty/EmptyData.vue';
import BillItem from '@/components/ui/item/BillItem.vue';
import { useBill } from '@/composables/user/userBill';
import { apisStore } from '@/store/apis';
import { ShoppingCartIcon } from '@heroicons/vue/20/solid';
import { onMounted } from 'vue';
// const apiStore = apisStore()
// onMounted(async () => {
//     await apiStore.fetchBill()
// })

const { noBill, apiStore } = useBill();
</script>
