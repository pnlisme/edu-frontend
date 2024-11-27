<template>
    <header class="bg-gray-900 py-2 px-10 flex items-center justify-between">
        <RouterLink to="/" class="">
            <img class="w-32" :src="logo" alt="">
        </RouterLink>
        <h3 class="text-white text-lg font-medium">{{ nameCourse }}</h3>
        <RouterLink to="/mycourses" class="">
            <Button class="hover:shadow-none" variant="default">
                Khóa học của tôi
            </Button>
        </RouterLink>
    </header>
</template>

<script setup lang="ts">
import { useCourseStore } from '@/store/course';
import logo from '../../assets/images/logo2.svg'
import Button from '../ui/button/Button.vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
const courseStore = useCourseStore()
const route = useRoute();
const id = Number(route.params.id);
const { studyCourse, currentContent,
    allContent,
    progress, } = storeToRefs(courseStore)
const { fetchStudyCourse, changeContent } = courseStore
onMounted(async () => {
    await fetchStudyCourse(id)
})
// const nameCourse = studyCourse.value.course_title
import { watch } from 'vue';

const nameCourse = ref('Đang tải...');

watch(studyCourse, (newValue) => {
    if (newValue) {
        nameCourse.value = newValue.course_title;
    }
});
</script>
