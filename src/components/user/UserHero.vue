<template>
    <section class="background-section">
        <div class="container-user">
            <div class="flex md:flex-row flex-col-reverse items-center justify-between py-10">
                <div class=" flex flex-col md:w-1/2 gap-4 text-center md:text-start mt-5 ">
                    <h1 class="lg:text-[36px] text-[24px]  font-bold  lg:w-3/4">Đừng chỉ duyệt web hãy thiết kế nó </h1>
                    <span class="lg:text-lg md:text-md lg:w-3/4">Học thiết kế web, từ những điều cơ bản về trải nghiệm
                        người dùng đến
                        thiết kế
                        đồ họa.
                        <RouterLink to="/">
                            <span class="text-blue-600 underline">
                                Làm mới lại kỹ năng của bạn.
                            </span>
                        </RouterLink>
                    </span>
                    <div class="">
                        <Router-link to="/course">
                            <Button variant="primary">Tham gia ngay</Button></Router-link>
                    </div>
                </div>

                <img class="w-1/2" :src="imgBaner" alt="">
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
    background-image: url('../../assets/images/Banner.png');
    /* Update this path to your image */

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* height: 70vh; */
    /* or any other height you need */
}
</style>
