<template>
    <div class="p-4">
        <h1 class="text-xl font-bold  mb-4">Quản lý Languages</h1>
        <div class="mb-4 flex  items-center gap-3">
            <el-input class="w-48" v-model="filters.keyword" placeholder="Tìm kiếm" clearable @input="fetchLanguages" />
            <el-select class="w-48 " v-model="filters.status" placeholder="Chọn trạng thái" clearable
                @change="fetchLanguages">
                <el-option label="Hoạt động" value="active" />
                <el-option label="Không hoạt động" value="inactive" />
            </el-select>
            <div class="flex">

                <el-button class="flex items-center gap-1" type="primary" @click="openDrawer">
                    <PlusIcon class="h-5 w-5 text-white cursor-pointer" />Thêm mới
                </el-button>
                <el-button class="flex items-center gap-1" type="success" @click="openDeletedLanguagesDialog">
                    <ArrowPathIcon class="h-5 w-5 text-white cursor-pointer" />Xem đã xóa
                </el-button>
            </div>
        </div>

        <el-table :data="languageStore.state.languagesCRUD" class="mt-4">
            <el-table-column prop="name" label="Tên" />
            <el-table-column prop="description" label="Mô tả" />
            <el-table-column prop="status" label="Trạng thái" />
            <el-table-column label="Hành động">
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
        <!-- Drawer -->
        <el-dialog v-model="drawerVisible" title="Thêm Ngôn Ngữ">
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Tên ngôn ngữ</label>
                    <el-input v-model="languageForm.name" placeholder="Tên ngôn ngữ" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Mô tả</label>
                    <el-input v-model="languageForm.description" placeholder="Mô tả" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng thái</label>
                    <el-select v-model="languageForm.status" placeholder="Trạng thái">
                        <el-option label="Hoạt động" value="active" />
                        <el-option label="Không hoạt động" value="inactive" />
                    </el-select>
                </div>
                <el-button type="primary" native-type="submit">Lưu</el-button>
            </form>
        </el-dialog>
        <el-dialog v-model="updateDrawerVisible" title="Tạo/Cập nhật Course Level">
            <form @submit.prevent="handleUpdate">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Tên ngôn ngữ</label>
                    <el-input v-model="languageForm.name" placeholder="Tên ngôn ngữ" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Mô tả</label>
                    <el-input v-model="languageForm.description" placeholder="Mô tả" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng thái</label>
                    <el-select v-model="languageForm.status" placeholder="Trạng thái">
                        <el-option label="Hoạt động" value="active" />
                        <el-option label="Không hoạt động" value="inactive" />
                    </el-select>
                </div>
                <el-button type="primary" native-type="submit">Lưu</el-button>
            </form>
        </el-dialog>
        <!-- Dialog đã xóa -->
        <el-dialog v-model="deletedLanguagesDialogVisible" title="Danh sách đã xóa">
            <el-table :data="languageStore.state.deletedLanguages">
                <el-table-column prop="name" label="Tên" />
                <el-table-column prop="description" label="Mô tả" />
                <el-table-column label="Hành động">
                    <template #default="{ row }">
                        <el-button type="text" @click="restoreLanguage(row.id)">Khôi phục</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables/admin/useLanguage';
import { ArrowPathIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { onMounted, reactive } from 'vue';

const {
    languageStore,
    drawerVisible,
    updateDrawerVisible,
    deletedLanguagesDialogVisible,
    languageForm,
    openDrawer,
    openUpdateDrawer,
    handleUpdate,
    openDeletedLanguagesDialog,
    handleSubmit,
    handleDelete,
    restoreLanguage,
} = useLanguage();
const filters = reactive({
    keyword: '',
    status: '',
});

const pagination = reactive({
    currentPage: 1,
    perPage: 10,
    total: 0,
});

const fetchLanguages = async () => {
    const params = {
        per_page: pagination.perPage,
        page: pagination.currentPage,
        keyword: filters.keyword,
        status: filters.status,
        deleted: 0,
    };
    await languageStore.fetchLanguagesCURD(params);
    pagination.total = languageStore.state.total;
};
const handlePageChange = (page: number) => {
    pagination.currentPage = page;
    fetchLanguages();
};
onMounted(() => {
    fetchLanguages();
});
</script>