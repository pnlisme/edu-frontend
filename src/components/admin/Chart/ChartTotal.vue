<script setup lang="ts">
import { computed, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

interface Ttotal {
    date: string
    revenue: number
    total_sales: number
}
const props = defineProps<{
    data: Ttotal[]
}>();
const categories = computed(() => props.data.map((item: any) => item.period));
const series = computed(() => [
    {
        name: "Revenue",
        data: props.data.map((item) => item.revenue),
    },
    {
        name: "Total Sales",
        data: props.data.map((item) => item.total_sales),
    },
]);

// Cấu hình ApexCharts
const apexOptions = ref({
    legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
            enabled: true,
            color: "#623CEA14",
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },
        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: "straight",
    },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        fillOpacity: 1,
    },
    xaxis: {
        type: "category",
        categories: categories.value,
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: "0px",
            },
        },
        min: 0,
    },
});
</script>

<template>
    <div class="p-5 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Thống kê thanh toán</h2>
        <div id="chartOne" class="-ml-5">
            <VueApexCharts type="area" height="350" :options="apexOptions" :series="series" />
        </div>
        <!-- <el-button class="mt-4" type="primary" @click="updateData">Update Data</el-button> -->
    </div>

</template>