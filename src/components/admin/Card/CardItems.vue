<script setup lang="ts">
import cart from '@/assets/images/icon/cart.png'
import course from '@/assets/images/icon/online-course.png'
import users from '@/assets/images/icon/racer.png'
import revenue from '@/assets/images/icon/wallet.png'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
const cartItems = ref([
  {
    icon: course,
    title: 'Tổng khoá học',
    total: '353 Khoá học',
    growthRate: 0.43
  },
  {
    icon: users,
    title: 'Tổng giáo viên',
    total: '5783',
    growthRate: 6.89
  },
  {
    icon: revenue,
    title: 'Tổng doanh thu',
    total: '17,663,934,000 vnđ',
    growthRate: 3.43
  },
  {
    icon: cart,
    title: 'Tổng khoá học đã bán',
    total: '157 Khoá học',
    growthRate: -8.48
  },
])
</script>
<template>
      <el-card 
      v-for="(CartItem, index) in cartItems" :key="index"
      class="rounded-[10px] dark:bg-dark-sidebar dark:text-white dark:hover:-translate-y-1" 
      shadow="hover">
        <img :src="CartItem.icon" class="w-[60px] h-[60px]" alt="">
        <span class="font-bold uppercase text-[20px] py-3 mt-3">{{CartItem.total}}</span>
        <div class="flex justify-between">
          <p class="text-sm text-gray-400">{{CartItem.title}}</p>
          <span 
          class="flex items-center gap-1 text-sm font-medium"
          :class="{
            'text-green-500': CartItem.growthRate > 0, 
            'text-red-500': CartItem.growthRate < 0 
          }"
          >{{CartItem.growthRate}}% 
            <ArrowUpIcon class="w-5 h-5" v-show="CartItem.growthRate>0"/>
            <ArrowDownIcon class="w-5 h-5" v-show="CartItem.growthRate<0"/>
          </span>
        </div>
      </el-card>
</template>


