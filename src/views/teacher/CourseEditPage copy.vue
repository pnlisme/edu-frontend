<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
            <!-- Header -->
            <header class="flex justify-between items-center">
                <h2 class="text-lg font-bold">Quản lý bài học</h2>
                <!-- <el-button type="primary" @click="openAddLectureModal">Thêm bài học</el-button> -->
            </header>

            <!-- Danh sách bài học -->
            <section>
                <div class="flex items-center justify-between mb-10">
                    <h3 class="text-md font-semibold mb-4">Nội dung chương học</h3>
                    <el-button type="primary">+ Thêm chương học</el-button>
                </div>
                <!-- <draggable v-model="listContentOfSection" class="space-y-4" handle=".drag-handle" @end="handleSort">
                    <div v-for="lecture in listContentOfSection" :key="lecture.id"
                        class="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
                        <h2>{{ lecture }}</h2>
                        <div class="flex items-center gap-4">
                            <div class="drag-handle cursor-move text-gray-500">
                                <i class="el-icon-rank"></i>
                            </div>
                            <div>
                                <p class="font-semibold">{{ lecture.title }}</p>
                                <p class="text-sm text-gray-500">
                                    {{ lecture.type.toUpperCase() }} • {{ lecture.duration }} phút
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <el-tag v-if="lecture.status === 'active'" type="success">Hoạt động</el-tag>
                            <el-tag v-else type="warning">Không hoạt động</el-tag>
                            <el-button type="text" icon="el-icon-edit" @click="editLecture()"></el-button>
                            <el-button type="text" icon="el-icon-delete" @click="deleteLecture()"></el-button>
                        </div>
                    </div>
                </draggable> -->
                <!-- <Draggable class="dragArea list-group w-full" :list="list" @change="log">
                    <motion-div v-for="element in list" :key="element.id"
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :leave="{ opacity: 0, y: -20 }"
                        transition="{ duration: 0.3 }">
                        {{ element.name }}
                    </motion-div>
                </Draggable> -->
                <Draggable v-model="listSection" class="space-y-2" @change="handleSort">
                    <div v-for="item in listSection" :key="item.id" v-motion :initial="{ opacity: 0, y: 30 }"
                        :enter="{ opacity: 1, y: 0 }" :leave="{ opacity: 0, y: -30 }"
                        :transition="{ type: 'spring', stiffness: 150, damping: 20 }"
                        class="flex items-center justify-between bg-indigo-400 p-4 rounded-lg shadow-md">
                        <div class="drag-handle cursor-move text-white">
                            <!-- <i class="el-icon-rank"></i> -->
                            {{ item.total_contents || 0 }} bài học
                        </div>
                        <p class="text-white">{{ item.title }}</p>
                        <div class="flex items-center gap-2">
                            <PencilSquareIcon class="h-5 w-5 cursor-pointer text-white" />
                            <TrashIcon class="h-5 w-5 cursor-pointer text-white" />
                            <EyeIcon class="h-5 w-5 cursor-pointer text-white" />
                        </div>
                        <!-- <el-button type="text" icon="el-icon-delete" @click="removeItem(item.id)"></el-button> -->
                    </div>
                </Draggable>
                <!-- <div v-for="lecture in listContentOfSection" :key="lecture.id">
                    <h3>{{ lecture.content_link }}</h3>
                </div> -->
            </section>
        </div>

        <!-- Modal Thêm/Sửa bài học -->
        <!-- <el-dialog v-model="isLectureModalVisible" title="Thêm/Sửa Bài Học" width="500px">
            <el-form :model="lectureForm">
                <el-form-item label="Tiêu đề">
                    <el-input v-model="lectureForm.title" placeholder="Nhập tiêu đề bài học"></el-input>
                </el-form-item>
                <el-form-item label="Loại">
                    <el-select v-model="lectureForm.type" placeholder="Chọn loại bài học">
                        <el-option label="Video" value="video"></el-option>
                        <el-option label="File" value="file"></el-option>
                        <el-option label="Quiz" value="quiz"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Thời lượng">
                    <el-input-number v-model="lectureForm.duration" placeholder="Thời lượng (phút)" />
                </el-form-item>
                <el-form-item label="Trạng thái">
                    <el-switch v-model="lectureForm.status" active-text="Hoạt động" inactive-text="Không hoạt động" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="isLectureModalVisible = false">Hủy</el-button>
                <el-button type="primary" @click="saveLecture">Lưu</el-button>
            </template>
