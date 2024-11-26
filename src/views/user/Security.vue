<template>
    <div class="mb-20">
        <div class="">
            <form class="flex flex-col gap-3" action="" @submit.prevent="handleSubmit">
                <Input v-model="email" label="Email" type="email" :error="emailError ?? ''" placeholder="Nhập email " />
                <Input v-model="password" label="Mật khẩu" type="password" :error="passwordError ?? ''"
                    placeholder="Nhập mật khẩu" />
                <Input v-model="passwordnew" label="Mật khẩu mới" type="password" :error="passwordnewError ?? ''"
                    placeholder="Nhập mật khẩu mới" />
                <Input v-model="passwordconfirm" label="Xác nhận mật khẩu" type="password"
                    :error="passwordconfirmError ?? ''" placeholder="Xác nhận mật khẩu" />
                <div class="flex justify-end">
                    <Button variant="primary">Thay đổi</Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';

const email = ref('')
const emailError = ref<string | null>(null);
const password = ref('')
const passwordError = ref<string | null>(null);
const passwordnew = ref('')
const passwordnewError = ref<string | null>(null);
const passwordconfirm = ref('')
const passwordconfirmError = ref<string | null>(null);
const handleSubmit = () => {

    // Kiểm tra validation
    if (!email.value) {
        emailError.value = 'Bạn cần nhập email';
    }
    if (!password.value) {
        passwordError.value = 'Bạn cần nhập mật khẩu';
    }
    if (!passwordnew.value) {
        passwordnewError.value = 'Bạn cần nhập mật khẩu mới';
    }
    if (!passwordconfirm.value) {
        passwordconfirmError.value = 'Bạn cần nhập xác nhận';
    }
};

</script>

<style scoped></style>