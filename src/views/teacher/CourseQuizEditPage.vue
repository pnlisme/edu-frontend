<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <div class="mb-3">

            <ButtonGoBack />

        </div>
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
            <!-- Header -->
            <header class="flex justify-between items-center">
                <h2 class="text-lg font-bold">Quản lý câu hỏi</h2>
                <el-button type="primary" @click="openAddQuestionDialog">+ Thêm câu hỏi</el-button>
            </header>

            <!-- Danh sách câu hỏi -->
            <section>
                <TransitionGroup tag="div" class="space-y-4" name="list" mode="out-in">
                    <Draggable v-model="listQuestion" class="space-y-2" @change="handleSort" :animation="200">
                        <div v-for="(question, index) in listQuestion" :key="question.id"
                            :class="['p-4  rounded-md shadow-md', question.status === 'active' ? 'bg-indigo-200' : 'bg-indigo-100']">
                            <div class="flex justify-between items-center">
                                <h3 class="font-semibold text-indigo-700">Câu {{ index + 1 }}: {{ question.question
                                    }}</h3>
                                <div class="flex gap-2">
                                    <el-button type="primary" size="mini"
                                        @click="openUpdateQuestionDialog(question)">Sửa</el-button>
                                    <el-button type="danger" size="mini"
                                        @click="hanlDedeleteQuestion(question.id)">Xóa</el-button>
                                </div>
                            </div>

                            <ul class="mt-2 space-y-1">
                                <li v-for="(option, i) in question.options" :key="i" class="flex items-center gap-2">
                                    <div
                                        :class="['p-2 rounded-md', option === question.answer ? 'bg-green-200' : 'bg-gray-200']">
                                        {{ option }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Draggable>
                </TransitionGroup>
            </section>
        </div>

        <!-- Dialog Thêm/Sửa Câu Hỏi -->
        <el-dialog v-model="isDialogVisible" title="Thêm/Sửa Câu Hỏi" width="500px">
            <el-form :model="editingQuestion" :rules="rules" ref="questionForm">
                <el-form-item label="Câu hỏi" prop="question" class="block">
                    <el-input v-model="editingQuestion.question" placeholder="Nhập câu hỏi" />
                </el-form-item>
                <el-form-item label="Trạng thái" prop="status" class="block">
                    <el-select v-model="editingQuestion.status" placeholder="Chọn trạng thái">
                        <el-option label="Hoạt động" value="active"></el-option>
                        <el-option label="Không hoạt động" value="inactive"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Các đáp án" prop="options" class="block">
                    <el-input v-model="newOption" placeholder="Nhập đáp án mới" @keyup.enter="addOption" />
                    <el-button size="mini" type="success" class="mt-2" @click="addOption">Thêm đáp án</el-button>
                    <ul class="mt-2 space-y-1">
                        <li v-for="(option, index) in editingQuestion.options" :key="index"
                            class="flex items-center gap-2">
                            <div class="flex-1 p-2 bg-gray-100 rounded-md">{{ option }}</div>
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeOption(index)" />
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="Đáp án đúng" prop="answer" class="block">
                    <el-select v-model="editingQuestion.answer" placeholder="Chọn đáp án đúng">
                        <el-option v-for="(option, index) in editingQuestion.options" :key="index" :label="option"
                            :value="option" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="closeDialog">Hủy</el-button>
                <el-button type="primary" @click="saveQuestion">Lưu</el-button>
            </template>
        </el-dialog>
    </div>



    <!-- <div>
        <h2>{{ listQuestion }}</h2>
    </div> -->
</template>

<script setup lang="ts">
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import ButtonGoBack from '@/components/ui/button/ButtonGoBack.vue';

const route = useRoute();
const id_quiz = route.params.id ? Number(route.params.id) : null;

const useCourse = useCourseStore()
const { showQuestionsOfQuiz, createQuestion,
    updateQuestion, deleteQuestion,
    sortQuestionsOfQuiz } = useCourse
const { listQuestion } = storeToRefs(useCourse)


const isDialogVisible = ref(false);

const editingQuestion = ref({
    id: null,
    question: '',
    status: 'active',
    options: [] as string[],
    answer: '',
    quiz_id: id_quiz || 0,
});

const newOption = ref('');
const rules = {
    question: [{ required: true, message: 'Câu hỏi không được để trống', trigger: 'blur' }],
    options: [{ required: true, message: 'Đáp án không được để trống', trigger: 'blur' }],
    answer: [{ required: true, message: 'Đáp án đúng không được để trống', trigger: 'change' }],
};

const openAddQuestionDialog = () => {
    isDialogVisible.value = true;
    editingQuestion.value = {
        id: null,
        question: '',
        status: 'active',
        options: [],
        answer: '',
        quiz_id: id_quiz || 0,
    };
};




const closeDialog = () => {
    isDialogVisible.value = false;
};

const openUpdateQuestionDialog = (question: any) => {
    isDialogVisible.value = true;
    editingQuestion.value = { ...question };
};


const saveQuestion = async () => {
    if (!editingQuestion.value.id) {
        // Create new question
        await createQuestion(id_quiz || 0, editingQuestion.value);
    } else {
        // Update existing question
        await updateQuestion(id_quiz || 0, editingQuestion.value.id, editingQuestion.value);
    }
    closeDialog();
};


const hanlDedeleteQuestion = async (id: number) => {
    await deleteQuestion(id_quiz || 0, id);
    // console.log(id_quiz, id)
};


const addOption = () => {
    if (newOption.value.trim()) {
        editingQuestion.value.options.push(newOption.value.trim());
        newOption.value = '';
    }
};

const removeOption = (index: number) => {
    editingQuestion.value.options.splice(index, 1);
};

const handleSort = async () => {
    const sortedData = listQuestion.value.map((question, index) => ({
        ...question,
        order: index + 1,
    }));
    await sortQuestionsOfQuiz(sortedData);
};

onMounted(() => {
    showQuestionsOfQuiz(id_quiz || 0)
})
</script>
<style scoped>
.el-dialog {
    max-width: 500px;
}

.draggable-item {
    transition: all 0.3s ease-in-out;
}

.bg-indigo-100:hover {
    background-color: #e0e7ff;
}
</style>