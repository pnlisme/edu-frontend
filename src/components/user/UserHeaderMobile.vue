<template>
    <div class="block xl:hidden ">

        <div
            class=" z-50 fixed bottom-0 shadow-indigo-600  drop-shadow-2xl w-full bg-white p-4 text-white flex justify-between items-center">
            <div class="container-user flex gap-3  items-center justify-between">

                <div class="flex items-center cursor-pointer    flex-col">
                    <HomeIcon class="h-6 w-6 text-indigo-600" />
                    <span class="text-indigo-600 text-[10px] font-medium">
                        Trang chủ
                    </span>
                </div>

                <div class="flex items-center cursor-pointer group   flex-col">
                    <MagnifyingGlassIcon class="h-6 w-6 text-gray-900 group-hover:text-indigo-600 animation" />
                    <span class="text-gray-900 text-[10px] group-hover:text-indigo-600 animation font-medium">
                        Tìm kiếm
                    </span>
                </div>
                <div class="flex items-center cursor-pointer group   flex-col">
                    <InboxStackIcon class="h-6 w-6 text-gray-900 group-hover:text-indigo-600 animation" />
                    <span class="text-gray-900 text-[10px] group-hover:text-indigo-600 animation font-medium">
                        Thể loại
                    </span>
                </div>
                <div class="flex items-center cursor-pointer group   flex-col">
                    <ShoppingCartIcon class="h-6 w-6 text-gray-900 group-hover:text-indigo-600 animation" />
                    <span class="text-gray-900 text-[10px] font-medium group-hover:text-indigo-600 animation">
                        Giỏ hàng
                    </span>
                </div>
                <div class="flex items-center cursor-pointer group   flex-col">
                    <UserIcon class="h-6 w-6 text-gray-900 group-hover:text-indigo-600 animation" />
                    <span class="text-gray-900 text-[10px] font-medium group-hover:text-indigo-600 animation">
                        Cá nhân
                    </span>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HomeIcon, ShoppingCartIcon, UserIcon, InboxStackIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";


</script>
