<template>
  <div class="bg-white  dark:bg-dark-sidebar rounded-lg dark:border group hover:duration-700">
    <div class="p-3 h-full flex flex-wrap justify-center">
      <div class="w-full relative">
        <img :src="imageUrl" class="w-full  h-[170px] object-cover rounded-t-md" alt="">
        <el-tooltip class="box-item" :effect="darkModeStore.darkMode ? 'light' : 'dark'"
          :content="props.category.status === 'active' ? 'Dừng kích hoạt' : 'Kích hoạt'" placement="top-start">
          <label class="inline-flex items-center cursor-pointer absolute p-3 top-0 right-0">
            <input type="checkbox" :checked="isActive" class="sr-only peer">
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </div>
          </label>
        </el-tooltip>
        <div class="py-4">
          <div class="flex justify-between pb-4 border-b">
            <div class="flex gap-2 items-center">
              <!-- <FontAwesomeIcon :icon="mappedIcon" class="w-5" /> -->
              <div class="font-bold">{{ props.category.name }}</div>
            </div>
            <div class="">({{ props.category.children?.length }})</div>
          </div>
          <ItemsChild v-for="(CategoryItemChild, index) in props.category.children" :key="index"
            :child="CategoryItemChild" />
        </div>
      </div>
      <div class="flex justify-center invisible gap-4 pb-5 group-hover:visible">
        <div class="">
          <button @click="openDialogItem(props.category.id)" class="flex gap-1 items-center">
            <PlusCircleIcon class="w-4 h-4" />
            <p class="text-sm">Thêm</p>
          </button>
        </div>
        <div class="">

          <button @click="handleDeleteCategory(props.category.id)" class="flex gap-1 items-center">
            <TrashIcon class="w-4 h-4" />
            <p class="text-sm">Xoá</p>
          </button>
        </div>
        <div class="">

          <button @click="editCategory(props.category)" class="flex gap-1 items-center">
            <PencilSquareIcon class="w-4 h-4" />
            <p class="text-sm">Sửa</p>
          </button>
        </div>

      </div>
    </div>
  </div>
  <!-- Dialog Cập Nhật Danh Mục -->
  <el-dialog v-model="updateDialogVisible" title="Cập Nhật Danh Mục" width="50%">
    <form @submit.prevent="handleUpdate">
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
        <el-input type="textarea" id="description" v-model="categoryForm.description" placeholder="Nhập mô tả danh mục"
          class="w-full" :rows="4" />
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

</template>

<script setup lang="ts">
import CategoryImgWeb from '@/assets/images/CategoryImgWeb.jpeg'
import { PlusCircleIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { TCategory, TCategoryCRUD } from '@/interfaces/category.interface';
import { computed, defineEmits, onMounted, ref } from 'vue';
import ItemsChild from './ItemsChild.vue';
import CardActionButton from './CardActionButton.vue';
import { useDarkModeStore } from '@/store/darkmode';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { useCategory } from '@/composables/admin/useCategory';
import { Plus } from '@element-plus/icons-vue';

const darkModeStore = useDarkModeStore()
const props = defineProps<{
  category: TCategoryCRUD;
}>();

const isActive = computed(() => props.category.status === 'active')
// Hàm gọi updateStatus khi thay đổi trạng thái
// const toggleStatus = (categoryId: number, currentStatus: string | undefined) => {
//   const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
//   useUpdateStatus.updateStatus(categoryId, newStatus);
// };
const imageUrl = computed(() => {
  if (typeof props.category.image === 'string') {
    return props.category.image; // Nếu là string, trả về trực tiếp
  } else if (props.category.image instanceof File) {
    return URL.createObjectURL(props.category.image); // Nếu là File, tạo URL tạm thời
  }
  return undefined; // Nếu không có giá trị hợp lệ
});
// //Sửa category
// const emit = defineEmits(['editCategory']);
// // Hàm phát sự kiện khi nhấn nút "Sửa"
// const handleEditClick = () => {
//   emit('editCategory', props.category.id); // Phát ra sự kiện với id của danh mục
//   console.log(props.category.id);
// };
const {

  handleDeleteCategory,
  editCategory, categoryForm,
  handleUpdate,
  handleSubmit,
  updateDialogVisible,
  dialogVisible,
  fileList, openDialogItem,
  handleFileChange,
  handleRemoveImage
} = useCategory()

</script>