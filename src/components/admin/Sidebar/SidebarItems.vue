<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { useSidebarStore } from '@/store/sidebar';
import type { SidebarItem } from '@/interfaces/admin.interface';
import SidebarDropdown from './SidebarDropdown.vue';
import { useRoute } from 'vue-router';

const sidebarStore = useSidebarStore();
const currentPage = useRoute().name

const props = defineProps<{
  item: SidebarItem;
  index: number;
}>();

const handleItemClick = () => {
  const pageName = sidebarStore.page === props.item.label ? '' : props.item.label
  sidebarStore.page = pageName;

  // if (props.item.children) {
  //   return props.item.children.some((child: SidebarItem)=>(sidebarStore.selected=== child.label))
  // }
}

</script>
<template>
  <li class="relative">
    <RouterLink :to="props.item.route || '/'"
      class="gap-2 flex  hover:bg-slate-500 py-2 px-3 rounded-[5px] items-center relative" :class="{
        'bg-slate-500': sidebarStore.page === item.label,
        'justify-center': sidebarStore.isSidebarOpen
      }" @click.prevent="handleItemClick">
      <component :is="props.item.icon" class="w-4 h-4" :class="{
        'w-7 h-7': sidebarStore.isSidebarOpen
      }" />
      <span :class="{ 'hidden': sidebarStore.isSidebarOpen }">{{ props.item.label }}</span>
      <ChevronRightIcon v-if="props.item.children" class="h-4 w-4 right-2 absolute"
        :class="{ 'rotate-90': sidebarStore.page === item.label, 'hidden': sidebarStore.isSidebarOpen }" />
    </RouterLink>
    <!-- Dropdown Menu Start -->
    <div class="translate transform overflow-hidden"
      :class="{ 'absolute bg-white dark:bg-bg-primary w-[200px] rounded-lg top-[-22px] left-[75px] shadow-lg': sidebarStore.isSidebarOpen }"
      v-show="sidebarStore.page === item.label">
      <SidebarDropdown v-if="item.children" :items="item.children" :currentPage="currentPage" :page="item.label" />
      <!-- Dropdown Menu End -->
    </div>
  </li>
</template>
