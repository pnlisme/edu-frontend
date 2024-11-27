<template>
  <div class="p-4">
    <HeaderNavbar namePage="Danh mục">
      <div class="mb-4 flex  items-center gap-3">
        <el-input class="w-48" v-model="filters.keyword" placeholder="Tìm kiếm" clearable @input="fetchCategories" />
        <el-select class="w-48 " v-model="filters.status" placeholder="Chọn trạng thái" clearable
          @change="fetchCategories">
          <el-option label="Hoạt động" value="active" />
          <el-option label="Không hoạt động" value="inactive" />
        </el-select>
        <div class="flex">
          <el-button type="primary" class="flex items-center gap-1" @click="openDialog">
            <PlusIcon class="h-5 w-5 text-white cursor-pointer" />
            Thêm Danh Mục
          </el-button>
          <el-button class="flex items-center gap-1" type="success" @click="openDeletedCategoriesDialog">
            <ArrowPathIcon class="h-5 w-5 text-white cursor-pointer" />Xem đã xóa
          </el-button>
        </div>
      </div>

    </HeaderNavbar>

    <div class=" p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <CardCategory v-for="category in categoryStore.state.categoriesCURD" :key="category.id"
        :category="{ ...category, id: category.id ?? 0 }" />
    </div>
    <div class="mt-4 flex justify-center">
      <el-pagination v-model:current-page="pagination.currentPage" :page-size="pagination.perPage"
        :total="pagination.total" layout="prev, pager, next" @current-change="handlePageChange" />
    </div>
    <!-- Dialog Thêm Danh Mục -->
    <el-dialog v-model="dialogVisible" title="Thêm Danh Mục" width="50%">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">
            Tên danh mục
          </label>
          <el-input id="name" v-model="categoryForm.name" type="text" placeholder="Nhập tên danh mục" class="w-full" />
        </div>
        <div class="mb-4">
          <label for="icon" class="block text-sm font-medium">
            Icon danh mục
          </label>
          <el-input id="icon" v-model="categoryForm.icon" type="text" placeholder="Nhập icon" class="w-full" />
        </div>
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium">Trạng thái</label>
          <el-select v-model="categoryForm.status" id="status" placeholder="Chọn trạng thái">
            <el-option label="Hoạt động" value="active" />
            <el-option label="Không hoạt động" value="inactive" />
          </el-select>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium">
            Mô tả
          </label>
          <el-input type="textarea" id="description" v-model="categoryForm.description"
            placeholder="Nhập mô tả danh mục" class="w-full" :rows="4" />
        </div>
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium">
            Tải lên hình ảnh
          </label>
          <el-upload list-type="picture-card" :auto-upload="false" :file-list="fileList" :on-change="handleFileChange"
            :on-remove="handleRemoveImage" accept="image/*" :limit="1">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </div>
        <div class="flex justify-end mt-4">
          <el-button @click="dialogVisible = false" class="mr-2">Hủy</el-button>
          <el-button type="primary" native-type="submit">Lưu</el-button>
        </div>
      </form>
    </el-dialog>
    <el-dialog v-model="deletedCategoriesDialogVisible" title="Danh sách danh mục đã xóa">
      <el-table :data="categoryStore.state.deletedCategories" style="width: 100%">
        <el-table-column prop="name" label="Tên danh mục" />
        <el-table-column prop="description" label="Mô tả" />
        <el-table-column label="Hành động">
          <template #default="{ row }">
            <el-button type="success" @click="restoreCategory(row.id)">Khôi phục</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue'
import CardCategory from '@/components/admin/Card/CardCategory.vue'
import { ArrowPathIcon, PlusIcon } from '@heroicons/vue/20/solid'
import { useCategory } from '@/composables/admin/useCategory'
import { Plus } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { apisStore } from '@/store/apis'
const fetchData = apisStore()
const { fetchCate } = fetchData
const { categories } = storeToRefs(fetchData)
onMounted(async () => {
  await fetchCate()
})
const handlePictureCardPreview = (file: any) => {
  // console.log(file)
  categoryForm.value.image = file.raw; // Gán file đã chọn vào form
};
// Sử dụng composable
const {
  categoryStore,
  dialogVisible,
  categoryForm,
  openDialog,
  handleSubmit,
  handleUpdate,
  handleDeleteCategory,
  handleRemoveImage,
  openDeletedCategoriesDialog,
  deletedCategoriesDialogVisible,
  handleFileChange,
  updateDialogVisible,
  editCategory,
  restoreCategory,
  // handlePictureCardPreview,
  fileList
} = useCategory()
const filters = reactive({
  keyword: '',
  status: '',
});

const pagination = reactive({
  currentPage: 1,
  perPage: 10,
  total: 0,
});

const fetchCategories = async () => {
  const params = {
    per_page: pagination.perPage,
    page: pagination.currentPage,
    keyword: filters.keyword.trim(),
    status: filters.status || null,
    deleted: 0,
  };
  await categoryStore.fetchCategoriesCRUD(params);
  pagination.total = categoryStore.state.total; // Cập nhật tổng số mục
};
const handlePageChange = (page: number) => {
  pagination.currentPage = page;
  fetchCategories();
};

onMounted(() => {
  fetchCategories();
});
</script>