</el-dialog> -->
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import draggable from "vuedraggable";
import { ElMessage, ElMessageBox } from "element-plus";
import { useCourseStore } from "@/store/course";
import { useRoute } from "vue-router";
import type { TLecture } from "@/interfaces";

import { VueDraggableNext as Draggable } from "vue-draggable-next";
import { useMotion } from "@vueuse/motion";
import { EyeIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
// import { Motion } from "@vueuse/motion";
const handleDragEnd = (event: any) => {
    console.log("Drag End Event:", event);
};
const list = ref([
    { id: 1, course_id: 25, title: "title  1" },
    { id: 2, course_id: 25, title: "title  2" },
    { id: 3, course_id: 25, title: "title  3" },
    { id: 4, course_id: 25, title: "title  4" },
    { id: 5, course_id: 25, title: "title  5" },
    { id: 6, course_id: 25, title: "title  6" },
]);

// useMotion();


// Xóa mục
const removeItem = (id: number) => {
    list.value = list.value.filter((item) => item.id !== id);
};
// Props để truyền vào motion
const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, type: "spring" },
};
const handleSort = (event: any) => {
    console.log("Sorted:", list.value);
};
// const isLectureModalVisible = ref(false); // Modal hiển thị thêm/sửa bài học
// const lectureForm = ref({
//     id: null,
//     title: "",
//     type: "video",
//     duration: 0,
//     status: "active",
// }); // Form dữ liệu cho thêm/sửa bài học
const route = useRoute();
const id_course = route.params.id ? Number(route.params.id) : null;
const useCourse = useCourseStore()
const { showSectionOfCourse, createSection } = useCourse
const { listSection } = storeToRefs(useCourse)
console.log(listSection)


// // Xử lý kéo thả
// const handleSort = async () => {
//     try {
//         const sortedData = listContentOfSection.value.map((item, index) => ({
//             id: item.id,
//             order: index + 1,
//         }));
//         await api.put("/auth/sort-content-of-section", { sorted_content: sortedData });
//         ElMessage.success("Cập nhật thứ tự bài học thành công");
//     } catch (error) {
//         console.error("Lỗi khi sắp xếp bài học:", error);
//         ElMessage.error("Không thể cập nhật thứ tự bài học");
//     }
// };
// // Khởi tạo
onMounted(async () => {
    await showSectionOfCourse(id_course || 0); // ID chương cần hiển thị
});
// console.log(listContentOfSection)
// const openAddLectureModal = () => {
//     lectureForm.value = {
//         section_id: undefined,
//         type: "video", // Giá trị mặc định
//         title: "",
//         content: "",
//         duration: 0,
//         preview: null,
//         status: "active",
//         order: undefined,
//     };
//     isLectureModalVisible.value = true;
// };

// const saveLecture = async () => {
//     try {
//         if (!id_course) {
//             ElMessage.error("ID khóa học không hợp lệ");
//             return;
//         }
//         if (lectureForm.value.id) {
//             // Sửa bài học
//             await updateLecture(id_course, lectureForm.value.id, lectureForm.value)
//         } else {
//             await createLecture(id_course, lectureForm.value)
//         }
//         isLectureModalVisible.value = false;
//         await showContentOfSection(id_course); // ID chương cần hiển thị
//     } catch (error) {
//         console.error("Lỗi khi lưu bài học:", error);
//         ElMessage.error("Không thể lưu bài học");
//     }

// };

// const editLecture = (lecture: TLecture) => {
//     lectureForm.value = { ...lecture };
//     isLectureModalVisible.value = true;
// };
</script>
<style scoped>
.list-item {
    user-select: none;
    transition: box-shadow 0.3s ease;
}

.list-item:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>