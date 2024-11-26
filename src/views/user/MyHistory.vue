<template>
    <div class="mb-20">
        <main>
            <table class="table-auto  w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ngày</th>
                        <th>Thanh toán</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="flex justify-start items-center gap-3">
                                <ShoppingCartIcon class="h-5 w-5 " />
                                <span>Google Ads Training 2021: Profit with Pay</span>
                            </div>
                        </td>
                        <td>Thứ 5,12/2/2024</td>
                        <td>
                            <div class="flex items-center gap-1">
                                <span>399,000 đ</span>
                                <span>Visa ****0869</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex gap-3">
                                <Button class="!px-3 !py-0.5 !text-sm">
                                    Biên lai</Button>
                                <Button class="!px-3 !py-0.5 !text-sm">
                                    Hóa đơn</Button>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </main>
        <!-- <EmptyData /> -->
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import EmptyData from '@/components/ui/empty/EmptyData.vue';
import { ShoppingCartIcon } from '@heroicons/vue/20/solid';


</script>

<style scoped></style>