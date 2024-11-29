<template>
  <div class="p-5 bg-white rounded-lg shadow-lg">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Thống kê mua hàng</h2>
    <ApexCharts class="w-full" type="bar" height="350" :options="chartOptions" :series="series"></ApexCharts>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import ApexCharts from "vue3-apexcharts";

interface TCharOne {
  period: string;
  orders: number;
}

const props = defineProps<{
  data: TCharOne[];
}>();

// Tạo series và categories
const series = ref([{ name: "Orders", data: [] as number[] }]);
const categories = ref([] as string[]);

// Theo dõi thay đổi của props.data
watch(
  () => props.data,
  (newData) => {
    categories.value = newData.map((item) => item.period);
    series.value[0].data = newData.map((item) => item.orders);
  },
  { immediate: true } // Gọi ngay khi component mount
);

// Cấu hình ApexCharts
const chartOptions = ref({
  chart: {
    type: "bar",
    height: 430,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: "top",
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: "12px",
      colors: ["#fff"],
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["#fff"],
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  xaxis: {
    categories: categories.value,
  },
});
</script>
