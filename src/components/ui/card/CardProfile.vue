<template>
    <div>
        <div class=" group relative gap-1 animation flex flex-col items-center justify-center">
            <img class="rounded-[50%] w-[150px] h-[150px] object-cover" :src="image" alt="">
            <div @click="centerDialogVisible = true"
                class="hidden group-hover:block animation rounded-[50%] w-[150px] h-[150px] absolute top-0">
                <div
                    class=" cursor-pointer flex justify-center flex-col items-center w-full h-full rounded-[50%] bg-gray-950 bg-opacity-35">
                    <span class="text-white">Tải ảnh lên</span>
                    <CloudArrowUpIcon class="h-6 w-6 text-white" />
                </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Hoang Thong</h3>
            <span class="text-xl text-gray-600">student@example.com</span>
        </div>
    </div>
    <el-dialog v-model="centerDialogVisible" title="Tải hình ảnh" width="500">
        <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
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
            <Button variant="primary">Tải lên</Button>
        </div>
    </el-dialog>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { CloudArrowUpIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import Button from '../button/Button.vue';
const image = 'https://demo.creativeitem.com/academy-laravel/public/assets/upload/users/student/josel-vosus-1716716132.jpg'
const centerDialogVisible = ref(false)
</script>
