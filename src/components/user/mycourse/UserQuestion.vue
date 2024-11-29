<template>
    <div class="mx-20 my-5">
        <div class="">
            <div class="border-2  border-gray-900 flex justify-between">
                <input type="text" class="px-5 w-[12rem] py-2 focus-visible:outline-none"
                    placeholder="Tìm kiếm câu hỏi">
                <button class="h-full bg-gray-900 px-5 py-2 text-white">Áp dụng</button>
            </div>
            <div class="flex mt-3 gap-3">
                <div class=" w-1/3 flex flex-col gap-3 ">
                    <label class="font-medium" for="">
                        Bộ lọc
                    </label>
                    <div class=" border-2 border-gray-900 flex justify-between">
                        <select class="px-5 w-full py-2 focus-visible:outline-none">
                            <option value="">Tất cả bài giảng</option>
                            <option value="">Bài giảng hiện tại</option>
                        </select>
                    </div>
                </div>
                <div class=" w-1/3 flex flex-col gap-3 ">
                    <label class="font-medium" for="">
                        Sắp xếp theo
                    </label>
                    <div class=" border-2 border-gray-900 flex justify-between">
                        <select class="w-full px-5  py-2 focus-visible:outline-none">
                            <option value="">Theo đề xuất</option>
                            <option value="">Mới nhất</option>
                            <option value="">Bình chọn nhiều nhất</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <!-- Content -->
        <div class="mt-5">
            <h3 class="text-xl font-medium py-5">Thảo luận khóa học này </h3>
            <div class="flex flex-col gap-5">

                <!-- IS ME -->
                <div class="flex gap-3 ">
                    <div class="rounded-lg overflow-hidden w-20 h-20">
                        <img class="object-cover"
                            src="https://laracasts.nyc3.digitaloceanspaces.com/members/avatars/default/164.png" alt="">
                    </div>
                    <div class="flex items-end gap-3">

                        <textarea class="w-[600px] h-full bg-indigo-50 focus-visible:outline-none p-2 rounded-lg"
                            placeholder="Viết câu hỏi của bạn"></textarea>
                        <div class="">
                            <button class="bg-indigo-600 font-medium text-white px-4 py-1 rounded-lg">Gửi</button>
                        </div>
                    </div>
                </div>
                <!-- LIST YOU -->
                <div class="bg-indigo-950 rounded-lg p-3">
                    <div class=" flex gap-5">

                        <img class="object-cover rounded-lg w-20 h-20"
                            src="https://laracasts.nyc3.digitaloceanspaces.com/members/avatars/default/164.png" alt="">
                        <div class="flex flex-col ">
                            <div class="">
                                <h3 class="text-white leading-4 font-medium">
                                    DNABeast
                                </h3>
                                <span class="text-white text-sm">Đăng 3 ngày trước</span>
                            </div>
                            <p class="text-gray-100 mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Quasi cum
                                officiis perspiciatis
                                vitae sit magnam exercitationem minima eum necessitatibus repellat, laborum laboriosam
                                ut velit similique doloribus fugit voluptatum eaque. Amet?</p>
                            <div class="flex gap-3 mt-5">
                                <Button
                                    class="flex hover:bg-white hover:shadow-sm animation items-center gap-3 border-2 bg-slate-200 rounded-lg border-white px-2 py-1">
                                    <HeartIcon class="h-5 w-5 text-indigo-600" />
                                    <span class="text-indigo-600">4</span>
                                </Button>
                                <Button
                                    class="text-indigo-600 hover:shadow-sm hover:bg-white animation flex items-center gap-3 border-2 bg-slate-200 rounded-lg border-white px-2 py-1">
                                    Trả lời 4
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <Button variant="primary"> Xem thêm</Button>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { HeartIcon } from '@heroicons/vue/24/outline';


</script>

<style scoped></style>