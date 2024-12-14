<template>
  <main class="px-10 bg-indigo-100 py-10">
    <h2 class="text-xl font-bold mb-3">{{ currentContent.title }}</h2>
    <div class="flex lg:flex-row  flex-col  gap-5">
      <div class="lg:w-4/6 w-full">
        <div v-if="currentContent && currentContent.title">
        </div>
        <div class=" border-2 bg-white  p-5 rounded-2xl">
          <!-- <VideoCourse :src="videoUrl" /> -->
          <div v-if="currentContent.type === 'video'" class="relative">
            <div class="rounded-2xl w-full overflow-hidden h-[700px] ">
              <vue-plyr>
                <video controls preload="metadata" @pause="handlePause" @ended="handleVideoEnd"
                  @timeupdate="handleTimeUpdate" ref="videoElement">
                  <source class="!h-full" :src="currentContent.content_link" type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              </vue-plyr>
            </div>
          </div>
          <!-- file -->
          <div v-else-if="currentContent.type === 'file'" class="p-3 border rounded-lg">
            <vue-pdf ref="pdfViewerRef" :url="currentContent.content_link" />
          </div>
          <!-- Quizz -->
          <div v-else-if="currentContent.current_content_type === 'quiz'"
            class="min-h-[70vh] bg-white flex items-center justify-center">
            <div v-if="isReviewMode">
              <div class="">
                <h2 class="text-xl font-semibold mb-4 text-center">Ôn tập: {{ currentContent.title }}
                </h2>
                <div v-for="(question, index) in currentContent.questions" :key="question.id" class="mb-4">
                  <p class="font-medium">Câu {{ index + 1 }}: {{ question.question }}</p>
                  <ul class="mt-2">
                    <li v-for="option in question.options" :key="option" class="px-4 py-2 rounded" :class="{
                      'bg-green-200': option === question.answer, // Đáp án đúng
                      'bg-red-200': option === question.answer_user && option !== question.answer // Đáp án sai người dùng chọn
                    }">
                      {{ option }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex">
                <Button variant="primary" @click="handleExitReviewLesson()">Thoát ôn tập</Button>
              </div>
            </div>
            <div v-if="currentContent.percent < 100" class="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
              <h2 class="text-xl font-semibold mb-4 text-center">Bài tập: {{ currentContent.title }}</h2>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: progressQuizz + '%' }">
                </div>
              </div>
              <p class="text-center mb-6">{{ currentQuestion.question }}</p>
              <form class="space-y-4" @submit.prevent="checkAnswer">
                <label v-for="(option, index) in currentQuestion.options" :key="index"
                  class="flex items-center bg-blue-50 p-3 rounded-lg cursor-pointer">
                  <input type="radio" name="question" class="form-radio h-4 w-4 text-blue-600" :value="option"
                    v-model="selectedAnswer" />
                  <span class="ml-2 text-gray-700">{{ option }}</span>
                </label>

                <button type="submit"
                  class="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-center mt-4">
                  Gửi câu trả lời
                </button>
              </form>
              <p v-if="feedbackMessage" class="text-center mt-4 text-red-500">{{ feedbackMessage }}</p>
            </div>
            <!-- On tap -->
            <!-- Nếu quiz đã hoàn thành -->
            <div v-else-if="currentContent.percent >= 100 && !isReviewMode" class="flex flex-col items-center">
              <canvas id="celebrationCanvas" class="w-full h-[300px]"></canvas>
              <p class="text-xl font-bold text-center text-indigo-600 mt-5">Chúc mừng bạn đã hoàn
                thành
                bài
                tập!</p>
              <div class="mt-10 flex gap-5">
                <Button variant="primary" @click="handleReviewLesson()">Ôn tập</Button>
                <Button variant="primary" @click="handleRedoLesson()">Làm lại</Button>
                <Button variant="primary" @click="handleNextLesson()">Bài tiếp
                  theo</Button>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg my-5 p-2">
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="Tìm kiếm" name="first">
              <UserSearch :course_id="idCourse || 0" />
            </el-tab-pane>
            <el-tab-pane label="Hỏi đáp" name="second">
              <UserQuestion :lecture_id="currentContent.id" :id_course="idCourse" :data="listAllQA" />
            </el-tab-pane>
            <el-tab-pane label="Ghi chú" name="third">
              <UserNote :course_id="idCourse || 0" :section_id="currentContent.section_id || 0"
                :lecture_id="currentContent.id || 0" :lecture_title="currentContent.title || ''"
                :currentTime="videoCurrentTime || 0" />
              <!-- :section_id="currentContent" :lecture_id="" :lecture_title=""  -->
            </el-tab-pane>
            <el-tab-pane label="Đánh giá" name="fourth">
              <UserFeedback :idCourse="idCourse" :listReview="state.listReview" />
            </el-tab-pane>
            <el-tab-pane label="Hỗ trợ giảng viên" name="five">
              <div class="">
                <Button @click="startChat">Bắt đầu trò chuyện</Button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="lg:w-2/6 w-full">
        <div class="bg-white rounded-lg shadow-lg p-5">
          <header class="p-2 flex items-center gap-3 overflow-hidden bg-gray-800 rounded-lg">
            <img class="-ms-6 w-20"
              src="https://ik.imagekit.io/laracasts/series/thumbnails/svg/livewire-basics.svg?tr=w-200" alt="">
            <div class="flex flex-col gap-3">
              <h3 class="text-xl font-medium text-white">Danh sách chương học</h3>
              <el-progress :percentage="progress" status="success" />
              <button @click="openChungChi" class="text-white bg-indigo-600 rounded-sm w-28 text-[12px] py-[2px] "
                v-if="progress >= 100">Nhận
                chứng
                chỉ</button>
            </div>

          </header>
          <el-collapse class="border-0" accordion>
            <el-collapse-item v-for="(content, index) in allContent" :key="content.id" :name="index">
              <template #title>
                <div class="px-4 !text-gray-900 flex gap-5 items-center justify-between leading-5">
                  <h3 class="text-lg">{{ content.title }}</h3>
                  <div class="flex gap-1" v-if="content.content_course_type === 'section'">
                    <span class="text-gray-500">{{ content.total_done }}/{{
                      content.total_count
                    }}
                      Hoàn thành</span> •
                    <span class="text-pink-500">{{ content.duration_display }}</span>
                  </div>
                  <!-- <div @click="handleChangeContent(content)" -->
                  <div @click="handleChangeContent(content)" v-if="content.content_course_type === 'quiz'"
                    class=" text-blue-500">
                    Quiz
                  </div>
                </div>
              </template>
              <div v-for="lesson in content.section_content" :key="lesson.id"
                class="cursor-pointer flex justify-between items-start bg-gray-50  py-2">
                <div class="flex items-center gap-3 w-full px-4" @click="handleChangeContent(lesson)"
                  :class="{ 'bg-gray-200 rounded-lg': currentContent.id === lesson.id }">
                  <CheckOuline :class="lesson.percent >= 100 ? 'text-green-500' : 'text-gray-500'" class="h-5 w-5" />
                  <div class=" flex flex-col">
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
                      <!-- Nếu không, hiển thị biểu tượng câu hỏi -->
                      <div class="flex items-center gap-1" v-else-if="lesson.content_section_type === 'quiz'">
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
  <el-dialog v-model="isChungChiVisible" title="Chứng chỉ khóa học">


    <div id="certificate">

      <Certificate :courseName="studyCourse.course_title" :issueDate="issueDate"
        :instructorName="studyCourse.creator" />
    </div>
    <div class="flex justify-end mt-5">
      <Button variant="primary" @click="printCertificate">Print</Button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import UserFeedback from '@/components/user/mycourse/UserFeedback.vue';
