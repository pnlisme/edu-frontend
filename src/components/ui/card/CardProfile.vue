<template>
    <div class="">
        <div>
            <div class=" group relative gap-1 animation flex flex-col items-center justify-center">
                <img class="rounded-[50%] w-[150px] h-[150px] object-cover" :src="userAvatar" alt="">
                <div @click="centerDialogVisible = true"
                    class="hidden group-hover:block animation rounded-[50%] w-[150px] h-[150px] absolute top-0">
                    <div
                        class=" cursor-pointer flex justify-center flex-col items-center w-full h-full rounded-[50%] bg-gray-950 bg-opacity-35">
                        <span class="text-white">Tải ảnh lên</span>
                        <CloudArrowUpIcon class="h-6 w-6 text-white" />
                    </div>
                </div>
                <h3 class="text-xl text-center font-bold text-gray-900">{{ dataUser?.first_name }} {{
                    dataUser?.last_name }}
                </h3>
                <span class="text-lg text-gray-600">{{ dataUser?.email }}</span>
            </div>
        </div>
        <el-dialog v-model="centerDialogVisible" title="Tải hình ảnh" width="500">
            <el-upload class="upload-demo" drag action="" :http-request="uploadImage" :multiple="false" :limit="1"
                :auto-upload="false" :before-upload="beforeUpload" ref="uploadRef">
                <el-icon class="el-icon--upload">
                    <UploadFilled />
                </el-icon>
                <div class="el-upload__text">
                    Thả tệp vào đây hoặc <em>nhấp để tải lên</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        tệp jpg/png có kích thước nhỏ hơn 500kb
                    </div>
                </template>
            </el-upload>
            <div class="flex justify-end">
                <Button variant="primary" @click="submitUpload">Tải lên</Button>
            </div>
        </el-dialog>
        <Loading :active="loading" :is-full-page="true" />
    </div>

</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { CloudArrowUpIcon } from '@heroicons/vue/20/solid';
import { ref, watch } from 'vue';
import Button from '../button/Button.vue';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';
import type { TUserAuth } from '@/interfaces';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';
// const image = 'https://demo.creativeitem.com/academy-laravel/public/assets/upload/users/student/josel-vosus-1716716132.jpg'
const centerDialogVisible = ref(false)


const props = defineProps<{
    dataUser: TUserAuth | null
}>()

const authStore = useAuthStore()
// const { userData } = storeToRefs(authStore)
// const userAvatar = props.dataUser?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const userAvatar = ref(
    authStore.state.user?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
);




// Hàm kiểm tra kích thước tệp trước khi tải lên
const beforeUpload = (file: File) => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPGorPNG) {
        ElNotification({
            title: 'Lỗi',
            message: 'Chỉ chấp nhận định dạng JPG/PNG!',
            type: 'error',
        });
    }
    if (!isLt2M) {
        ElNotification({
            title: 'Lỗi',
            message: 'Kích thước ảnh phải nhỏ hơn 2MB!',
            type: 'error',
        });
    }
    return isJPGorPNG && isLt2M;
};
const uploadRef = ref();
const loading = ref(false);
// Hàm tải ảnh lên
const uploadImage = async (file: any) => {
    try {
        loading.value = true;
        const formData = new FormData();
        formData.append('image', file.file);

        // Gửi yêu cầu POST để tải ảnh lên
        const response = await authStore.uploadProfileImage(formData);
        if (response && response.status === 'OK') {
            ElNotification({
                title: 'Thành công',
                message: 'Cập nhật hình ảnh thành công!',
                type: 'success',
            });
            centerDialogVisible.value = false;
            authStore.userData(); // Tải lại thông tin người dùng
        } else {
            throw new Error('Cập nhật hình ảnh thất bại');
        }
    } catch (error) {
        ElNotification({
            title: 'Lỗi',
            message: 'Đã xảy ra lỗi',
            type: 'error',
        });
    } finally {
        loading.value = false; // Tắt loading overlay
    }
};

// Hàm để kích hoạt tải lên
const submitUpload = () => {
    if (uploadRef.value) {
        uploadRef.value.submit(); // Kích hoạt submit của el-upload
    }
};
watch(
    () => authStore.state.user?.avatar,
    (newAvatar) => {
        if (newAvatar) {
            userAvatar.value = newAvatar;
        }
    }
);
</script>
