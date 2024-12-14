<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <div class="mb-3">

            <ButtonGoBack />

        </div>
        <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
            <!-- Header -->
            <header class="flex justify-between items-center">
                <h2 class="text-lg font-bold">Quản lý bài học</h2>
            </header>

            <!-- Danh sách bài học -->
            <section>
                <div class="flex items-center justify-between mb-10">
                    <h3 class="text-md font-semibold mb-4">Nội dung chương học</h3>
                    <div class="flex gap-2">
                        <el-button type="primary" @click="openAddSectionDialog">+ Thêm chương học</el-button>
                        <el-button type="success">
                            <ArrowPathIcon class="mr-1 h-4 w-4 text-white" />
                            Khôi phục
                        </el-button>
                    </div>
                </div>
                <TransitionGroup tag="div" class="space-y-2" name="list" mode="out-in">
                    <Draggable v-model="listSection" class="space-y-2" @change="handleSort" :animation="200">
                        <div v-for="item in listSection" :key="item.id" v-motion :initial="{ opacity: 0, y: 30 }"
                            :enter="{ opacity: 1, y: 0 }" :leave="{ opacity: 0, y: -30 }"
                            :transition="{ type: 'spring', stiffness: 150, damping: 20 }"
                            :class="['flex items-center justify-between p-4 rounded-lg shadow-md', item.status === 'active' ? 'bg-indigo-400' : 'bg-indigo-200']">
                            <div class="drag-handle cursor-move text-white">
                                {{ item.total_contents || 0 }} bài học
                            </div>
                            <p class="text-white">{{ item.title }}</p>
                            <div class="flex items-center gap-2">
                                <PencilSquareIcon @click="openUpdateSectionDialog(item)"
                                    class="h-5 w-5 cursor-pointer text-white" />
                                <TrashIcon @click="deleteSectionHandler(item.id)"
                                    class="h-5 w-5 cursor-pointer text-white" />
                                <EyeIcon @click="navigateToEditSection(item.id)"
                                    class="h-5 w-5 cursor-pointer text-white" />
                            </div>
                        </div>
                    </Draggable>
                </TransitionGroup>
            </section>
        </div>

    </div>
    <!-- create -->
    <el-dialog v-model="isDialogVisible" title="Thêm Chương Học" width="500px">
        <el-form :model="newSection" :rules="rules" ref="sectionForm">
            <el-form-item label="Tên chương học" prop="title" class="block">
                <el-input v-model="newSection.title" placeholder="Nhập tên chương học" />
            </el-form-item>
            <el-form-item label="Mô tả" prop="description" class="block">
                <el-input v-model="newSection.description" type="textarea" placeholder="Nhập mô tả" />
            </el-form-item>
            <el-form-item label="Trạng thái" prop="status" class="block">
                <el-select v-model="newSection.status" placeholder="Chọn trạng thái">
                    <el-option label="Hoạt động" value="active"></el-option>
                    <el-option label="Không hoạt động" value="inactive"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="isDialogVisible = false">Hủy</el-button>
            <el-button type="primary" @click="addSection">Thêm</el-button>
        </template>
    </el-dialog>
    <!-- update -->
    <el-dialog v-model="isUpdateDialogVisible" title="Cập Nhật Chương Học" width="500px">
        <el-form :model="updatedSection" :rules="rules" ref="updateSectionForm">
            <el-form-item label="Tên chương học" prop="title" class="block">
                <el-input v-model="updatedSection.title" placeholder="Nhập tên chương học" />
            </el-form-item>
            <el-form-item label="Mô tả" prop="description" class="block">
                <el-input v-model="updatedSection.description" type="textarea" placeholder="Nhập mô tả" />
            </el-form-item>
            <el-form-item label="Trạng thái" prop="status" class="block">
                <el-select v-model="updatedSection.status" placeholder="Chọn trạng thái">
                    <el-option label="Hoạt động" value="active"></el-option>
                    <el-option label="Không hoạt động" value="inactive"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="isUpdateDialogVisible = false">Hủy</el-button>
            <el-button type="primary" @click="updateSectionHandler">Cập nhật</el-button>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import draggable from "vuedraggable";
import { ElMessage, ElMessageBox } from "element-plus";
import { useCourseStore } from "@/store/course";
import { useRoute, useRouter } from "vue-router";
import type { TSection, TLecture } from "@/interfaces/course.interface";

import { VueDraggableNext as Draggable } from "vue-draggable-next";
import { useMotion } from "@vueuse/motion";
import { ArrowPathIcon, ChevronLeftIcon, EyeIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import ButtonGoBack from "@/components/ui/button/ButtonGoBack.vue";
const route = useRoute();
const id_course = route.params.id ? Number(route.params.id) : null;
const useCourse = useCourseStore()
const { showSectionOfCourse, createSection, updateSection, deleteSection, sortSectionsOfCourse } = useCourse
const { listSection } = storeToRefs(useCourse)
// import { Motion } from "@vueuse/motion";

// Dialog và form thêm chương
const isDialogVisible = ref(false);
const isUpdateDialogVisible = ref(false);
const sectionForm = ref();
const newSection = ref<TSection>({
    title: "",
    description: "",
    status: "active",
    course_id: id_course || 0,
});
const updatedSection = ref<TSection>({
    id: 0,
    title: "",
    description: "",
    status: "active",
    course_id: id_course || 0,
});
const rules = {
    title: [{ required: true, message: "Tên chương học là bắt buộc", trigger: "blur" }],
    description: [{ required: true, message: "Mô tả là bắt buộc", trigger: "blur" }],
    status: [{ required: true, message: "Trạng thái là bắt buộc", trigger: "change" }],
};

// Xử lý mở dialog thêm chương học
const openAddSectionDialog = () => {
    isDialogVisible.value = true;
    newSection.value = {
        title: "",
        description: "",
        status: "active",
        course_id: id_course || 0,
    };
};
const addSection = async () => {
    await sectionForm.value.validate();
    if (id_course) {
        await createSection(id_course, newSection.value);
        isDialogVisible.value = false;
    }

};
// Open Update Section Dialog
const openUpdateSectionDialog = (item: any) => {
    isUpdateDialogVisible.value = true;
    updatedSection.value = { ...item };
};

// Update Section
const updateSectionHandler = async () => {
    if (!id_course || !updatedSection.value.id) return;
    await updateSection(id_course, updatedSection.value.id, updatedSection.value);
    isUpdateDialogVisible.value = false;
};
const deleteSectionHandler = async (sectionId: number) => {
    if (!id_course) return;
    await deleteSection(id_course, sectionId);
};
const handleSort = async () => {
    if (!id_course) return;
    const sortedData = listSection.value.map((section, index) => ({
        id: section.id,
        course_id: id_course,
        title: section.title,
        description: section.description,
        status: section.status,
        order: index + 1,
    }));
    await sortSectionsOfCourse(sortedData)
};

const router = useRouter();
const navigateToEditSection = (id: number) => {
    router.push({ name: 'CourseSectionEditPage', params: { id: String(id) } });
}
// // Khởi tạo
onMounted(async () => {
    await showSectionOfCourse(id_course || 0); // ID chương cần hiển thị
});

</script>
<style scoped>
.list-item {
    user-select: none;
    transition: box-shadow 0.3s ease;
}

.list-item:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.draggable-item {
    transition: all 0.2s ease;
}
</style>