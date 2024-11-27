<template>
    <div class="p-5 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Monthly Inflation in Argentina, 2002</h2>
        <ApexCharts class="w-full" type="bar" height="350" :options="chartOptions" :series="series"></ApexCharts>
        <!-- <el-button class="mt-4" type="primary" @click="updateData">Update Data</el-button> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ApexCharts from "vue3-apexcharts";

const series = ref([
    {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
]);

const chartOptions = ref({
    chart: {
        height: 350,
        type: "bar",
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            dataLabels: {
                position: "top",
            },
        },
    },
    dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val}%`,
        offsetY: -20,
        style: {
            fontSize: "12px",
            colors: ["#304758"],
        },
    },
    xaxis: {
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        position: "top",
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            fill: {
                type: "gradient",
                gradient: {
                    colorFrom: "#D8E3F0",
                    colorTo: "#BED1E6",
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                },
            },
        },
        tooltip: {
            enabled: true,
        },
    },
    yaxis: {
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: (val: number) => `${val}%`,
        },
    },
    title: {
        text: "",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
            color: "#444",
        },
    },
});

const updateData = () => {
    series.value[0].data = Array.from({ length: 12 }, () =>
        parseFloat((Math.random() * 10).toFixed(1))
    );
};
</script>

<style scoped></style>