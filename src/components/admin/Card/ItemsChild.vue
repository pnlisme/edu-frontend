<template>
  <div
    class="hoverItem hover:bg-bg-primary dark:hover:text-black rounded-sm p-1 flex justify-between items-center hover:duration-300">
    <div class="flex gap-2 items-center">
      <!-- <FontAwesomeIcon :icon="mappedIconChild ? mappedIconChild : 'fa-question-circle'" class="w-4" /> -->
      <div class="text-sm">{{ child.name }}</div>
    </div>
    <div class="flex gap-2">
      <router-link @click="editCategory(child)" class=" overItemChild" to="#">
        <PencilSquareIcon class="w-4" />
      </router-link>
      <router-link @click="handleDeleteCategory(child.id!)" class=" overItemChild" to="#">
        <TrashIcon class="w-4" />
      </router-link>
    </div>
  </div>
  <!-- Dialog Cập Nhật Danh Mục -->
  <el-dialog v-model="updateDialogVisible" title="Cập Nhật Danh Mục" width="50%">
    <form @submit.prevent="handleUpdateItem">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium">Tên danh mục</label>
        <el-input id="name" v-model="categoryForm.name" type="text" placeholder="Nhập tên danh mục" class="w-full" />
      </div>
      <div class="mb-4">
        <label for="icon" class="block text-sm font-medium">Icon danh mục</label>
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
        <label for="description" class="block text-sm font-medium">Mô tả</label>
        <el-input type="textarea" id="description" v-model="categoryForm.description" placeholder="Nhập mô tả"
          class="w-full" :rows="4" />
      </div>
      <div class="mb-4" v-if="categoryForm.image !== categoryForm.originalImage">
        <label for="image" class="block text-sm font-medium">
          Tải lên hình ảnh
        </label>
        <el-upload list-type="picture-card" :auto-upload="false" :file-list="fileList" :on-change="handleFileChange"
          :on-remove="handleRemoveImage" accept="image/*" :limit="1">
          <el-icon>
            <div v-if="typeof categoryForm.image === 'string'">
              <img :src="categoryForm.image" />
            </div>
            <div v-else>
              <Plus />
            </div>
          </el-icon>
        </el-upload>
      </div>
      <!-- <el-upload :file-list="fileList" :on-change="handleFileChange" list-type="picture-card"
        :before-remove="handleRemoveImage">
        <img v-if="typeof categoryForm.image === 'string'" :src="categoryForm.image" alt="Hình ảnh danh mục" />
      </el-upload> -->
      <div class="flex justify-end mt-4">
        <el-button @click="updateDialogVisible = false" class="mr-2">Hủy</el-button>
        <el-button type="primary" native-type="submit">Lưu</el-button>
      </div>
    </form>
  </el-dialog>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
import type { TCategory } from '@/interfaces/category.interface';
import { defineProps, computed } from 'vue';

import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as brandsIcons from '@fortawesome/free-brands-svg-icons';
import { useCategory } from '@/composables/admin/useCategory';
import { Plus } from '@element-plus/icons-vue';

// Hàm tính toán để lấy icon từ tên
const mappedIconChild = computed(() => {
  // Sử dụng props.category.icon để ánh xạ
  const iconName = props.child.icon;
  // Tìm icon trong solidIcons bằng cách lấy giá trị của iconName
  return solidIcons[iconName as keyof typeof solidIcons] || regularIcons[iconName as keyof typeof regularIcons] || brandsIcons[iconName as keyof typeof brandsIcons];
});
const props = defineProps<{
  child: TCategory;
}>();
const {

  handleDeleteCategory,
  editCategory, categoryForm,
  handleUpdate,
  handleSubmit,
  updateDialogVisible,
  dialogVisible,
  fileList, openDialogItem,
  handleFileChange,
  handleRemoveImage,
  handleUpdateItem
} = useCategory()

</script>