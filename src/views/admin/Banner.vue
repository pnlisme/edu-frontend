<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">Quản lý Banners</h1>
        <!-- Bộ lọc và Thêm mới -->
        <div class="mb-4 flex items-center gap-3">
            <el-input class="w-48" v-model="filters.keyword" placeholder="Tìm kiếm" clearable @input="fetchBanners" />
            <el-select class="w-48" v-model="filters.status" placeholder="Chọn trạng thái" clearable
                @change="fetchBanners">
                <el-option label="Hiện" value="1" />
                <el-option label="Ẩn" value="0" />
            </el-select>
            <el-button class="flex items-center gap-1" type="primary" @click="openDrawer">
                <PlusIcon class="h-5 w-5 text-white cursor-pointer" /> Thêm mới
            </el-button>
        </div>
        <!-- Bảng hiển thị -->
        <el-table :data="state.listBanner" class="mt-4" style="width: 100%;">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="position" label="Vị trí" />
            <el-table-column label="Hình ảnh">
                <template #default="{ row }">
                    <img :src="row.image_url" alt="Banner Image" class="h-16 w-auto rounded" />
                </template>
            </el-table-column>
            <el-table-column prop="status" label="Trạng thái">
                <template #default="{ row }">
                    <el-tag :type="row.status === 1 ? 'success' : 'info'">
                        {{ row.status === 1 ? 'Hiện' : 'Ẩn' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" width="180">
                <template #default="{ row }">
                    <div class="flex gap-2">
                        <PencilSquareIcon class="cursor-pointer h-5 w-5 text-blue-500" @click="openUpdateDrawer(row)" />
                        <TrashIcon class="cursor-pointer h-5 w-5 text-red-500" @click="handleDelete(row.id)" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- Phân trang -->
        <div class="mt-4 flex justify-center">
            <el-pagination v-model:current-page="pagination.currentPage" :page-size="pagination.perPage"
                :total="pagination.total" layout="prev, pager, next" @current-change="handlePageChange" />
        </div>
        <!-- Drawer tạo/cập nhật -->
        <el-dialog v-model="drawerVisible" title="Thêm/Cập nhật Banner">
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Vị trí</label>
                    <el-input v-model="bannerForm.position" placeholder="Nhập vị trí (header, footer, etc.)" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Hình ảnh</label>
                    <el-upload list-type="picture-card" :auto-upload="false" :file-list="fileList"
                        :on-change="handleFileChange" :on-remove="handleRemoveImage" :before-upload="handleFileChange"
                        accept="image/*" :limit="1">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng thái</label>
                    <el-select v-model="bannerForm.status" placeholder="Chọn trạng thái">
                        <el-option label="Hiện" value="1" />
                        <el-option label="Ẩn" value="0" />
                    </el-select>
                </div>
                <el-button type="primary" native-type="submit">Lưu</el-button>
            </form>
        </el-dialog>
    </div>
    <Loading :active="state.loading" :is-full-page="true" />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useBanner } from '@/store/banner'; // Store quản lý banners
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { Plus, UploadFilled } from '@element-plus/icons-vue';
import Loading from 'vue-loading-overlay';
const bannerStore = useBanner();
const { state, listBanner, createBanner, updateBanner, deleteBanner } = bannerStore;
// Quản lý bộ lọc
const filters = reactive({
    keyword: '',
    status: '',
});

// Quản lý phân trang
const pagination = reactive({
    currentPage: 1,
    perPage: 10,
    total: 0,
});
const fileList = ref<any[]>([])
// Form dữ liệu cho Banner
const bannerForm = reactive({
    id: null,
    type: 'banner',
    position: '',
    image: '',
    status: 1,
});
const resetForm = () => {
    Object.assign(bannerForm, {
        id: null,
        type: 'banner',
        position: '',
        image: '',
        status: 1,
    });
    fileList.value = [];
};
const handleRemoveImage = () => {
    fileList.value = [] // Xóa danh sách file
    bannerForm.image = '' // Xóa file khỏi form
}
const handleFileChange = (file: any, fileListParam: any[]) => {
    fileList.value = fileListParam // Cập nhật danh sách file
    if (file.raw) {
        bannerForm.image = file.raw // Gắn file thực tế vào form
    }
}

// Hiển thị drawer
const drawerVisible = ref(false);

// Xử lý tải danh sách banner
const fetchBanners = async () => {
    const params = {
        per_page: pagination.perPage,
        page: pagination.currentPage,
        keyword: filters.keyword,
        status: filters.status,
    };
    await listBanner();
    pagination.total = state.total;
};

// Mở drawer thêm Banner
const openDrawer = () => {
    resetForm();
    drawerVisible.value = true;
};

// Mở drawer cập nhật Banner
const openUpdateDrawer = (banner: any) => {
    Object.assign(bannerForm, banner);
    drawerVisible.value = true;
};

// Tải lên fil

// Lưu Banner
const handleSubmit = async () => {
    if (bannerForm.id) {
        await updateBanner(bannerForm.id, bannerForm);
    } else {
        await createBanner(bannerForm);
    }
    resetForm();
    drawerVisible.value = false; // Đóng drawer
};

// Xóa Banner
const handleDelete = async (id: number) => {
    await deleteBanner(id);
};

// Phân trang
const handlePageChange = (page: number) => {
    pagination.currentPage = page;
    fetchBanners();
};

// Tải dữ liệu ban đầu
onMounted(() => {
    fetchBanners();
});
</script>
