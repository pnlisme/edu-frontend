<template>
    <form class="flex flex-col gap-3" @submit.prevent="handleSubmitProfile">
        <div class="grid grid-cols-2 gap-5">
            <Input v-model="formData.first_name" label="Họ" placeholder="Nhập họ" />
            <Input v-model="formData.last_name" label="Tên" placeholder="Nhập tên" />
        </div>
        <div class="grid grid-cols-2 gap-5">
            <Input v-model="formData.contact_info.website" label="Website" placeholder="https://" />
            <Input v-model="formData.contact_info.linked" label="LinkedIn" placeholder="LinkedIn" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-lg font-medium">Giới thiệu</label>
            <textarea class="border-2 rounded-lg h-32 p-2" v-model="formData.biography"
                placeholder="Giới thiệu bản thân"></textarea>
        </div>
        <div class="flex justify-end">
            <Button variant="primary">Thay đổi</Button>
        </div>
    </form>
</template>



<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { defineProps, defineEmits } from 'vue';
import type { TUpdateUser } from '@/interfaces';
import { useUpdateProfile } from '@/composables/user/useUpdateProfile';

// Định nghĩa props và emits
const props = defineProps<{ dataUser: TUpdateUser }>();
const emit = defineEmits(['update-success']);

// Sử dụng composable để lấy formData và handleSubmit
const { formData, handleSubmitProfile } = useUpdateProfile(props.dataUser, emit);
</script>
