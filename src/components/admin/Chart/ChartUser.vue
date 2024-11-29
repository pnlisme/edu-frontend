<template>
    <div class="p-5 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Thành viên đăng ký</h2>
        <ApexCharts class="w-full" type="bar" height="350" :options="chartOptions" :series="series"></ApexCharts>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import ApexCharts from "vue3-apexcharts";

// Nhận dữ liệu từ props
const props = defineProps<{
    data: { period: string; registrations: number }[];
}>();

// Tạo series và categories từ dữ liệu props
const series = ref([
    {
        name: "Registrations",
        data: [] as number[], // Mảng dữ liệu cho trục Y
    },
]);

const categories = ref([] as string[]); // Mảng dữ liệu cho trục X

// Theo dõi và cập nhật dữ liệu khi props.data thay đổi
watchEffect(() => {
    categories.value = props.data.map((item) => item.period); // Lấy dữ liệu `period` cho trục X
    series.value[0].data = props.data.map((item) => item.registrations); // Lấy dữ liệu `registrations` cho trục Y
});

// Cấu hình biểu đồ
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
        formatter: (val: number) => `${val}`, // Hiển thị giá trị trực tiếp
        offsetY: -20,
        style: {
            fontSize: "12px",
            colors: ["#304758"],
        },
    },
    xaxis: {
        categories: categories.value, // Gắn danh sách categories vào trục X
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
            show: true,
            formatter: (val: number) => `${val}`,
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
</script>