<template>
    <main class="px-10 bg-indigo-100 py-10">
        <div class="flex lg:flex-row flex-col gap-5">
            <div class="lg:w-4/6 w-full">
                <div v-if="currentContent && currentContent.title">
                    <h2 class="text-xl font-bold mb-3">{{ currentContent.title }}</h2>
                </div>
                <div class="border-2 bg-white p-5 rounded-2xl">
                    <!-- Hiển thị video -->
                    <div v-if="currentContent.type === 'video'" class="relative">
                        <div class="rounded-2xl w-full overflow-hidden">
                            <vue-plyr>
                                <video controls preload="metadata" @timeupdate="handleTimeUpdate" @pause="handlePause"
                                    @ended="handleVideoEnd" ref="videoElement">
                                    <source :src="currentContent.content_link" type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            </vue-plyr>
                        </div>
                    </div>
                    <!-- Hiển thị PDF -->
                    <div v-else-if="currentContent.type === 'file'" class="p-3 border rounded-lg">
                        <div class="pdf-viewer" ref="pdfViewer" @scroll="handleScroll"></div>
                    </div>
                    <!-- Hiển thị Quiz -->
                    <div v-else-if="currentContent.current_content_type === 'quiz'"
                        class="min-h-[70vh] bg-white flex items-center justify-center">
                        <div class="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
                            <h2 class="text-xl font-semibold mb-4 text-center">
                                Bài tập: {{ currentContent.title }}
                            </h2>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: progressQuizz + '%' }">
                                </div>
                            </div>
                            <p class="text-center mb-6">{{ currentQuestion.question }}</p>
                            <form class="space-y-4" @submit.prevent="checkAnswer">
                                <label v-for="(option, index) in currentQuestion.options" :key="index"
                                    class="flex items-center bg-blue-50 p-3 rounded-lg cursor-pointer">
                                    <input type="radio" name="question" class="form-radio h-4 w-4 text-blue-600"
                                        :value="option" v-model="selectedAnswer" />
                                    <span class="ml-2 text-gray-700">{{ option }}</span>
                                </label>
                                <button type="submit"
                                    class="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-center mt-4">
                                    Gửi câu trả lời
                                </button>
                            </form>
                            <p v-if="feedbackMessage" class="text-center mt-4 text-red-500">
                                {{ feedbackMessage }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sidebar -->
            <div class="lg:w-2/6 w-full">
                <div class="bg-white rounded-lg shadow-lg p-5">
                    <header class="p-2 flex items-center gap-3 overflow-hidden bg-gray-800 rounded-lg">
                        <img class="-ms-6 w-20"
                            src="https://ik.imagekit.io/laracasts/series/thumbnails/svg/livewire-basics.svg?tr=w-200"
                            alt="" />
                        <div class="flex flex-col gap-3">
                            <h3 class="text-xl font-medium text-white">Danh sách chương học</h3>
                            <el-progress :percentage="progress" status="success" />
                        </div>
                    </header>
                    <el-collapse class="border-0" accordion>
                        <el-collapse-item v-for="(content, index) in allContent" :key="content.id" :name="index">
                            <template #title>
                                <div class="px-4 !text-gray-900 flex gap-5 items-center justify-between leading-5">
                                    <h3 class="text-lg">{{ content.title }}</h3>
                                    <div class="flex gap-1" v-if="content.content_course_type === 'section'">
                                        <span class="text-gray-500">
                                            {{ content.content_done }}/{{ content.content_count }} Hoàn thành
                                        </span>
                                        •
                                        <span class="text-pink-500">{{ content.duration_display }}</span>
                                    </div>
                                </div>
                            </template>
                            <div v-for="lesson in content.section_content" :key="lesson.id"
                                class="cursor-pointer flex justify-between items-start bg-gray-50 py-2">
                                <div class="flex items-center gap-3 w-full px-4" @click="handleChangeContent(lesson)"
                                    :class="{ 'bg-gray-200 rounded-lg': currentContent.id === lesson.id }">
                                    <CheckOuline :class="lesson.percent >= 100 ? 'text-green-500' : 'text-gray-500'"
                                        class="h-5 w-5" />
                                    <div class="flex flex-col">
                                        <h3>{{ lesson.title }}</h3>
                                        <div>
                                            <div class="flex items-center gap-1" v-if="lesson.type === 'video'">
                                                <PlayCircleIcon class="h-4 w-4 text-gray-600" />
                                                <span class="text-pink-500">{{ lesson.duration_display }}</span>
                                            </div>
                                            <div class="flex items-center gap-1" v-else-if="lesson.type === 'file'">
                                                <DocumentIcon class="h-4 w-4 text-gray-600" />
                                                <span class="text-pink-500">{{ lesson.duration_display }}</span>
                                            </div>
                                            <div class="flex items-center gap-1"
                                                v-else-if="lesson.content_section_type === 'quiz'">
                                                <QuestionMarkCircleIcon class="h-4 w-4 text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
    ref,
    watch,
} from 'vue';
import {
    PlayCircleIcon,
    CheckCircleIcon as CheckOuline,
    QuestionMarkCircleIcon,
    DocumentIcon,
} from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';
import type { TLesson } from '@/interfaces';
import { useQuizStore } from '@/store/quiz';

