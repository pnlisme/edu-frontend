<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">Quản lý Course Levels</h1>
        <!-- Nút thêm mới -->
        <div class="mb-4 flex  items-center gap-3">
            <el-input class="w-48" v-model="filters.keyword" placeholder="Tìm kiếm" clearable @input="fetchLevel" />
            <el-select class="w-48 " v-model="filters.status" placeholder="Chọn trạng thái" clearable
                @change="fetchLevel">
                <el-option label="Hoạt động" value="active" />
                <el-option label="Không hoạt động" value="inactive" />
            </el-select>
            <div class="flex">
                <el-button class="flex items-center gap-1" type="primary" @click="openDrawer">
                    <PlusIcon class="h-5 w-5 text-white cursor-pointer" />Thêm mới
                </el-button>
                <el-button class="flex items-center gap-1" type="success" @click="openDeletedCourseLevelsDialog">
                    <ArrowPathIcon class="h-5 w-5 text-white cursor-pointer" />
                    Xem đã xóa
                </el-button>
            </div>
        </div>
        <!-- Bảng hiển thị -->
        <el-table :data="levelStore.state.courseLevelsCRUD" class="mt-4">
            <el-table-column prop="name" label="Tên" />
            <el-table-column class="" prop="status" label="Trạng thái" />
            <el-table-column label="Hành động">
                <template #default="{ row }">
                    <el-button @click="openUpdateDrawer(row)">Sửa</el-button>
                    <el-button @click="handleDelete(row.id)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-4 flex justify-center">
            <el-pagination v-model:current-page="pagination.currentPage" :page-size="pagination.perPage"
                :total="pagination.total" layout="prev, pager, next" @current-change="handlePageChange" />
        </div>
        <!-- Drawer tạo/cập nhật -->
        <el-dialog v-model="drawerVisible" title="Tạo/Cập nhật Course Level">
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Tên Cấp độ</label>
                    <el-input v-model="courseLevelForm!.name" placeholder="Nhập tên" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng Thái</label>
                    <el-select v-model="courseLevelForm!.status" placeholder="Chọn trạng thái">
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
                    <label class="block text-sm font-medium">Tên Cấp độ</label>
                    <el-input v-model="courseLevelForm!.name" placeholder="Nhập tên" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng Thái</label>
                    <el-select v-model="courseLevelForm!.status" placeholder="Chọn trạng thái">
                        <el-option label="Hoạt động" value="active" />
                        <el-option label="Không hoạt động" value="inactive" />
                    </el-select>
                </div>
                <el-button type="primary" native-type="submit">Lưu</el-button>
            </form>
        </el-dialog>

        <el-dialog v-model="deletedCourseLevelsDialogVisible" title="Danh sách đã xóa">
            <el-table :data="levelStore.state.deletedCourseLevels">
                <el-table-column prop="name" label="Tên" />
                <el-table-column label="Hành động">
                    <template #default="{ row }">
                        <el-button @click="restoreCourseLevel(row.id)">Khôi phục</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useCourseLevel } from '@/composables/admin/useCourseLevel';
import { ArrowPathIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { onMounted, reactive } from 'vue';


const {
    levelStore,
    drawerVisible,
    updateDrawerVisible,
    deletedCourseLevelsDialogVisible,
    courseLevelForm,
    openDrawer,
    openUpdateDrawer,
    openDeletedCourseLevelsDialog,
    handleSubmit,
    handleDelete,
    handleUpdate,
    restoreCourseLevel,
} = useCourseLevel();
const filters = reactive({
    keyword: '',
    status: '',
});

const pagination = reactive({
    currentPage: 1,
    perPage: 10,
    total: 0,
});

const fetchLevel = async () => {
    const params = {
        per_page: pagination.perPage,
        page: pagination.currentPage,
        keyword: filters.keyword,
        status: filters.status,
        deleted: 0,
    };
    await levelStore.fetchCourseLevelsCURD(params);
    pagination.total = levelStore.state.total;
};
const handlePageChange = (page: number) => {
    pagination.currentPage = page;
    fetchLevel();
};
onMounted(() => {
    fetchLevel();
});
</script>