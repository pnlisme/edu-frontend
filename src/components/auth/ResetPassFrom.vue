<template>
    <div>
        <Loading :active="loading" :is-full-page="true" />
        <form @submit.prevent="handleResetPassword">
            <Input label="Mật khẩu" v-model="password" type="password" id="password" placeholder="Nhập mật khẩu mới"
                :errorMessages="passwordError" />
            <div class="flex justify-end">
                <Button variant="primary" class="mt-3 !px-3 !py-2" type="submit">Đặt lại mật khẩu</Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import Input from '../ui/input/Input.vue';
import Button from '../ui/button/Button.vue';
import Loading from 'vue-loading-overlay';
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const password = ref<string>('')
const passwordError = ref<string | null>(null)
const loading = ref(false)
const token = Array.isArray(route.params.token) ? route.params.token[0] : route.params.token
const validateForm = (): boolean => {
    let isValid = true


    if (!password.value) {
        passwordError.value = 'Mật khẩu không được để trống'
        isValid = false
    } else if (password.value.length < 8) {
        passwordError.value = 'Mật khẩu phải có ít nhất 8 ký tự'
        isValid = false
    } else {
        passwordError.value = null
    }

    return isValid
}



watch(password, (newVal) => {
    if (newVal && newVal.length >= 8) passwordError.value = ''
})
const handleResetPassword = async () => {
    if (!validateForm()) return
    if (!token || typeof token !== 'string') {
        ElNotification({
            title: 'Lỗi',
            message: 'Token không hợp lệ',
            type: 'error'
        })
        return
    }
    loading.value = true
    try {
        const response = await authStore.resetPass(token, password.value)
        ElNotification({
            title: 'Thành công',
            message: 'Mật khẩu đã được đặt lại thành công',
            type: 'success'
        })
        if (response.status === 'OK') {
            router.push('/')
            localStorage.setItem('redirectAfterLogin', '/')
        }
    } catch (error) {
        ElNotification({
            title: 'Lỗi',
            message: 'Đặt lại mật khẩu thất bại',
            type: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>
