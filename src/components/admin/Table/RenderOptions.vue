<template>
  <div class="relative inline-block text-left">
    <button @click="toggleMenu" class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
      <EllipsisVerticalIcon class="w-5" />aa
    </button>
    <div v-if="menuVisible" class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div class="py-1">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="viewCourse">View Course On Frontend</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="goToCoursePage">Go To Course Playing Page</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="editCourse">Edit Course</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="duplicateCourse">Duplicate Course</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="makeInactive">Make As Inactive</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="deleteCourse">Delete Course</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { EllipsisVerticalIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
  row: any; // Đối số cho row nếu cần thiết
}>();

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

// Các hàm xử lý sự kiện như trước đó
const viewCourse = () => { /* Logic */ };
const goToCoursePage = () => { /* Logic */ };
const editCourse = () => { /* Logic */ };
const duplicateCourse = () => { /* Logic */ };
const makeInactive = () => { /* Logic */ };
const deleteCourse = () => { /* Logic */ };
</script>
