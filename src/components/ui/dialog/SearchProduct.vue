<template>
    <div>
        <div class="flex justify-center">
            <input v-model="searchKeyword" @keypress.enter="handleSearch" placeholder="Tìm kiếm ở đây"
                class="focus-visible:border-gray-500 w-1/2 py-2 border-b-2 border-gray-100 focus-visible:outline-none"
                type="text">
        </div>
        <div class="container-user">
            <div class="mt-5 gap-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">

                <CardCourse v-for="course in apiStore.coursesSearch" :key="course.id" :id="course.id"
                    :title="course.title"
                    :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                    :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                    :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { apisStore } from '@/store/apis';
import { onMounted, ref } from 'vue';
import CardCourse from '../card/CardCourse.vue';
const apiStore = apisStore();
const searchKeyword = ref<string>('');


const handleSearch = () => {
    // Trigger API call when input changes
    apiStore.fetchCourseSearch(searchKeyword.value);
};
onMounted(() => {
    apiStore.coursesSearch = [];
})
</script>
