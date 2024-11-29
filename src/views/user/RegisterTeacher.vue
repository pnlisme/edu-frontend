<template>
    <div>
        <main class="container-user my-16">
            <div class="flex flex-col">
                <img src="https://demo.creativeitem.com/academy/uploads/system/home-1.png" alt="">
                <div class="flex justify-center mt-10">

                    <button @click="handleRegisterTeacher"
                        class="!py-4 text-lg hover:shadow-md hover:shadow-indigo-200 rounded-md lg:rounded-lg font-medium lg:py-2  px-4 lg:text-md lg:px-6 text-white transition ease-in-out bg-indigo-500   hover:bg-indigo-600 duration-300">
                        Trở thành giảng viên ngay
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
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


</script>

<style scoped></style>