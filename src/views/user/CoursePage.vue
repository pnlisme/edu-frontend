<template>
    <main class="py-16">
        <!-- PRODUCT FILTER-->
        <section class="container-user mt-5">
            <div class="flex flex-col gap-3">
                <h1 class="text-4xl font-semibold">Các khóa học về <span class="text-indigo-600">khoa học máy
                        tính</span></h1>
                <!-- <div class="flex gap-3">
                    <UsersIcon class="h-6 w-6 text-gray-900" />
                    <span class="text-sm">2853852 người học</span>
                </div> -->
            </div>
            <div class="mt-5">
                <h3 class=" font-semibold text-2xl">Các khóa học giúp bạn bắt đầu</h3>
                <span>Khám phá các khóa học từ các chuyên gia giàu kinh nghiệm thực tế.</span>
                <!-- FILTER -->
                <div class="mt-5">

                    <ul class="sm:flex gap-3 hidden ">
                        <li @click="changeFilter('new')"
                            :class="{ 'text-indigo-600 border-indigo-600 border-b-4': activeFilter === 'new' }"
                            class="text-md font-medium p-2 hover:border-indigo-600 animation hover:text-indigo-600  cursor-pointer text-gray-500 hover:border-b-4">
                            Mới
                        </li>
                        <li @click="changeFilter('popular')"
                            :class="{ 'text-indigo-600 border-indigo-600 border-b-4': activeFilter === 'popular' }"
                            class="text-md font-medium p-2 hover:border-indigo-600 animation hover:text-indigo-600  cursor-pointer text-gray-500 hover:border-b-4">
                            Phổ biến
                        </li>
                        <li @click="changeFilter('top-rated')"
                            :class="{ 'text-indigo-600 border-indigo-600 border-b-4': activeFilter === 'top-rated' }"
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-indigo-600 animation hover:border-b-4 cursor-pointer text-gray-500">
                            Hàng đầu
                        </li>
                        <li @click="changeFilter('favourite')"
                            :class="{ 'text-indigo-600 border-indigo-600 border-b-4': activeFilter === 'favourite' }"
                            class="text-md font-medium p-2 animation hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 animation cursor-pointer text-gray-500">
                            Yêu thích nhất
                        </li>
                    </ul>
                    <div class="flex">
                        <RouterLink to="/course" class="sm:hidden block ">
                            <div class="px-3 py-3 flex items-center justify-center rounded-lg bg-indigo-600">
                                <FunnelIcon class="h-5  font-semibold w-5 text-white " />
                            </div>
                        </RouterLink>
                    </div>
                    <h3 class="mt-5 font-semibold text-2xl">
                        Giúp bạn có thêm cơ hội nghề nghiệp với Thiết kế đồ họa
                    </h3>
                </div>
                <div v-loading="loadingFilterSection" element-loading-text="Đang tải..."
                    class="mt-5 gap-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
                    <CardCourse v-for="course in coursesFilterSection" :key="course.id" :id="course.id"
                        :title="course.title"
                        :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                        :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                        :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />

                </div>
            </div>
        </section>
        <!-- COURSE MAIN -->
        <section class="container-user my-16">
            <div class="flex flex-col gap-3">
                <h1 class="text-4xl font-semibold">Tất cả khóa học trên <span class="text-indigo-600">
                        Edunity</span></h1>
            </div>

            <!-- MAIN -->
            <div class="flex flex-col md:flex-row mt-10 gap-5">

                <!-- FILTER  -->
                <div class=" ">
                    <div class="md:w-72 w-full sticky top-0 shadow-md rounded-md p-3 flex flex-col gap-5">
                        <div class="md:hidden block">
                            <div class="flex items-center justify-between">
                                <div class="">
                                    <div @click="fillter = true" class="  cursor-pointer bg-indigo-600 rounded-md p-2">
                                        <FunnelIcon class="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <UserCourseFilter @updateFilters="handleUpdateFilters" />
                        </div>

                    </div>
                </div>
                <el-drawer direction="ltr" v-model="fillter" title="I am the title" :with-header="false" size="50%">
                    <UserCourseFilter @updateFilters="handleUpdateFilters" />
                </el-drawer>

                <!-- RESUILT -->
                <div class=" w-full" v-if="noProduct">

                    <div class=" flex justify-center items-center">

                        <img class=""
                            src="https://cdn3d.iconscout.com/3d/premium/thumb/search-notes-5066175-4235211.png?f=webp"
                            alt="">
                    </div>

                </div>
                <div v-else class="">
                    <h3 class="text-lg">Hiển thị <span class="font-medium">{{ totalCourses }} khóa học </span>
                    </h3>
                    <div v-loading="loadingCourses" element-loading-text="Đang tải..."
                        class="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-2  gap-5 mt-5">
                        <CardCourse v-for="course in coursesFilter" :key="course.id" :id="course.id"
                            :title="course.title"
                            :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                            :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                            :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />

                    </div>
                    <!-- <div class=" mt-10  flex justify-center">

                        <el-pagination size="medium" background layout="prev, pager, next" :total="1000" />
                    </div> -->
                    <!-- <div class="mt-10 flex justify-center">
                        <el-pagination size="medium" background layout="prev, pager, next" :total="totalCourses"
                            :current-page="currentPage" @current-change="handlePageChange" :page-size="lastPage" />
                    </div> -->
                    <div class="mt-10 flex justify-center">
                        <el-pagination size="default" background layout="prev, pager, next" :current-page="currentPage"
                            @current-change="handlePageChange" :page-size="perPageData" :total="totalCourses" />


                    </div>
                </div>
            </div>
        </section>
        <UserNewsLetter />
    </main>
</template>
<script setup lang="ts">
import CardCourse from '@/components/ui/card/CardCourse.vue';
import UserCourseFilter from '@/components/user/UserCourseFilter.vue';
import UserNewsLetter from '@/components/user/UserNewsLetter.vue';
import { useFilter } from '@/composables/user/useFilter';
import { useShop } from '@/composables/user/useShop';
import { FunnelIcon, UsersIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from 'vue';
const fillter = ref(false)
const loadingFilterSection = ref(false);
const loadingCourses = ref(false);


const { coursesFilterSection, activeFilter, fetchCoursesSection, changeFilter } = useShop()
const { fetchCourseFilter, coursesFilter, noProduct, lastPage, totalCourses, currentPage, paginationLinks, perPageData } = useFilter();
const pageSize = 99999;
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
    fetchCourseFilter(currentPage.value, pageSize, perPageData.value, {}); // Truyền filters nếu có
};

onMounted(async () => {
    loadingFilterSection.value = true;
    try {
        await fetchCoursesSection(activeFilter.value)
        await fetchCourseFilter(currentPage.value, pageSize, perPageData.value, {}); // Truyền filters nếu có
    } finally {
        loadingFilterSection.value = false;
    }
});

const handleUpdateFilters = async (filters: any) => {
    loadingCourses.value = true;
    try {
        await fetchCourseFilter(currentPage.value, pageSize, perPageData.value, filters);
    } finally {
        loadingCourses.value = false;
    }
};

</script>