<script setup lang="ts">
import cart from '@/assets/images/icon/cart.png'
import course from '@/assets/images/icon/online-course.png'
import users from '@/assets/images/icon/racer.png'
import revenue from '@/assets/images/icon/wallet.png'
import { formatPrice } from '@/utils/formatPrice';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';
import { ref, watchEffect } from 'vue';
const props = defineProps<{
  total_revenue: number;
  total_payouts: number;
  net_revenue: number;
  total_users: number;
  total_courses: number;
  total_categories: number;
  total_payout_requests: number;
  completed_payout_requests: number;
  processing_payout_requests: number;
  failed_payout_requests: number;
}>()
interface TCardItem {
  icon: string
  title: string
  total: string
}
const cardItems = ref<TCardItem[]>([]);
watchEffect(() => {
  cardItems.value = [
    {
      icon: revenue,
      title: "Tổng số tiền thanh toán",
      total: `${formatPrice(props.total_payouts)}`,
    },
    {
      icon: revenue,
      title: "Tổng số doanh thu",
      total: `${formatPrice(props.total_revenue)}`,
    },
    {
      icon: revenue,
      title: "Doanh thu ròng",
      total: `${formatPrice(props.net_revenue)}`,
    },
    {
      icon: users,
      title: "Tổng số người dùng",
      total: `${props.total_users} thành viên`,
    },
    {
      icon: course,
      title: "Tổng số khóa học",
      total: `${props.total_courses} khoá học`,
    },
    {
      icon: course,
      title: "Tổng số danh mục",
      total: `${props.total_categories} danh mục`,
    },
    {
      icon: course,
      title: "Tổng số yêu cầu thanh toán",
      total: `${props.total_payout_requests} yêu cầu`,
    },
    {
      icon: cart,
      title: "Tổng đã hoàn thành yêu cầu thanh toán",
      total: `${props.completed_payout_requests} khoá học`,
    },
    {
      icon: cart,
      title: "Tổng đang xử lý yêu cầu thanh toán",
      total: `${props.processing_payout_requests} yêu cầu`,
    },
    {
      icon: cart,
      title: "Yêu cầu thanh toán không thành công",
      total: `${props.failed_payout_requests} yêu cầu`,
    },
  ];
});
</script>
<template>
  <el-card v-for="(CardItem, index) in cardItems" :key="index"
    class="rounded-[10px] dark:bg-dark-sidebar dark:text-white dark:hover:-translate-y-1" shadow="hover">
    <img :src="CardItem.icon" class="w-[60px] h-[60px]" alt="">
    <span class="font-bold uppercase text-[20px] py-3 mt-3">{{ CardItem.total }}</span>
    <div class="flex justify-between">
      <p class="text-sm text-gray-400">{{ CardItem.title }}</p>

    </div>
  </el-card>
</template>
