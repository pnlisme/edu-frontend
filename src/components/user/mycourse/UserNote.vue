<!-- <template>
    <div class="mx-20 my-5">
        <div class="">
            <button class="flex items-center justify-between w-full border-2 px-5 py-2 border-gray-900">
                <span class="text-gray-600">
                    Tạo ghi chú lúc 0:00
                </span>
                <PlusCircleIcon class="h-5 w-5" />
            </button>
        </div>
        <div class="flex mt-3 gap-3">
            <div class=" w-1/3 flex flex-col gap-3 ">
                <label class="font-medium" for="">
                    Bộ lọc
                </label>
                <div class=" border-2 border-gray-900 flex justify-between">
                    <select class="px-5 w-full py-2 focus-visible:outline-none">
                        <option value="">Tất cả bài giảng</option>
                        <option value="">Bài giảng hiện tại</option>
                    </select>
                </div>
            </div>
        </div>
        <div class=" mt-5">
            <div class="flex justify-between">
                <div class="">
                    <button class="bg-gray-900 px-2 rounded-full font-medium text-white ">0:02</button>
                </div>
                <div class="flex flex-col">

                    <div class="flex justify-between gap-5 items-center">
                        <div class="flex items-end gap-3">
                            <h3 class="font-medium text-xl ">1. Bắt đầu</h3>
                            <span>7. Pages Router so với App Router - Một Framework, Hai Cách Tiếp Cận</span>
                        </div>
                        <div class="flex gap-2">
                            <button>
                                <TrashIcon class="h-5 w-5" />
                            </button>
                            <button>
                                <PencilSquareIcon class="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div class="w-full p-5 bg-indigo-50 rounded-lg mt-5">
                        <span>Đây là note</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";

</script>

<style scoped></style> -->
<template>
    <div class="mx-10 my-5">
        <!-- Button Tạo Ghi Chú -->
        <div class="mb-5">
            <el-button type="primary" class="flex gap-3" @click="openCreateDialog">

                <PencilSquareIcon class="h-5 w-5 text-white" />Tạo Ghi Chú
            </el-button>
        </div>

        <!-- Danh Sách Ghi Chú -->
        <div class="mt-5">
            <el-table :data="state.notes" style="width: 100%">
                <el-table-column prop="lecture_title" label="Bài Giảng" />
                <el-table-column prop="content" label="Nội Dung" />
                <el-table-column prop="current_time" label="Thời gian">
                    <template #default="{ row }">
                        <span>{{ formatTime(row.current_time) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Hành Động" width="180">
                    <template #default="{ row }">
                        <div class="flex gap-3 items-center">

                            <PencilSquareIcon @click="openEditDialog(row)"
                                class="h-5  w-5 cursor-pointer text-blue-500" />
                            <TrashIcon @click="handleDelete(row.id)" class="h-5  w-5 cursor-pointer text-red-500" />
                            <!-- <EyeIcon @click="handleChangeContent(row)" class="h-5  w-5 cursor-pointer text-green-500" /> -->
                        </div>

                    </template>
                </el-table-column>

            </el-table>
        </div>

        <!-- Dialog Tạo Ghi Chú -->
        <el-dialog v-model="createDialogVisible" title="Tạo Ghi Chú" width="500px">
            <el-form :model="noteForm" ref="noteFormRef">
                <el-form-item label="Nội Dung" prop="content">
                    <el-input type="textarea" v-model="noteForm.content" :rows="3"
                        placeholder="Nhập nội dung ghi chú" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="createDialogVisible = false">Hủy</el-button>
                <el-button type="primary" @click="handleCreateNote">Lưu</el-button>
            </template>
        </el-dialog>

        <!-- Dialog Sửa Ghi Chú -->
        <el-dialog v-model="editDialogVisible" title="Sửa Ghi Chú" width="500px">
            <el-form :model="noteForm" ref="noteFormRef">

                <el-form-item label="Nội Dung" prop="content">
                    <el-input type="textarea" v-model="noteForm.content" rows="3" placeholder="Nhập nội dung ghi chú" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="editDialogVisible = false">Hủy</el-button>
                <el-button type="primary" @click="handleUpdateNote">Cập Nhật</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNotesStore } from '@/store/note';
import { ElMessage } from 'element-plus';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { useCourseStore } from '@/store/course';
const noteStore = useNotesStore()
const { fetchNotes,
    fetchNoteDetail,
    createNote,
    updateNote,
    deleteNote } = noteStore
const { state } = storeToRefs(noteStore)

// Props để nhận course_id từ cha
const props = defineProps<{
    course_id: number;
    section_id: number;
    lecture_id: number;
    lecture_title: string;
    currentTime: number;
}>();
const courseStore = useCourseStore();
const { fetchStudyCourse, changeContent } = courseStore;
// State quản lý dialog và form
const createDialogVisible = ref(false);
const editDialogVisible = ref(false);
interface TNoteFrom {
    id?: number
    course_id?: number
    section_id?: number
    lecture_id?: number
    current_time?: number
    lecture_title?: string
    content: string
}
const noteForm = ref<TNoteFrom>({
    current_time: 0,
    content: '',
});

onMounted(() => {
    fetchNotes(props.course_id)
});
const handleCreateNote = async () => {
    const data = {
        course_id: props.course_id,
        section_id: props.section_id,
        lecture_id: props.lecture_id,
        current_time: props.currentTime,
        lecture_title: props.lecture_title,
        content: noteForm.value.content,
    }
    await createNote(data)
    createDialogVisible.value = false;
}

// const handleChangeContent = async (lesson: any) => {
//     const data = {
//         course_id: props.course_id,
//         content_type: '',
//         content_id: lesson.lecture.id,
//         learned: lesson.learned,
//         content_old_type: '',
//         content_old_id: 0
//     }
//     await changeContent(data);
// }





const openCreateDialog = () => {
    noteForm.value = { content: '' };
    createDialogVisible.value = true;
};

const openEditDialog = (note: any) => {
    noteForm.value = { ...note };
    editDialogVisible.value = true;
};


const handleUpdateNote = async () => {
    const data = {
        course_id: props.course_id,
        section_id: noteForm.value.section_id ?? 0,
        lecture_id: noteForm.value.lecture_id ?? 0,
        current_time: noteForm.value.current_time ?? 0,
        lecture_title: noteForm.value.lecture_title || '',
        content: noteForm.value.content,
    };
    await updateNote(noteForm.value.id!, data);
    editDialogVisible.value = false;
};
const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60); // Lấy phút
    const remainingSeconds = seconds % 60; // Lấy số giây còn lại
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};
const handleDelete = async (id: number) => {
    await deleteNote(id, props.course_id);
};

// Lifecycle
</script>
