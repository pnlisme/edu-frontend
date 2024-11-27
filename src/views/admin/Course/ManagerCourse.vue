<script setup lang="ts">
import ButtonPrimary from '@/components/admin/Button/ButtonPrimary.vue';
import ButtonSecondary from '@/components/admin/Button/ButtonSecondary.vue';
import InputSearch from '@/components/admin/Button/InputSearch.vue';
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue';
import { useShowCourse } from '@/composables/admin/course/useShowCourse';
import { useSidebarStore } from '@/store/sidebar';
import { ArrowUpOnSquareIcon, DocumentPlusIcon } from '@heroicons/vue/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/vue/24/solid';
import { reactive, ref, watch } from 'vue';

const { courses, isLoading, error, fetchCourses } = useShowCourse();
const sidebarStore = useSidebarStore();
const dialogVisible = ref(false);
const table = reactive({
  columns: [
    { label: "ID", field: "id", width: "5%", sortable: true },
    { label: "Title", field: "title", width: "30%", sortable: true },
    { label: "Instructor", field: "instructor", width: "15%", sortable: true },
    { label: "Category", field: "category", width: "10%", sortable: true },
    { label: "Lessons", field: "lessons", width: "10%", sortable: true },
    { label: "Sections", field: "sections", width: "10%", sortable: true },
    { label: "Enrolled Students", field: "enrolled", width: "10%", sortable: true },
    { label: "Status", field: "status", width: "10%", sortable: true },
    { label: "Price", field: "price", width: "10%", sortable: true },
    {
      label: "Options",
      field: "options",
      width: "20%",
    },
  ],
  totalRecordCount: 0,
});

const loadCourses = () => {
  fetchCourses(15); 
};

// Theo dõi khi dữ liệu khóa học được cập nhật
watch(courses, (newCourses) => {
  table.totalRecordCount = newCourses.length; // Cập nhật số lượng bản ghi
});

// Lần đầu tiên lấy dữ liệu
loadCourses();

</script>

<template>
  <div class="p-4">
    <HeaderNavbar namePage="Quản lý khoá học">
      <ButtonPrimary :icon="DocumentPlusIcon" link="#" title="Thêm khoá học" />
    </HeaderNavbar>
    <div class="py-4">
      <div class="background-table">
        <div class="lg:flex justify-between pb-2">
          <div class="p-3 flex gap-2">
            <ButtonSecondary :icon="ArrowUpOnSquareIcon" link="#" title="Xuất" customStyle="flex-row-reverse" />
          </div>
          <div class="p-3 flex gap-2">
            <InputSearch title="Lọc" inputPlaceHoder="10/01/2024 - 10/31/2024" modelValue="dateRange" @update:modelValue="updateDateRange" />
          </div>
        </div>
        <div class="py-3">
          <div v-if="isLoading">Đang tải...</div>
          <div class="overflow-x-auto flex">
            <el-table class="!dark:el-table w-full overflow-x-auto" ref="tableRef" row-key="id" :data="courses">
              <el-table-column label="Stt" width="50">
                <template v-slot="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="title" label="Bài học" />
              <el-table-column prop="category_id" label="Thể loại" />
              <el-table-column prop="price" label="Giá" />
              <el-table-column prop="sale_value" label="Giá Giảm" />
              <el-table-column prop="status" label="Trạng thái" >
                <template v-slot="scope">
                  <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
                    {{ scope.row.status === 'active' ? 'Kích hoạt' : 'Không kích hoạt' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Tùy chọn">
                <template #default="scope">
                  <el-dropdown trigger="click" placement="bottom-start">
                    <EllipsisVerticalIcon class="el-dropdown-link cursor-pointer w-5" />
                    <template #dropdown>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="deactivate">Deactivate</el-dropdown-item>
                        <el-dropdown-item @click="edit">Edit</el-dropdown-item>
                        <el-dropdown-item @click="deleteCoupon">Delete</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="error">{{ error.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
