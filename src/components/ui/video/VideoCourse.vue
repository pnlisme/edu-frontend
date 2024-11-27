<template>
    <div class="rounded-2xl w-full overflow-hidden">
        <vue-plyr>
            <video controls preload="metadata" @timeupdate="handleTimeUpdate" @ended="handleVideoEnd"
                ref="videoElement">
                <source :src="src" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
            </video>
        </vue-plyr>
    </div>
</template>
<!-- <video-player class="video-player vjs-custom-skin w-full h-[20rem]" :options="playerOptions"></video-player> -->

<script setup lang="ts">
import { ref, defineProps, onUpdated } from 'vue';
import type { PlayerOptions, TVideo } from '@/interfaces/ui.interface'

// Define prop
defineProps<TVideo>()
// defineProps({
//     src: {
//         type: String,
//         required: true,
//     },
//     lesson: {
//         type: Object,
//         required: true,
//     },
//     onUpdateLearned: {
//         type: Function,
//         required: true,
//     },
// });
const videoElement = ref<HTMLVideoElement | null>(null);

// Function to handle video progress updates
// const handleTimeUpdate = () => {
//     const dd = videoElement.value.currentTime
//     console.log(dd)
//     // if (videoElement.value && lesson) {
//     //     const percentWatched =
//     //         (videoElement.value.currentTime / videoElement.value.duration) * 100;

//     //     // Gọi hàm onUpdateLearned để truyền thông tin lên cha
//     //     onUpdateLearned({
//     //         id: lesson.id,
//     //         learned: Math.min(Math.round(percentWatched), 100),
//     //     });
//     // }
// };
const handleTimeUpdate = () => {
    if (videoElement.value && videoElement.value.paused) {
        const percentWatched =
            (videoElement.value.currentTime / videoElement.value.duration) * 100;
        console.log(percentWatched)
        // Gọi hàm onUpdateLearned khi video tạm dừng
        onUpdateLearned({
            id: lesson.id,
            learned: Math.min(Math.round(percentWatched), 100),
        });
    }
};
// Function to handle when video ends
const handleVideoEnd = () => {
    if (videoElement.value && lesson) {
        // Đánh dấu hoàn thành khi video kết thúc
        onUpdateLearned({ id: lesson.id, learned: 100 });

        // Tự động chuyển bài học tiếp theo
        handleNextLesson();
    }
};

// Function to handle moving to the next lesson
const handleNextLesson = () => {
    const event = new CustomEvent('next-lesson');
    window.dispatchEvent(event);
};

</script>
