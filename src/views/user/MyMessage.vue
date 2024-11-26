<template>
    <div class="">
        <div class="flex gap-5">
            <div class="w-1/4 ">
                <div class="flex flex-col gap-5">
                    <!-- Search -->
                    <div class="">
                        <div class="w-full border border-indigo-600 rounded-full py-1 px-2">
                            <input type="text" class="focus-visible:outline-none" placeholder="Tìm kiếm ">
                        </div>
                    </div>
                    <!-- Item -->

                    <div class="flex flex-col gap-2 h-[70vh] overflow-y-auto  scrollable-container">
                        <div
                            class="border-s-4 border-s-indigo-600 flex cursor-pointer gap-2 p-2 rounded-md bg-indigo-50">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-indigo-600">hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>
                                    <el-badge :value="3" class="item ">
                                    </el-badge>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div
                            class="flex cursor-pointer gap-2 hover:border-s-4 hover:border-s-indigo-600 p-2 rounded-md hover:bg-indigo-50 animation">
                            <img class="w-10 h-10 rounded-md" :src="avt" alt="">
                            <div class="gap-2 w-full">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-sm font-medium">Hoang Thong</h3>
                                    <span class="text-[10px] text-gray-600">4 phút</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <p class="text-sm truncate w-24 text-gray-600">You: hello nguyen hoang thong,
                                        welcome to chanel
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-3/4">
                <header class="flex flex-col ">
                    <div class="flex gap-3 items-center">
                        <el-avatar :size="50" :src="avt" />
                        <div class="">
                            <h3 class="text-2xl leading-5 font-semibold text-gray-900">Hoang Thong</h3>
                            <span class="text-sm text-gray-600">admin@example.com</span>
                        </div>
                    </div>
                </header>
                <div class="bg-indigo-50 h-[70vh] p-2 rounded-lg mt-2 relative">
                    <!-- item  -->
                    <div class="flex flex-col gap-3 h-[55vh] overflow-y-auto  scrollable-container">
                        <div class="flex gap-2 items-end">
                            <el-avatar :size="30" :src="avt" />
                            <div class="p-2 text-gray-600 w-2/3 bg-white rounded-lg">
                                Hi John, I have enrolled in your "Melody Guitar Beginner Course". I have watched two
                                lesson and in my course list I can't see any progress. I think there is some issues.
                                Can
                                you please fix this issue. Thanks
                            </div>
                        </div>
                        <div class="flex gap-2 items-end flex-row-reverse">
                            <div class="p-2 bg-indigo-600 w-2/3 text-white rounded-lg">
                                Hi John, I have enrolled in your "Melody Guitar Beginner Course". I have watched two
                                lesson and in my course list I can't see any progress. I think there is some issues.
                                Can
                                you please fix this issue. Thanks
                            </div>
                        </div>
                        <div class="flex gap-2 items-end">
                            <el-avatar :size="30" :src="avt" />
                            <div class="p-2 text-gray-600 w-2/3 bg-white rounded-lg">
                                Hi John, I have enrolled in your "Melody Guitar Beginner Course". I have watched two
                                lesson and in my course list I can't see any progress. I think there is some issues.
                                Can
                                you please fix this issue. Thanks
                            </div>
                        </div>
                        <div class="flex gap-2 items-end flex-row-reverse">
                            <div class="p-2 bg-indigo-600 w-2/3 text-white rounded-lg">
                                Hi John, I have enrolled in your "Melody Guitar Beginner Course". I have watched two
                                lesson and in my course list I can't see any progress. I think there is some issues.
                                Can
                                you please fix this issue. Thanks
                            </div>
                        </div>

                    </div>
                    <div class="w-[98%] mt-4 px-2 rounded-md   p-1 bg-white flex items-center justify-between">
                        <div class="">
                            <textarea placeholder="Nhập tin nhắn"
                                class="focus-visible:outline-none h-[60px] overflow-hidden p-2 w-[380px] text-md"
                                name="" id=""></textarea>
                        </div>
                        <div class="flex gap-3 items-center">

                            <button class="bg-indigo-600 p-1 rounded-md">
                                <PaperAirplaneIcon class="h-6 w-6 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/vue/20/solid";

const avt = 'data:image/jpeg;base64,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'

</script>
