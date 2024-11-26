<template>
    <section class="background-section">
        <div class="container px-5 md:px-10 lg:px-40 mx-auto">
            <div class="flex md:flex-row flex-col items-center justify-between py-10 ">
                <div class=" flex flex-col md:w-2/3 gap-4 text-center md:text-start mt-5 ">
                    <h1 class="text-gray-900 lg:text-[36px] text-[24px] leading-[50px] font-bold  lg:w-3/4">
                        Tìm hiểu về
                        các khóa học
                        mới
                        nhất với
                        <span class=" text-white md:text-indigo-600 ">bản tin học viện</span>
                    </h1>

                </div>

                <div class="">
                    <div class="bg-white px-3 flex rounded-lg shadow-lg p-2">
                        <input class="focus-visible:outline-none border-none py-1 px-5" type="text"
                            placeholder="Nhập Email của bạn">
                        <button type="submit" class="rounded-lg text-white bg-gray-900 px-6">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import imgBaner from '../../assets/images/OBJECTS.png'

</script>
<style scoped>
.background-section {
    background-image: url('../../assets/images/newsletter.png');
    /* Update this path to your image */
    background-size: cover;
    background-position: right;
    background-repeat: no-repeat;
    /* or any other height you need */
}
</style>
