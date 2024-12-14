<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">Quản lý Bình luận</h1>
        <!-- Bộ lọc theo khóa học -->
        <!-- <div class="mb-4 flex items-center gap-3">
            <el-select v-model="filters.courseId" placeholder="Chọn khóa học" clearable @change="fetchComments">
                <el-option v-for="course in courses" :key="course.id" :label="course.name" :value="course.id" />
            </el-select>

            <el-button class="flex items-center gap-1" type="primary" @click="fetchComments">
                Tìm kiếm
            </el-button>

            <el-button class="flex items-center gap-1" type="success" @click="openDeletedCommentsDialog">
                Xem bình luận đã xóa
            </el-button>
        </div> -->

        <!-- Bảng hiển thị bình luận -->
        <!-- <el-table :data="commentStore.state.comments" class="mt-4">
            <el-table-column prop="content" label="Bình luận" />
            <el-table-column prop="user" label="Người dùng" />
            <el-table-column prop="status" label="Trạng thái" />
            <el-table-column prop="createdAt" label="Ngày tạo" />
            <el-table-column label="Hành động">
                <template #default="{ row }">
                    <el-button @click="handleDelete(row.id)">Xóa</el-button>
                    <el-button v-if="row.status === 'deleted'" @click="restoreComment(row.id)">Khôi phục</el-button>
                </template>
</el-table-column>
</el-table> -->

        <!-- Phân trang -->
        <!-- <el-pagination v-model:current-page="pagination.currentPage" :page-size="pagination.perPage"
            :total="pagination.total" layout="prev, pager, next" @current-change="handlePageChange" /> -->

        <!-- Dialog Xem bình luận đã xóa -->
        <!-- <el-dialog v-model="deletedCommentsDialogVisible" title="Danh sách bình luận đã xóa">
            <el-table :data="commentStore.state.deletedComments">
                <el-table-column prop="content" label="Bình luận" />
                <el-table-column label="Hành động">
                    <template #default="{ row }">
                        <el-button @click="restoreComment(row.id)">Khôi phục</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog> -->
        <div class="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-2  gap-5 mt-5">
            <CardCourseReview v-for="course in coursesFilter" :key="course.id" :id="course.id" :title="course.title"
                :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />

        </div>

        <div class="mt-10 flex justify-center">
            <el-pagination size="default" background layout="prev, pager, next" :current-page="currentPage"
                @current-change="handlePageChange" :page-size="perPageData" :total="totalCourses" />


        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { useCommentStore } from '@/store/comment';
import { apisStore } from '@/store/apis';
import { useReviewsStore } from '@/store/review';
import { storeToRefs } from 'pinia';
import CardCourseReview from '@/components/ui/card/CardCourseReview.vue';
import { useFilter } from '@/composables/user/useFilter';
import { useShop } from '@/composables/user/useShop';
// const { fetchCate } = useHome()
const { activeFilter, fetchCoursesSection } = useShop()
const { fetchCourseFilter, coursesFilter, totalCourses, currentPage, perPageData } = useFilter();
const pageSize = 99999;
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
    fetchCourseFilter(currentPage.value, pageSize, perPageData.value, {}); // Truyền filters nếu có
};
onMounted(() => {
    fetchCoursesSection(activeFilter.value)
    fetchCourseFilter(currentPage.value, pageSize, perPageData.value, {}); // Truyền filters nếu có
});

const commentStore = useReviewsStore();
const apiStore = apisStore()
const { courses } = storeToRefs(apiStore)
const { fetchCourseSearch } = apiStore
// const filters = reactive({
//     courseId: null,
// });

// const pagination = reactive({
//     currentPage: 1,
//     perPage: 10,
//     total: 0,
// });

// const courses = ref([
//     { id: 1, name: 'Khóa học A' },
//     { id: 2, name: 'Khóa học B' },
// ]);

// const fetchComments = async () => {
//     if (!filters.courseId) {
//         ElMessage.error('Vui lòng chọn khóa học');
//         return;
//     }

//     const params = {
//         per_page: pagination.perPage,
//         page: pagination.currentPage,
//         course_id: filters.courseId,
//     };

//     await commentStore.fetchCommentsByLevel(filters.courseId, params);
//     pagination.total = commentStore.state.total;
// };

// const handleDelete = (commentId: number) => {
//     commentStore.deleteComment(commentId);
// };

// const restoreComment = (commentId: number) => {
//     commentStore.restoreComment(commentId);
// };

// const handlePageChange = (page: number) => {
//     pagination.currentPage = page;
//     fetchComments();
// };

// const openDeletedCommentsDialog = () => {
//     // Fetch deleted comments if necessary
//     commentStore.fetchDeletedComments();
// };





</script>