<template>
    <div class="mx-20 my-5">
        <div class="">
            <button class="flex items-center justify-between w-full border-2 px-5 py-2 border-gray-900">
                <span class="text-gray-600">
                    Tạo ghi chú lúc 0:00
                </span>
                <PlusCircleIcon class="h-5 w-5" />
            </button>
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
        </div>
        <div class=" mt-5">
            <div class="flex justify-between">
                <div class="">
                    <button class="bg-gray-900 px-2 rounded-full font-medium text-white ">0:02</button>
                </div>
                <div class="flex flex-col">

                    <div class="flex justify-between gap-5 items-center">
                        <div class="flex items-end gap-3">
                            <h3 class="font-medium text-xl ">1. Bắt đầu</h3>
                            <span>7. Pages Router so với App Router - Một Framework, Hai Cách Tiếp Cận</span>
                        </div>
                        <div class="flex gap-2">
                            <button>
                                <TrashIcon class="h-5 w-5" />
                            </button>
                            <button>
                                <PencilSquareIcon class="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div class="w-full p-5 bg-indigo-50 rounded-lg mt-5">
                        <span>Đây là note</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";

</script>

<style scoped></style>