<template>
    <div class="rounded-lg w-full overflow-hidden">
        <vue-plyr>
            <video controls>
                <source :src="src" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </vue-plyr>
    </div>
</template>
<!-- <video-player class="video-player vjs-custom-skin w-full h-[20rem]" :options="playerOptions"></video-player> -->

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import type { PlayerOptions } from '@/interfaces'
// Define props
defineProps({
    src: {
        type: String,
        required: true,
    },
});

// // Default video player options
// const playerOptions = ref<PlayerOptions>({
//     autoplay: false,
//     playbackRates: [0.5, 1, 1.5, 2],
//     controls: true,
//     controlBar: {
//         volumePanel: {
//             inline: false,
//         },
//         fullscreenToggle: true,
//     },
//     sources: [],
// });

// // Watch for changes in src and update player options
// watch(() => props.src, (newSrc) => {
//     playerOptions.value.sources = [
//         {
//             src: newSrc,
//             type: 'video/mp4',
//         },
//     ];
// }, { immediate: true });
</script>

<!-- <style scoped>
/* Use deep selector to apply styles to child components even in scoped styles */
::v-deep .vjs-control-bar {
    background-color: #1f2937 !important;
    /* Custom background color for control bar */
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

::v-deep .vjs-play-control,
::v-deep .vjs-volume-menu-button,
::v-deep .vjs-fullscreen-control {
    color: #ffffff !important;
    /* Change control button colors */
}

::v-deep .vjs-slider {
    background-color: #6b7280 !important;
    /* Custom color for volume and progress sliders */
}

::v-deep .vjs-volume-bar {
    background-color: #5d5fdf !important;
    /* Custom color for volume bar */
}

::v-deep .vjs-progress-holder {
    background-color: #f0f4fe !important;
    /* Custom color for progress bar */
}

::v-deep .vjs-play-progress {
    background-color: #5d5fdf !important;
    /* Custom color for the played portion of the video */
}

::v-deep .vjs-mouse-display {
    background-color: #5d5fdf !important;
    /* Custom color for mouse hover time display */
}
</style> -->