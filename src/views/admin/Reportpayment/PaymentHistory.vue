<script setup lang="ts">
import ButtonSecondary from '@/components/admin/Button/ButtonSecondary.vue';
import InputSearch from '@/components/admin/Button/InputSearch.vue';
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue';
import { ArrowUpOnSquareIcon, PrinterIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';

// Lịch sử mua hàng
const historyData = ref([
  {
    id: 1,
    user: "Geoffrey Hammond",
    email: "Geoffrey@example.com",
    item: "The Complete Web Development with Bootstrap",
    paidAmount: 12,
    paymentMethod: "stripe",
    purchasedDate: "28-Oct-2024",
  },
  {
    id: 2,
    user: "David Warner",
    email: "David@example.com",
    item: "The Complete Web Development with Bootstrap",
    paidAmount: 12,
    paymentMethod: "stripe",
    purchasedDate: "28-Oct-2024",
  },
  // Thêm dữ liệu cho các dòng còn lại...
  {
    id: 10,
    user: "Riana Hoffman",
    email: "student3@example.com",
    item: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
    paidAmount: 25,
    paymentMethod: "stripe",
    purchasedDate: "28-Oct-2024",
  },
]);


const filteredData = ref(historyData.value);
const dateRange = ref('');

// Computed properties for totals
const totalAmount = computed(() => {
  return filteredData.value.reduce((sum, item) => sum + item.paidAmount, 0);
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
    <HeaderNavbar namePage="Lịch sử mua hàng" />
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
              inputPlaceHoder="28-Oct-2024" 
              modelValue="dateRange" 
              @update:modelValue="updateDateRange" 
            />
          </div>
        </div>
        <div class="py-3">
          <div class="overflow-x-auto flex">
            <el-table class="!dark:el-table w-full" ref="tableRef" row-key="id" :data="filteredData">
              <el-table-column prop="id" label="#" width="50" />
              <el-table-column prop="user" label="Người dùng" />
              <el-table-column prop="item" label="Khoá học" />
              <el-table-column prop="paidAmount" label="Thanh toán" />
              <el-table-column prop="paymentMethod" label="Phương thức thanh toán" />
              <el-table-column prop="purchasedDate" label="Thời gian đặt hàng" />
              <el-table-column label="Hoá đơn">
                <template #default="scope">
                  <PrinterIcon class="el-dropdown-link cursor-pointer w-5" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="py-4 flex justify-evenly">
          <div>
            <strong>Tổng số tiền:</strong> {{ totalAmount }} $
          </div>
        </div>
      </div>
  </div>
</template>
