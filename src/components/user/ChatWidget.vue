<template>
    <div class="fixed bottom-10 right-8 z-50">
        <!-- Nút tròn hình robot -->
        <div class="  w-16 h-16 rounded-full bg-indigo-200 transition-all shadow-lg flex items-center justify-center cursor-pointer hover:bg-indigo-600"
            @click="toggleChat">
            <img src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png" alt="Robot" class="w-10 h-10" />
        </div>

        <!-- Khung chat -->
        <transition name="fade">
            <div v-if="isChatOpen"
                class="fixed bottom-20 right-12 bg-white shadow-lg rounded-lg w-96 h-[480px] flex flex-col">
                <!-- Header -->

                <div class=" bg-purple-600 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <div class="flex items-center gap-3">

                        <h2 class="text-lg font-bold">Trợ lý Edunity</h2>
                        <span class="text-green-300 text-sm">Online</span>
                    </div>
                    <button @click="toggleChat" class="text-white text-xl">✕</button>
                </div>

                <!-- Body -->
                <Chatbox />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Chatbox from './Chatbox.vue';

const isChatOpen = ref(false);

const toggleChat = () => {
    isChatOpen.value = !isChatOpen.value;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>