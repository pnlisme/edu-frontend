<template>
    <div class="mx-20 my-5">
        <!-- Tìm kiếm và bộ lọc -->
        <!-- <div class="mb-5">
            <div class="flex gap-3">
                <div class="flex-1">
                    <el-input placeholder="Tìm kiếm câu hỏi" v-model="searchQuery" />
                </div>
                <div class="flex-1">
                    <el-select v-model="filter" placeholder="Bộ lọc" class="w-full">
                        <el-option label="Tất cả bài giảng" value="all" />
                        <el-option label="Bài giảng hiện tại" value="current" />
                    </el-select>
                </div>
                <div class="flex-1">
                    <el-select v-model="sortOrder" placeholder="Sắp xếp theo" class="w-full">
                        <el-option label="Theo đề xuất" value="recommended" />
                        <el-option label="Mới nhất" value="newest" />
                        <el-option label="Bình chọn nhiều nhất" value="most_liked" />
                    </el-select>
                </div>
            </div>
        </div> -->
        <!-- Content -->
        <div class="mt-5">
            <h3 class="text-xl font-medium py-5">Thảo luận khóa học này </h3>
            <div class="flex flex-col gap-5">

                <!-- IS ME -->
                <div class="mb-10 bg-white shadow-md rounded-lg p-5">
                    <div class="flex gap-3 items-center">
                        <img class="rounded-full w-14 h-14 object-cover"
                            src="https://laracasts.nyc3.digitaloceanspaces.com/members/avatars/default/164.png"
                            alt="User Avatar" />
                        <el-input type="textarea" placeholder="Viết câu hỏi của bạn" v-model="newQuestion" rows="2"
                            class="flex-1" />
                        <el-button type="primary" @click="handleCreateQuestion">Gửi</el-button>
                    </div>
                </div>
                <!-- LIST YOU -->
                <!-- <div class="bg-indigo-950 rounded-lg p-3">
                    <div class=" flex gap-5">

                        <img class="object-cover rounded-lg w-20 h-20"
                            src="https://laracasts.nyc3.digitaloceanspaces.com/members/avatars/default/164.png" alt="">
                        <div class="flex flex-col ">
                            <div class="">
                                <h3 class="text-white leading-4 font-medium">
                                    DNABeast
                                </h3>
                                <span class="text-white text-sm">Đăng 3 ngày trước</span>
                            </div>
                            <p class="text-gray-100 mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Quasi cum
                                officiis perspiciatis
                                vitae sit magnam exercitationem minima eum necessitatibus repellat, laborum laboriosam
                                ut velit similique doloribus fugit voluptatum eaque. Amet?</p>
                            <div class="flex gap-3 mt-5">
                                <Button
                                    class="flex hover:bg-white hover:shadow-sm animation items-center gap-3 border-2 bg-slate-200 rounded-lg border-white px-2 py-1">
                                    <HeartIcon class="h-5 w-5 text-indigo-600" />
                                    <span class="text-indigo-600">4</span>
                                </Button>
                                <Button
                                    class="text-indigo-600 hover:shadow-sm hover:bg-white animation flex items-center gap-3 border-2 bg-slate-200 rounded-lg border-white px-2 py-1">
                                    Trả lời 4
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <Button variant="primary"> Xem thêm</Button>
                </div> -->


                <!-- Danh sách câu hỏi -->
                <div v-for="qa in listAllQA" :key="qa.id" class="bg-white shadow-md rounded-lg p-5 mb-5">
                    <div class="flex gap-3">
                        <img class="rounded-full w-14 h-14 object-cover"
                            src="https://laracasts.nyc3.digitaloceanspaces.com/members/avatars/default/164.png"
                            alt="User Avatar" />
                        <div class="flex-1">
                            <div>
                                <h3 class="font-medium">{{ qa.full_name }}</h3>
                                <span class="text-sm text-gray-500">Đăng {{ qa.created_at }}</span>
                            </div>
                            <p class="mt-2">{{ qa.content }}</p>
                            <div class="flex gap-3 mt-3">
                                <el-button plain size="small" @click="handleLikeQuestion(qa)"
                                    :type="qa.is_liked ? 'danger' : 'info'">
                                    <span>{{ qa.total_likes }}</span> Thích
                                </el-button>
                                <el-button plain size="small" @click="toggleReplies(qa.id)">
                                    <span>{{ qa.total_replies }}</span> Trả lời
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <!-- Phần trả lời -->
                    <div v-if="qa.id === activeQuestionId" class="mt-5 ml-10 border-l-2 pl-5">
                        <!-- Danh sách câu trả lời -->
                        <div v-for="reply in listQuestion || []" :key="reply.id" class="bg-gray-50 p-3 rounded-lg mb-3">
                            <h4 class="font-medium">{{ reply.full_name }}</h4>
                            <span class="text-sm text-gray-500">{{ reply.created_at }}</span>
                            <p class="mt-2">{{ reply.content }}</p>
                        </div>

                        <!-- Form thêm trả lời -->
                        <div class="mt-5">
                            <el-input type="textarea" placeholder="Viết trả lời của bạn" v-model="newReply" rows="2"
                                class="w-full" />
                            <el-button type="primary" class="mt-2" @click="handleReply(qa.id)">Gửi trả lời</el-button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useQuestionAnswer } from '@/store/question-answers';
import { HeartIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
interface TListQA {
    id: number
    type: 'answer' | 'question'
    course_id: number
    lecture_id: number
    user_id: number
    full_name: string
    content: string
    created_at: string
    total_likes: number
    total_replies: number
    is_liked: false
    replies?: TListQA[];
}
const props = defineProps<{
    id_course: number,
    data: TListQA[]
    lecture_id: number
}>();
const questionStore = useQuestionAnswer()
const activeQuestionId = ref<any>(null);
const newQuestion = ref("");
const newReply = ref("");
const listAllQAA = ref<TListQA[]>([]);
onMounted(() => {
});
const handleCreateQuestion = async () => {
    const data = {
        course_id: props.id_course,
        lecture_id: props.lecture_id,
        content: newQuestion.value,
        type: "question",
    }
    CreateQuestion(data);
};
const handleReply = async (questionId: number) => {
    const data = {
        course_id: props.id_course,
        lecture_id: props.lecture_id,
        content: newReply.value,
        parent_id: questionId,
        type: 'answer',
    };
    await CreateQuestion(data); // Gửi câu trả lời mới

    // Tải lại danh sách câu trả lời sau khi gửi
    await toggleReplies(questionId);

    // Xóa nội dung sau khi gửi
    newReply.value = '';
};

const toggleReplies = async (questionId: number) => {
    if (activeQuestionId.value === questionId) {
        activeQuestionId.value = null; // Đóng phần trả lời
    } else {
        activeQuestionId.value = questionId;

        // Gọi API để lấy danh sách trả lời cho câu hỏi này
        await fetchListQuestion(questionId);


    }
};
const handleLikeQuestion = async (qa: any) => {
    if (qa.is_liked) {
        await questionStore.DisLikeQuestion(props.id_course, qa.id);
    } else {
        await questionStore.LikeQuestion(props.id_course, qa.id);
    }
};
const {
    listAllQA, listQuestion
} = storeToRefs(questionStore)
const { fetchListAllQA,
    fetchListQuestion,
    CreateQuestion,
    LikeQuestion,
    DisLikeQuestion } = questionStore
onMounted(async () => {
    // await fetchListQuestion(props.id_course)
    await fetchListAllQA(props.id_course)
    listAllQAA.value = [...listAllQA.value];
})
</script>

<style scoped></style>