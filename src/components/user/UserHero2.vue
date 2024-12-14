<template>
    <section class="bg-indigo-100">
        <div class="container-user">
            <div class="flex md:flex-row flex-col items-center justify-between py-10">
                <!-- <img class="w-1/2" :src="imgBaner" alt=""> -->
                <img v-if="headerBanner" class="lg:w-2/5 w-2/3" :src="headerBanner.image_url" alt="Banner Image" />
                <!-- Hiển thị hình ảnh mặc định nếu không có banner -->
                <img v-else class="lg:w-2/5 w-2/3" :src="imgBaner" alt="Default Banner" />
                <div class=" flex flex-col md:w-1/2 gap-4 text-center md:text-start mt-5 ">
                    <h1 class="lg:text-[36px] text-[24px]  font-bold  lg:w-3/4">Trở thành giảng viên ngay hôm nay </h1>
                    <span class="text-md text-gray-500  md:text-md lg:w-3/4">Học thiết kế web, từ những điều cơ bản về
                        trải nghiệm
                        Giảng viên trên khắp thế giới giảng dạy hàng triệu học viên trên Udemy. Chúng tôi cung cấp công
                        cụ và kỹ năng để dạy những gì bạn yêu thích.
                    </span>
                    <div class="">
                        <RouterLink to="/register-teacher">
                            <Button variant="primary">Tham gia ngay</Button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import imgBaner from '../../assets/images/OBJECTS2.png'
import { useBanner } from '@/store/banner';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
const bannerStore = useBanner();
const { listBanner } = bannerStore;
const { state } = storeToRefs(bannerStore)
const headerBanner = computed(() => {
    return state.value.listBanner
        .filter((item: any) => item.position === 'footer' && item.status === 1)[0] || null;
});
onMounted(async () => {
    await listBanner();
})
</script>
