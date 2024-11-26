<template>
    <main class="pb-16">
        <div class="container-user mt-16 flex flex-col gap-5">
            <h3 class="text-4xl font-bold">Giỏ hàng</h3>
            <span class="text-lg"> <span class="font-semibold"> 2 </span>khóa học trong giỏ hàng</span>
            <div class="flex md:flex-row flex-col gap-5">
                <!-- COURSE ITEM -->
                <div class="flex flex-col md:w-4/6 w-full gap-5">
                    <CardCourseCart image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                        lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                        level="Mới bắt đầu" price="999.000" oldPrice="1.000.000" status="Mới" :review=12.1123
                        :rate=4.8 />

                </div>
                <!-- TOTAL -->
                <div class="md:w-2/6 w-full">
                    <div class="p-5 sticky top-0 shadow-lg rounded-lg">
                        <div class="flex flex-col gap-5">
                            <div class="flex flex-col">
                                <span class="text-2xl font-medium">Tổng</span>
                                <div class="text-4xl font-bold">788.000 vnđ</div>
                            </div>
                            <Button class="w-full" variant="primary">Thanh toán</Button>
                            <div class="flex flex-col gap-3">
                                <h3 class="text-lg">Áp dụng mã giảm giá</h3>
                                <div class="border-2  border-gray-900 flex justify-between">
                                    <input type="text" class="px-5 w-[12rem] py-2 focus-visible:outline-none"
                                        placeholder="Nhập phiếu giảm giá">
                                    <button class="h-full bg-gray-900 px-5 py-2 text-white">Áp dụng</button>
                                </div>
                            </div>
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


</script>