// Import pdf.js
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Thiết lập worker cho pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const route = useRoute();
const idCourse = Number(route.params.id);
const courseStore = useCourseStore();
const quizStore = useQuizStore();
const { currentContent, allContent, progress } = storeToRefs(courseStore);
const { fetchStudyCourse, changeContent } = courseStore;

// Video element
const videoElement = ref<HTMLVideoElement | null>(null);

onMounted(async () => {
    await fetchStudyCourse(idCourse);
});

// Chuyển đổi nội dung
const handleChangeContent = async (lesson: any) => {
    const data = {
        course_id: idCourse,
        content_type: lesson.content_section_type,
        content_id: lesson.id,
        learned: lesson.learned,
        content_old_type: currentContent.value?.type || '',
        content_old_id: currentContent.value?.id || 0,
    };
    await changeContent(data);
};

// Cập nhật thời gian đã học
const updateLearned = async ({ id, learned }: { id: number; learned: number }) => {
    if (!currentContent.value) return;
    const data = {
        course_id: idCourse,
        content_type: currentContent.value.current_content_type,
        content_id: id,
        learned,
        content_old_type: currentContent.value?.current_content_type,
    };
    await changeContent(data);
};

// Xử lý sự kiện video
const handleTimeUpdate = () => {
    // Cập nhật thời gian xem
};

const handlePause = async () => {
    if (videoElement.value && currentContent.value) {
        if (videoElement.value.currentTime > currentContent.value.learned) {
            updateLearned({ id: currentContent.value.id, learned: videoElement.value.currentTime });
        }
    }
};

const handleVideoEnd = () => {
    if (videoElement.value && currentContent.value) {
        updateLearned({ id: currentContent.value.id, learned: videoElement.value.currentTime });
    }
    handleNextLesson();
};

// Chuyển đến bài học tiếp theo
const handleNextLesson = async () => {
    const currentSection = allContent.value.find((section: any) =>
        section.section_content.some((lesson: any) => lesson.id === currentContent.value.id)
    );
    const sectionLessons = currentSection.section_content;
    const currentIndex = sectionLessons.findIndex(
        (lesson: TLesson) => lesson.id === currentContent.value?.id
    );
    const nextLesson = sectionLessons[currentIndex + 1];
    if (nextLesson) {
        await handleChangeContent(nextLesson);
    }
};

// Quiz
const selectedAnswer = ref('');
const feedbackMessage = ref('');
const currentQuestionIndex = ref(0);
const progressQuizz = ref(0);

// Câu hỏi hiện tại
const currentQuestion = computed(() => currentContent.value?.questions[currentQuestionIndex.value] || {});

