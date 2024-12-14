<template>
    <div>
        <main class="container-user my-16">
            <div class="flex flex-col">
                <!-- <img class="w-1/2" :src="imgBaner" alt=""> -->
                <img v-if="headerBanner" class="w-4/5 mx-auto" :src="headerBanner.image_url" alt="Banner Image" />

                <img v-else src="https://demo.creativeitem.com/academy/uploads/system/home-1.png" alt="">
                <div class="flex justify-center mt-10">

                    <button @click="handleRegisterTeacher"
                        class="!py-3 text-sm hover:shadow-md hover:shadow-indigo-200 rounded-md lg:rounded-lg font-medium lg:py-2  px-4 lg:text-md lg:px-6 text-white transition ease-in-out bg-indigo-500   hover:bg-indigo-600 duration-300">
                        Trở thành giảng viên ngay
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useBanner } from '@/store/banner';
import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const userRole = state.value.user?.role
const router = useRouter()
const handleRegisterTeacher = async () => {
    const data = {
        role: 'instructor'
    }
    if (userRole === 'student') {
        await authStore.updateProfileTeacher(data.role)
        ElNotification({
            title: 'Thành công',
            message: 'Đăng ký thành công',
            type: 'success'
        })
        router.push('/teacher')
    }
    else if (userRole === 'instructor') {
        router.push('/teacher')
    }
    else {
        router.push('/login')
        ElNotification({
            title: 'Cảnh báo',
            message: 'Bạn cần đăng nhập để tiếp tục!',
            type: 'warning'
        })
    }
}
const bannerStore = useBanner();
const { listBanner } = bannerStore;
const { state: bannerState } = storeToRefs(bannerStore)
const headerBanner = computed(() => {
    return bannerState.value.listBanner
        .filter((item: any) => item.position === 'teacher' && item.status === 1)[0] || null;
});
onMounted(async () => {
    await listBanner();
})
</script>

<style scoped></style>