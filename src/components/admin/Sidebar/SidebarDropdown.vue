<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSidebarStore } from '@/store/sidebar';
import type { SidebarItemChildren } from '@/interfaces/admin.interface';
import type { SidebarItemChildren2 } from '@/interfaces/admin.interface';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';


const props = defineProps<{
  items: SidebarItemChildren[];
  page: string;
  // children: SidebarItemChildren2[];
}>();
const sidebarStore = useSidebarStore();

//Hàm xử lý dropdown
const activeIndex = ref<number | null>(null);
const handleDropdownClick = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
}

const handleItemChildrenClick = (parentIndex: number, childIndex: number) => {
  const selectedChild = props.items[parentIndex].children?.[childIndex].label;
  if (selectedChild) {
    sidebarStore.selected = selectedChild; // Cập nhật mục được chọn
  }
};



</script>
<template>
  <div>
    <ul class="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6" :class="{ 'mt-0 pl-0 p-4': sidebarStore.isSidebarOpen }">
      <template v-for="(childItem, index) in props.items" :key="index">
        <li>
          <RouterLink v-if="childItem" :to="childItem.route || '/admin/dashboard'"
            class="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-zinc-400 duration-300 ease-in-out "
            @click.prevent="handleDropdownClick(index)" :class="{
              'text-white': childItem.children && childItem.children.some(subItem => subItem.label === sidebarStore.selected),
              'hover:text-black': sidebarStore.isSidebarOpen,
              'hover:text-white': !sidebarStore.isSidebarOpen,
            }">
            {{ childItem.label }}
            <ChevronRightIcon v-if="childItem.children" class="h-5 w-5 right-2 absolute"
              :class="{ 'rotate-90': activeIndex === index }" />
          </RouterLink>
        </li>
        <ul class="mb-5.5 flex flex-col gap-2.5 pl-6 " v-if="activeIndex !== null && activeIndex === index">
          <template v-for="(childItem2, subIndex) in childItem.children" :key="childItem2.label">
            <li>
              <RouterLink v-if="childItem2" :to="childItem2.route || '/admin/dashboard'"
                class=" text-zinc-400 group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out"
                :class="{
                  '!text-white': childItem2.label === sidebarStore.selected,
                  '!text-black': sidebarStore.isSidebarOpen && childItem2.label === sidebarStore.selected,
                  'hover:text-black': sidebarStore.isSidebarOpen,
                  'hover:text-white': !sidebarStore.isSidebarOpen,
                }" @click.prevent="handleItemChildrenClick(index, subIndex)">
                {{ childItem2.label }}
              </RouterLink>
            </li>
          </template>
        </ul>
      </template>
    </ul>
  </div>
</template>
