<template>
    <div class="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-7">
        <CardItemsTeacher :total_revenue="total_revenue" :total_courses="total_courses"
            :total_categories="total_categories" :total_students="total_students" />
    </div>
    <div class="p-4">
        <div class="w-1/2 flex flex-wrap gap-4 mb-6 items-center mt-5 ">
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
        <div class="grid  gap-3 items-center">
            <div>

                <ChartTeacher :total_sales="total_sales" :total_revenue="total_revenue" :data="chartDataTotalTeacher" />
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import CardItemsTeacher from '@/components/admin/Card/CardItemsTeacher.vue';
import ChartTeacher from '@/components/admin/Chart/ChartTeacher.vue';
import { useReportStore } from '@/store/report';
import { formatPrice } from '@/utils/formatPrice';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const reportStore = useReportStore();
const { total_courses,
    total_categories,
    total_revenue,
    total_sales,
    total_students, chartDataTotalTeacher } = storeToRefs(reportStore)
const { fetchReportTeacher,
    fetchLineChartTotalTeacher,
} = reportStore
onMounted(() => {
    const [startDate, endDate] = dateRange.value;
    fetchReportTeacher(),
        fetchLineChartTotalTeacher(startDate, endDate, filter.value);

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
    fetchLineChartTotalTeacher(startDate, endDate, filter.value);
};

</script>