import UserNote from '@/components/user/mycourse/UserNote.vue';
import UserQuestion from '@/components/user/mycourse/UserQuestion.vue';
import UserSearch from '@/components/user/mycourse/UserSearch.vue';
import type { TLesson } from '@/interfaces';
import { useCourseStore } from '@/store/course';
import { useQuizStore } from '@/store/quiz';
import { useReviewsStore } from '@/store/review';
import { CheckCircleIcon as CheckOuline, DocumentIcon, PlayCircleIcon, QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import confetti from "canvas-confetti";
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import VuePdf from "vue-pdf-next";
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const idCourse = Number(route.params.id);
const courseStore = useCourseStore();
const quizStore = useQuizStore();
const { studyCourse, currentContent, allContent, progress } = storeToRefs(courseStore);
const { fetchStudyCourse, changeContent } = courseStore;
const reviewStore = useReviewsStore()

// question anwer
const questionStore = useQuestionAnswer()
const { fetchListAllQA } = questionStore
const { listAllQA } = storeToRefs(questionStore)


const { fetchReviews } = reviewStore
const { state } = storeToRefs(reviewStore)
const activeName = ref("first")
const videoElement = ref<HTMLVideoElement | null>(null);
// PDF
const issueDate = ref(new Date());
const pdfViewerRef = ref(null);
const learned = ref(0); // Biến lưu số giây đã học
const isLearning = ref(false); // Trạng thái đang học
const duration = computed(() => currentContent.value?.duration || 0); // Thời lượng học
let timer: any = null; // Biến để lưu setInterval
const videoCurrentTime = ref(0);
const startLearning = () => {
  if (!isLearning.value && currentContent.value.type === "file") {
    isLearning.value = true;
    timer = setInterval(() => {
      learned.value++;
      // Nếu thời gian học đạt đến thời lượng yêu cầu, cập nhật backend
      if (learned.value >= duration.value) {
        updateLearned({ id: currentContent.value.id, learned: duration.value });
        clearInterval(timer); // Dừng timer
        // handleNextLesson();
      }
    }, 2000); // Mỗi giây tăng 1
  }
};
// Khi rời khỏi tài liệu hoặc chuyển bài học, dừng tính thời gian
const stopLearning = () => {
  isLearning.value = false;
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};
const handleTimeUpdate = () => {
  if (videoElement.value) {
    videoCurrentTime.value = Math.floor(videoElement.value.currentTime); // Cập nhật thời gian hiện tại
  }
};


// Theo dõi khi nội dung thay đổi
watch(currentContent, (newContent, oldContent) => {
  if (newContent?.type === "file" && duration.value > (currentContent.value?.learned || 0)) {
    startLearning();
  } else {
    stopLearning();
  }
});

// Xóa timer khi component bị hủy
onUnmounted(() => {
  stopLearning();
});
// end
onMounted(async () => {
  await fetchStudyCourse(idCourse);
  await fetchReviews(idCourse)
  await fetchListAllQA(idCourse)
});

const handleChangeContent = async (lesson: any) => {
  const data = {
    course_id: idCourse,
    content_type: lesson.content_section_type,
    content_id: lesson.id,
    learned: lesson.learned,
    content_old_type: currentContent.value?.type || '',
    content_old_id: currentContent.value?.id || 0
  }
  await changeContent(data);
  videoCurrentTime.value = 0
  timer = null;

};
const updateLearned = async ({ id, learned }: { id: number; learned: number }) => {
  if (!currentContent.value) return;
  const data = {
    course_id: idCourse,
    content_type: currentContent.value.current_content_type,
    content_id: id,
    learned,
    content_old_type: currentContent.value?.current_content_type,
  }
  await changeContent(data);


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

const handleNextLesson = async () => {
  const currentSection = allContent.value.find(section =>
    section.section_content.some((lesson: any) => lesson.id === currentContent.value.id)
  );
  videoCurrentTime.value = 0
  const sectionLessons = currentSection.section_content;
  const currentIndex = sectionLessons.findIndex((lesson: TLesson) => lesson.id === currentContent.value?.id);
  const nextLesson = sectionLessons[currentIndex + 1];
  await handleChangeContent(nextLesson);

};
// Quizz

const selectedAnswer = ref('');
const feedbackMessage = ref('');
const currentQuestionIndex = ref(0);
const progressQuizz = ref(0);
// Lấy câu hỏi hiện tại
const currentQuestion = computed(() => currentContent.value?.questions[currentQuestionIndex.value] || {});

const updateProgress = () => {
  progressQuizz.value = ((currentQuestionIndex.value) / currentContent.value.questions.length) * 100;
};
// Hàm kiểm tra câu trả lời
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
      total_questions: currentContent.value.questions.length
    };
    await quizStore.handleAnswer(payload);
    feedbackMessage.value = ''; // Xóa thông báo lỗi
    nextQuestion(); // Chuyển sang câu hỏi tiếp theo hoặc hoàn thành quiz

  } else {
    feedbackMessage.value = 'Câu trả lời không chính xác. Hãy thử lại!';
  }
};
const handleRedoLesson = async () => {
  if (!currentContent.value) return;
  try {
    const data = {
      course_id: idCourse,
      content_type: "quiz",
      content_id: currentContent.value.id,
      content_old_type: "quiz",
      content_old_id: currentContent.value.id,
      redo_quiz: 1, // Reset quiz
    };
    await quizStore.handleRedo(data);
    currentContent.value = currentContent;
    currentQuestionIndex.value = 0; // Reset câu hỏi về câu đầu tiên
    selectedAnswer.value = ''; // Xóa đáp án đã chọn
    progressQuizz.value = 0; // Reset tiến độ
    feedbackMessage.value = ''; // Xóa thông báo feedback
  } catch (error) {
    console.error("Error during redo quiz:", error);
    feedbackMessage.value = "Không thể làm lại bài tập.";
  }
};

