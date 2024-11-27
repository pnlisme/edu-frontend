<script setup lang="ts">
import ButtonSecondary from '@/components/admin/Button/ButtonSecondary.vue';
import InputSearch from '@/components/admin/Button/InputSearch.vue';
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue';
import { ArrowUpOnSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';

// Revenue data
const revenuaData = ref([
  {
    id: 1,
    course: "The Complete Web Development with Bootstrap",
    totalAmount: 12,
    adminRevenue: 3.744,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 2,
    course: "The Complete Web Development with Bootstrap",
    totalAmount: 12,
    adminRevenue: 3.744,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 3,
    course: "Complete Blender Creator: Learn 3D Modelling",
    totalAmount: 69,
    adminRevenue: 130,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 4,
    course: "Melody Guitar Beginner Course",
    totalAmount: 19,
    adminRevenue: 130,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 5,
    course: "The Complete Web Development with Bootstrap",
    totalAmount: 12,
    adminRevenue: 39,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 6,
    course: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
    totalAmount: 25,
    adminRevenue: 130,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 7,
    course: "Complete Blender Creator: Learn 3D Modelling",
    totalAmount: 69,
    adminRevenue: 130,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 8,
    course: "Melody Guitar Beginner Course",
    totalAmount: 19,
    adminRevenue: 130,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 9,
    course: "The Complete Web Development with Bootstrap",
    totalAmount: 12,
    adminRevenue: 39,
    enrolledDate: "27-Oct-2024",
  },
  {
    id: 10,
    course: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
    totalAmount: 25,
    adminRevenue: 130,
    enrolledDate: "27-Oct-2024",
  },
]);

const filteredData = ref(revenuaData.value);
const dateRange = ref('');

// Computed properties for totals
const totalAmount = computed(() => {
  return filteredData.value.reduce((sum, item) => sum + item.totalAmount, 0);
});

const totalAdminRevenue = computed(() => {
  return filteredData.value.reduce((sum, item) => sum + item.adminRevenue, 0);
});

// Filtering function
const filterData = () => {
  if (dateRange.value) {
    const [startDate, endDate] = dateRange.value.split(' - ').map(date => new Date(date));
    filteredData.value = revenuaData.value.filter(item => {
      const enrolledDate = new Date(item.enrolledDate);
      return enrolledDate >= startDate && enrolledDate <= endDate;
    });
  } else {
    filteredData.value = revenuaData.value; // Reset to original data
  }
};

// Event handler for input change
const updateDateRange = (value) => {
  dateRange.value = value;
  filterData();
};

const deactivate = (id) => {
  console.log('Deactivate clicked for coupon id:', id);
};
const edit = (id) => {
  console.log('Edit clicked for coupon id:', id);
};
const deleteCoupon = (id) => {
  console.log('Delete clicked for coupon id:', id);
};
</script>

<template>
  <div class="p-4">
    <HeaderNavbar namePage="Báo cáo danh thu giáo viên">
    </HeaderNavbar>
  </div>
  <div class="px-4 py-2">
    <div class="background-table">
      <div class="lg:flex justify-between pb-2">
        <div class="p-3 flex gap-2">
          <ButtonSecondary 
            :icon="ArrowUpOnSquareIcon" 
            link="#" 
            title="Xuất" 
            customStyle="flex-row-reverse"           
          />
        </div>
        <div class="p-3 flex gap-2">
          <InputSearch 
            title="Lọc" 
            inputPlaceHoder="10/01/2024 - 10/31/2024" 
            modelValue="dateRange" 
            @update:modelValue="updateDateRange" 
          />
        </div>
      </div>
      <div class="py-3">
        <div class="overflow-x-auto flex">
          <el-table class="!dark:el-table w-full" ref="tableRef" row-key="id" :data="filteredData">
            <el-table-column prop="id" label="Stt" width="50"/>
            <el-table-column prop="course" label="Khoá học" width="400" />
            <el-table-column prop="totalAmount" label="Tổng số tiền"/>
            <el-table-column prop="adminRevenue" label="Doanh thu"/>
            <el-table-column prop="enrolledDate" label="Ngày đăng ký" sortable column-key="date" />
            <el-table-column label="Chức năng">
              <template #default="scope">
                <el-dropdown trigger="click" placement="bottom-start">
                  <TrashIcon class="el-dropdown-link cursor-pointer w-5" />
                  <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="deactivate(scope.row.id)">Deactivate</el-dropdown-item>
                      <el-dropdown-item @click="edit(scope.row.id)">Edit</el-dropdown-item>
                      <el-dropdown-item @click="deleteCoupon(scope.row.id)">Delete</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="py-4 flex justify-evenly">
        <div>
          <strong>Tổng số tiền:</strong> {{ totalAmount }} $
        </div>
        <div>
          <strong>Tổng doanh thu:</strong> {{ totalAdminRevenue }} $
        </div>
      </div>
    </div>
    <div class="demo-pagination-block mt-5 ">
      <el-pagination class="flex justify-between" v-model:current-page="currentPage3" v-model:page-size="pageSize3"
        :size="size" :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="1000"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
