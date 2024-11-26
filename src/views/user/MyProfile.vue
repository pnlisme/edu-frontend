<template>
    <div class="mb-20">
        <main>
            <form class="flex flex-col gap-3" action="" @submit.prevent="handleSubmit">
                <Input v-model="fullname" label="Họ và tên" type="text" :error="fullnameError ?? ''"
                    placeholder="Nhập họ và tên " />
                <div class="grid grid-cols-2 gap-5">
                    <Input v-model="linkweb" label="Website" type="text" placeholder="https://" />
                    <Input v-model="facebook" label="Facebook" type="text" placeholder="" />
                    <Input v-model="twitter" label="Twitter" type="text" placeholder="" />
                    <Input v-model="linkedin" label="Linkedin" type="text" placeholder="" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="language" class="text-lg font-medium">Ngôn ngữ</label>
                    <select v-model="language" id="language" class="border-2 border-gray-300 p-2 rounded-lg">
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">Tiếng Anh</option>
                        <option value="fr">Tiếng Pháp</option>
                        <option value="ja">Tiếng Nhật</option>
                    </select>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="" class="text-lg font-medium">Giới thiệu</label>
                    <textarea class="border-2 rounded-lg h-32 p-2" v-model="biography"
                        placeholder="Giới thiệu bản thân">
                </textarea>
                </div>
                <div class="flex justify-end">
                    <Button variant="primary">Thay đổi</Button>
                </div>
            </form>
        </main>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';
const fullname = ref('')
const fullnameError = ref<string | null>(null);
const linkweb = ref('')
const facebook = ref('')
const twitter = ref('')
const linkedin = ref('')
const biography = ref('')
const language = ref('vi')
const handleSubmit = () => {
    if (!fullname.value) {
        fullnameError.value = "Bạn cần nhập họ và tên"
    }
}
</script>

<style scoped></style>