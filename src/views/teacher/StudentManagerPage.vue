<template>
    <div class="p-5 bg-gray-50 min-h-screen">
        <h1 class="text-2xl font-bold mb-5">Quản lý học viên</h1>
        <el-table :data="listStudentOfTeacher" border stripe style="width: 100%">
            <el-table-column prop="student_full_name" label="Họ và tên" />
            <el-table-column prop="student_email" label="Email" />
            <el-table-column prop="course_title" label="Khóa học" />
            <el-table-column prop="course_payment_status" label="Trạng thái thanh toán" />
            <el-table-column prop="course_purchase_date" label="Ngày tham gia " />
            <el-table-column prop="progress_percent" label="Tiến độ (%)">
                <template #default="{ row }">
                    <el-progress :percentage="row.progress_percent" />
                </template>
            </el-table-column>
            <el-table-column label="Hành động">
                <template #default="{ row }">
                    <el-button size="small" type="primary" @click="viewStudentProgress(row)">
                        Xem tiến độ
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- Drawer for student progress -->
        <el-drawer v-model="drawerVisible" title="Tiến độ học viên" :size="'40%'">
            <div class="space-y-4">
                <h2 class="font-bold text-lg">Tiến độ: {{ progressOfStudent?.progress_percent }}%</h2>
                <div>
                    <h3 class="font-semibold mb-2">Danh sách nội dung:</h3>
                    <el-collapse>
                        <el-collapse-item v-for="(content, index) in progressOfStudent?.allContent"
                            :title="content.title" :key="index">
                            <ul class="space-y-2">
                                <li v-for="section in content.section_content" :key="section.id"
                                    class="flex justify-between items-center">
                                    <span>{{ section.title }}</span>
                                    <el-tag :type="section.percent === 100 ? 'success' : 'info'">
                                        {{ section.percent }}%
                                    </el-tag>
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>

        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { useStudentManager } from "@/store/student-manager";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const studentManager = useStudentManager();
const {
    listStudentOfTeacher, progressOfStudent
} = storeToRefs(studentManager)
const { fetchListStudentOfTeacher,
    fetchProgressOfStudent } = studentManager
console.log(progressOfStudent)
const drawerVisible = ref(false);
const viewStudentProgress = async (row: any) => {
    drawerVisible.value = true;
    await fetchProgressOfStudent(row.student_id, row.course_id);
};

onMounted(async () => {
    await fetchListStudentOfTeacher()
});
</script>

<style scoped>
.el-table {
    background-color: white;
}
</style>