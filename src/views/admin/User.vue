<template>
    <div class="p-6">
        <h1 class="text-xl font-bold mb-6">Quản lý người dùng</h1>
        <div class="mb-6 flex items-center gap-4">
            <el-input class="w-72" v-model="filters.keyword" placeholder="Tìm kiếm theo email hoặc tên" clearable
                @input="fetchUsers" />
            <el-select class="w-48" v-model="filters.role" placeholder="Chọn vai trò" clearable @change="fetchUsers">
                <el-option label="Học viên" value="student" />
                <el-option label="Giảng viên" value="instructor" />
                <el-option label="Admin" value="admin" />
            </el-select>
            <el-select class="w-48" v-model="filters.status" placeholder="Chọn trạng thái" clearable
                @change="fetchUsers">
                <el-option label="Hoạt động" value="active" />
                <el-option label="Không hoạt động" value="inactive" />
            </el-select>
            <div class="flex">

                <el-button class="flex items-center gap-1" type="primary" @click="openDrawer">
                    <PlusIcon class="h-5 w-5 text-white cursor-pointer" />Thêm mới
                </el-button>
                <el-button class="flex items-center gap-1" type="success" @click="openDeletedUserDialog">
                    <ArrowPathIcon class="h-5 w-5 text-white cursor-pointer" />Xem đã xóa
                </el-button>
            </div>
        </div>


        <!-- Bảng người dùng -->
        <el-table :data="userStore.state.allUser" class="w-full" @sort-change="handleSortChange">
            <el-table-column prop="avatar" label="Avatar" width="100">
                <template #default="{ row }">
                    <img :src="row.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                        alt="avatar" class="h-12 w-12 rounded-full" />
                </template>
            </el-table-column>
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="first_name" label="Họ" sortable />
            <el-table-column prop="last_name" label="Tên" sortable />
            <el-table-column prop="role" label="Vai trò" sortable />
            <el-table-column prop="status" label="Trạng thái">
                <template #default="{ row }">
                    <el-tag :type="row.status === 'active' ? 'success' : 'info'">
                        {{ row.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Hành động">
                <template #default="{ row }">
                    <el-button @click="openUpdateDrawer(row)">Sửa</el-button>
                    <el-button type="danger" @click="handleDelete(row.id)">Xóa mềm</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- Phân trang -->

        <div class="mt-4 flex justify-center">
            <el-pagination v-model:current-page="pagination.currentPage" :page-size="pagination.perPage"
                :total="pagination.total" layout="prev, pager, next" @current-change="handlePageChange" />
        </div>
        <!-- Tao nguoi dung  -->
        <!-- Drawer Create-->
        <el-dialog v-model="drawerVisible" title="Tạo Người Dùng">
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Họ</label>
                    <el-input v-model="userForm.first_name" placeholder="Nhập họ" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Tên</label>
                    <el-input v-model="userForm.last_name" placeholder="Nhập tên" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Email</label>
                    <el-input v-model="userForm.email" placeholder="Nhập email" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Mật khẩu</label>
                    <el-input type="password" v-model="userForm.password" placeholder="Nhập mật khẩu" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Vai trò</label>
                    <el-select v-model="userForm.role" placeholder="Chọn vai trò">
                        <el-option label="Học viên" value="student" />
                        <el-option label="Giảng viên" value="instructor" />
                        <el-option label="Admin" value="admin" />
                    </el-select>
                </div>
                <el-button type="primary" native-type="submit">Lưu</el-button>
            </form>
        </el-dialog>
        <!--  -->
        <el-dialog v-model="deletedUserDialogVisible" title="Danh sách đã xóa">
            <el-table :data="userStore.state.deletedUser">
                <el-table-column prop="first_name" label="Họ" />
                <el-table-column prop="last_name" label="Tên" />
                <el-table-column prop="email" label="Email" />
                <el-table-column prop="role" label="Vai trò" />
                <el-table-column label="Hành động">
                    <template #default="{ row }">
                        <el-button type="text" @click="restoreUser(row.id)">Khôi phục</el-button>
                        <el-button type="danger" @click="handleDeleteForce(row.id)">Xóa cứng</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- update -->
        <el-dialog v-model="updateDrawerVisible" title="Cập nhật Người Dùng">
            <form @submit.prevent="handleUpdate">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Họ</label>
                    <el-input v-model="userForm.first_name" placeholder="Nhập họ" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Tên</label>
                    <el-input v-model="userForm.last_name" placeholder="Nhập tên" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Email</label>
                    <el-input v-model="userForm.email" placeholder="Nhập email" />
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium">Vai trò</label>
                    <el-select v-model="userForm.role" placeholder="Chọn vai trò">
                        <el-option label="Học viên" value="student" />
                        <el-option label="Giảng viên" value="instructor" />
                        <el-option label="Admin" value="admin" />
                    </el-select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng thái</label>
                    <el-select v-model="userForm.status" placeholder="Chọn trạng thái">
                        <el-option label="Hoạt động" value="active" />
                        <el-option label="Không hoạt động" value="inactive" />
                    </el-select>
                </div>
                <el-button type="primary" native-type="submit">Lưu</el-button>
            </form>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { useUser } from '@/composables/admin/useUser';
import { useAuthStore } from '@/store/auth';
import { ArrowPathIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { reactive, onMounted, watch } from 'vue';

const useStore = useAuthStore();
const { fetchAllUser } = useStore;
const { state } = storeToRefs(useStore);
const { userStore,
    openUpdateDrawer,
    handleDelete,
    openDrawer,
    handleSubmit,
    drawerVisible,
    userForm,
    handleDeleteForce,
    restoreUser,
    deletedUserDialogVisible, handleUpdate,
    updateDrawerVisible,
    openDeletedUserDialog } = useUser()
// Các trường filter
const filters = reactive({
    keyword: '',
    role: '',
    status: '',
});

// Phân trang
const pagination = reactive({
    currentPage: 1,
    perPage: 10,
    total: 0,
});
// Sắp xếp
const sortOptions = reactive({
    orderBy: 'created_at', // Mặc định sắp xếp theo ngày tạo
    orderDirection: 'desc', // Mặc định sắp xếp giảm dần
});
// Hàm fetch users
const fetchUsers = async () => {
    const params = {
        page: pagination.currentPage,
        per_page: pagination.perPage,
        search: filters.keyword,
        role: filters.role,
        status: filters.status,
        order_by: sortOptions.orderBy,
        order_direction: sortOptions.orderDirection,
    };
    await fetchAllUser(params);
    pagination.total = state.value.total; // Cập nhật tổng số người dùng
};

// Xử lý thay đổi trang
const handlePageChange = (page: number) => {
    pagination.currentPage = page;
    fetchUsers();
};
// Xử lý thay đổi sắp xếp
const handleSortChange = ({ prop, order }: { prop: string; order: string }) => {
    sortOptions.orderBy = prop || 'created_at'; // Nếu không có cột, mặc định là `created_at`
    sortOptions.orderDirection = order === 'ascending' ? 'asc' : 'desc'; // Chuyển đổi sang `asc` hoặc `desc`
    fetchUsers(); // Gọi lại API để lấy dữ liệu đã sắp xếp
};
onMounted(() => {
    fetchUsers();
});

</script>
