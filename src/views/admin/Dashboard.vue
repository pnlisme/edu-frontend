<template>
  <div class="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-7">
    <CardItems :total_revenue="total_revenue" :total_payouts="total_payouts" :net_revenue="net_revenue"
      :total_users="total_users" :total_courses="total_courses" :total_categories="total_categories"
      :total_payout_requests="total_payout_requests" :completed_payout_requests="completed_payout_requests"
      :processing_payout_requests="processing_payout_requests" :failed_payout_requests="failed_payout_requests" />
  </div>
  <div class="p-4">
    <div class="w-1/2 flex flex-wrap gap-4 mb-6 items-center mt-5 ms-auto">
      <!-- Date Range -->
      <el-date-picker v-model="dateRange" type="daterange" range-separator="to" start-placeholder="Start date"
        end-placeholder="End date" class="w-full md:w-1/3" />
      <!-- Filter Type -->
      <el-select v-model="filter" class="w-full md:w-1/4" placeholder="Select filter type">
        <el-option label="Month" value="month" />
        <el-option label="Year" value="year" />
        <el-option label="Day" value="day" />
      </el-select>
      <!-- Apply Button -->
      <el-button type="primary" @click="applyFilters" class="md:w-1/5">Áp dụng bộ lọc</el-button>
    </div>
    <div class="grid grid-cols-2 gap-3 items-center">
      <div>
        <ChartOne :data="chartDataOrder" />
      </div>
      <div>
        <ChartUser :data="chartDataUser" />
      </div>
    </div>
    <div>
      <ChartTotal :data="chartDataTotal" />
    </div>

  </div>
</template>
<script setup lang="ts">
import CardItems from '@/components/admin/Card/CardItems.vue';
import ChartOne from '@/components/admin/Chart/ChartOne.vue';
import ChartTotal from '@/components/admin/Chart/ChartTotal.vue';
import ChartUser from '@/components/admin/Chart/ChartUser.vue';
import { useReportStore } from '@/store/report';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const reportStore = useReportStore();
const { total_revenue,
  total_payouts,
  net_revenue,
  total_users,
  total_courses,
  total_categories,
  total_payout_requests,
  completed_payout_requests,
  processing_payout_requests,
  failed_payout_requests, chartDataTotal,
  chartDataUser,
  chartDataOrder, } = storeToRefs(reportStore)
const { fetchReport,
  fetchLineChartTotal,
  fetchLineChartUser,
  fetchLineChartOrder } = reportStore
onMounted(() => {
  const [startDate, endDate] = dateRange.value;
  fetchReport(),
    fetchLineChartTotal(startDate, endDate, filter.value);
  fetchLineChartUser(startDate, endDate, filter.value);
  fetchLineChartOrder(startDate, endDate, filter.value);
});
const now = new Date();
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth() - 10, 1).toISOString().split('T')[0];
const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

const dateRange = ref<[string, string]>([firstDayOfMonth, lastDayOfMonth]); // Date range
// const startDate = ref('2024-01-01');
// const endDate = ref('2024-12-31');
const filter = ref('month');
const applyFilters = () => {
  const [startDate, endDate] = dateRange.value;
  fetchLineChartTotal(startDate, endDate, filter.value);
  fetchLineChartUser(startDate, endDate, filter.value);
  fetchLineChartOrder(startDate, endDate, filter.value);
};

</script>
