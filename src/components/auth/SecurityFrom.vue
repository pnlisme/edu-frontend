<template>
    <form class="flex flex-col gap-3" action="" @submit.prevent="handleSubmit">
        <Input v-model="email" label="Email" type="email" :error="emailError ?? ''" placeholder="Nhập email" readonly
            disabled />
        <Input v-model="passwordnew" label="Mật khẩu mới" type="password" :error="passwordnewError ?? ''"
            placeholder="Nhập mật khẩu mới" />

        <!-- Xác nhận mật khẩu mới -->
        <Input v-model="passwordconfirm" label="Xác nhận mật khẩu" type="password" :error="passwordconfirmError ?? ''"
            placeholder="Xác nhận mật khẩu mới" />

        <div class="flex justify-end">
            <Button variant="primary">Thay đổi</Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { useUpdateProfile } from '@/composables/user/useUpdateProfile';
import type { TUpdateUser } from '@/interfaces/user.interface';
import { ref } from 'vue';

const emailError = ref<string | null>(null);


const props = defineProps<{ dataUser: TUpdateUser }>();
const email = props.dataUser.email
const emit = defineEmits(['update-success']);
const {
    passwordnew,
    passwordconfirm,
    passwordnewError,
    passwordconfirmError,
    handleSubmit
} = useUpdateProfile(props.dataUser, emit);
</script>