// Cập nhật tiến trình quiz
const updateProgress = () => {
    progressQuizz.value =
        ((currentQuestionIndex.value + 1) / currentContent.value.questions.length) * 100;
};

// Kiểm tra câu trả lời
const checkAnswer = async () => {
    if (selectedAnswer.value === currentQuestion.value.answer) {
        const payload = {
            course_id: idCourse,
            content_type: 'quiz',
            content_id: currentContent.value.id,
            content_old_type: currentContent.value.current_content_type,
            content_old_id: currentContent.value.id,
            questions_done: currentQuestionIndex.value + 1,
            question_id: currentQuestion.value.id,
            answer_user: selectedAnswer.value,
            total_questions: currentContent.value.questions.length,
        };
        await quizStore.handleAnswer(payload);
        feedbackMessage.value = '';
        nextQuestion();
    } else {
        feedbackMessage.value = 'Câu trả lời không chính xác. Hãy thử lại!';
    }
};

// Chuyển sang câu hỏi tiếp theo
const nextQuestion = () => {
    if (currentQuestionIndex.value < currentContent.value.questions.length - 1) {
        currentQuestionIndex.value++;
        updateProgress();
        selectedAnswer.value = '';
        feedbackMessage.value = '';
    } else {
        handleQuizCompletion();
    }
};

// Hoàn thành quiz
const handleQuizCompletion = () => {
    progressQuizz.value = 100;
    feedbackMessage.value = 'Bạn đã hoàn thành bài tập!';
    // Xử lý khi hoàn thành quiz
};

// PDF.js
const pdfInstance = ref<any>(null);
const totalPages = ref<number>(0);
const pdfViewer = ref<HTMLDivElement | null>(null);

// Theo dõi sự thay đổi của content_link
watch(
    () => currentContent.value.content_link,
    async (newLink) => {
        if (newLink && currentContent.value.type === 'file') {
            await loadPdf(newLink);
        }
    }
);

// Hàm tải PDF
const loadPdf = async (url: string) => {
    const loadingTask = pdfjsLib.getDocument(url);
    pdfInstance.value = await loadingTask.promise;
    totalPages.value = pdfInstance.value.numPages;

    // Xóa các canvas cũ
    if (pdfViewer.value) {
        pdfViewer.value.innerHTML = '';
    }

    for (let pageNumber = 1; pageNumber <= totalPages.value; pageNumber++) {
        await renderPage(pageNumber);
    }
};

// Hàm render từng trang
const renderPage = async (pageNumber: number) => {
    const page = await pdfInstance.value.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (pdfViewer.value) {
        pdfViewer.value.appendChild(canvas);
    }

    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };
    await page.render(renderContext).promise;
};

// Xử lý cuộn trang PDF
const viewedPages = ref<number[]>([]);

const handleScroll = () => {
    if (!pdfViewer.value) return;

    const viewerTop = pdfViewer.value.scrollTop;
    const viewerHeight = pdfViewer.value.clientHeight;

    const canvases = pdfViewer.value.getElementsByTagName('canvas');

    for (let i = 0; i < canvases.length; i++) {
        const canvas = canvases[i];
        const pageNumber = i + 1;
        const canvasTop = canvas.offsetTop;
        const canvasBottom = canvasTop + canvas.offsetHeight;

        if (canvasTop < viewerTop + viewerHeight && canvasBottom > viewerTop) {
            if (!viewedPages.value.includes(pageNumber)) {
                viewedPages.value.push(pageNumber);
                console.log(`Trang ${pageNumber} đang được xem.`);
                // Cập nhật trạng thái đã xem trang
            }
        }
    }
};

// Tải PDF khi component được mounted
onMounted(async () => {
    if (currentContent.value.content_link && currentContent.value.type === 'file') {
        await loadPdf(currentContent.value.content_link);
    }
});
</script>

<style scoped>
.pdf-viewer {
    height: 500px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #f9f9f9;
}

.pdf-page {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}
</style>
