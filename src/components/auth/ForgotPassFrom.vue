<template>
    <div>
        <Loading :active="loading" :is-full-page="true" />
        <form @submit.prevent="handleForgotPassword">

            <Input label="Email" v-model="email" type="email" id="email" placeholder="Nhập email của bạn"
                :errorMessages="emailError" />
            <div class="flex justify-end">

                <Button variant="primary" class="mt-3 !px-3 !py-2" type="submit">Gửi yêu cầu</Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/store/auth'
import { ElNotification } from 'element-plus'
import Input from '../ui/input/Input.vue';
import Button from '../ui/button/Button.vue';
import { useRouter } from 'vue-router';
import Loading from 'vue-loading-overlay';
const router = useRouter()
const authStore = useAuthStore()
const email = ref<string>('')
const emailError = ref<string | null>(null)
const loading = ref(false)
const validateForm = (): boolean => {
    let isValid = true

    if (!email.value) {
        emailError.value = 'Email không được để trống'
        isValid = false
    } else {
        emailError.value = null
    }
    return isValid
}
watch(email, (newVal) => {
    if (newVal) emailError.value = ''
})

const handleForgotPassword = async () => {
    if (!validateForm()) return
    loading.value = true
    try {
        const response = await authStore.forgotPass(email.value)
        ElNotification({
            title: 'Thành công',
            message: 'Yêu cầu đặt lại mật khẩu đã được gửi',
            type: 'success'
        })
        console.log(response)
        if (response.status === 'OK') {
            router.push('/login')
        }
    } catch (error) {
        ElNotification({
            title: 'Lỗi',
            message: 'Có lỗi xảy ra trong quá trình gửi yêu cầu',
            type: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>