// Hàm xử lý chuyển câu hỏi tiếp theo
const nextQuestion = () => {
  if (currentQuestionIndex.value < currentContent.value.questions.length - 1) {
    currentQuestionIndex.value++; // Tăng chỉ số câu hỏi
    updateProgress(); // Cập nhật tiến trình
    selectedAnswer.value = ''; // Reset câu trả lời
    feedbackMessage.value = ''; // Xóa thông báo cũ

  } else {
    handleQuizCompletion(); // Hoàn thành quiz
    handleNextLesson();
  }
};
// // Xử lý khi hoàn thành quiz
const handleQuizCompletion = () => {
  progressQuizz.value = 100; // Đảm bảo tiến trình đạt 100% khi hoàn thành
  feedbackMessage.value = 'Bạn đã hoàn thành bài tập!'; // Hiển thị thông báo
};

const startConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.7 },
  });
};

// Theo dõi trạng thái progressQuizz để kích hoạt hiệu ứng
watch(progressQuizz, (newValue) => {
  if (newValue === 100) {
    startConfetti();
  }
});
const isReviewMode = ref(false);
const handleReviewLesson = () => {
  isReviewMode.value = true;
};
const handleExitReviewLesson = () => {
  isReviewMode.value = false;
};
// chung chi
const isChungChiVisible = ref(false);
const openChungChi = () => {
  isChungChiVisible.value = true;
};


import { ElNotification } from 'element-plus';
import printJS from "print-js";
import Certificate from '@/components/user/Certificate.vue';
import { useMessageStore } from '@/store/message';
import { useQuestionAnswer } from '@/store/question-answers';
const printCertificate = () => {
  try {
    printJS({
      printable: "certificate", // ID của phần tử cần in
      type: "html",
      style: `
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 0;
          padding: 20px;
        }
        h2 {
          font-size: 24px;
          font-weight: bold;
        }
        p {
          font-size: 14px;
          margin: 10px 0;
        }
      `,
    });
  } catch (error) {
    ElNotification({
      title: "Lỗi",
      message: "Không thể in chứng chỉ.",
      type: "error",
    });
  }
};
const router = useRouter();
const messageStore = useMessageStore();
const startChat = () => {
  messageStore.setWaitingUserChat(studyCourse.value.created_by); // Lưu ID giảng viên vào store
  router.push('/mymessage'); // Điều hướng sang trang chat
}


</script>
<style scoped>
.pdf-viewer {
  height: 500px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f9f9f9;
}

.pdf-page {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

#celebrationCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}
</style>