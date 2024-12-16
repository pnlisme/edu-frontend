<template>


    <!-- Chat Content -->
    <div id="chat-content" class="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        <div v-for="(msg, index) in chatHistory" :key="index" class="flex items-start"
            :class="{ 'justify-end': msg.sender === 'user' }">
            <!-- Bot Message -->
            <!-- <template v-if="msg.sender === 'bot'">
                <img src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png" alt="Bot"
                    class="w-8 h-8 rounded-full mr-2" />
                <div class="bg-inring-indigo-200 text-inring-indigo-900 p-3 rounded-xl shadow-md max-w-xs">
                    <p>{{ msg.text }}</p>
                </div>
            </template> -->

            <template v-if="msg.sender === 'bot'">
                <img src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png" alt="Bot"
                    class="w-8 h-8 rounded-full mr-2" />
                <div class="bg-indigo-200 text-indigo-900 p-3 rounded-xl shadow-md max-w-xs">
                    <template v-if="msg.text.includes('http://')">
                        <!-- <ul>
                            <li v-for="(link, index) in msg.text.split('\\n').slice(1)" :key="index">
                                <a :href="link.split(': ')[1]" target="_blank" class="text-blue-500 underline">
                                    {{ link.split(': ')[0] }}
                                </a>
                            </li>
                        </ul> -->
                        <p>{{ msg.text }}</p>
                    </template>
                    <template v-else>
                        <p>{{ msg.text }}</p>
                    </template>
                </div>
            </template>

            <!-- User Message -->
            <template v-else>
                <div class="bg-blue-200 text-blue-900 p-3 rounded-xl shadow-md max-w-xs">
                    <p>{{ msg.text }}</p>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png" alt="User"
                    class="w-8 h-8 rounded-full ml-2" />
            </template>
        </div>
    </div>

    <!-- Footer/Input -->
    <div class="p-4 bg-white border-t flex items-center rounded-xl">
        <input v-model="message" type="text" placeholder="Nhập tin nhắn của bạn vào đây..."
            class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button @click="sendMessage"
            class="bg-indigo-600 text-white p-3 rounded-full ml-3 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M22 2L11 13M2 22l11-9m0 0l9-9" />
            </svg>
        </button>
    </div>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const message = ref('');
const chatHistory = ref<Message[]>([
    { sender: 'bot', text: 'Xin chào! Hôm nay tôi có thể giúp gì cho bạn?' },
]);

const formatBotResponse = (response: string): string | { links: string[] } => {
    // Kiểm tra nếu có chuỗi "Các khóa học phù hợp:"
    if (response.includes('Các khóa học phù hợp:')) {
        const lines = response.split('\n').slice(1); // Bỏ dòng tiêu đề
        const links = lines.map((line) => line.split(': '));
        return JSON.stringify(links); // Chuyển thành JSON để xử lý trong template
    }
    return response;
};
const sendMessage = async () => {
    if (!message.value.trim()) return;

    // Thêm tin nhắn của người dùng
    chatHistory.value.push({ sender: 'user', text: message.value });
    scrollToBottom();
    // Gửi API
    try {
        const res = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message.value }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        chatHistory.value.push({
            sender: 'bot',
            text: data.message || 'Bot không phản hồi!',
            // text: data.response || 'Bot không phản hồi!',
        });
    } catch (error: any) {
        chatHistory.value.push({
            sender: 'bot',
            text: `Lỗi khi gọi API: ${error.message}`,
        });
    }

    // Xóa input
    message.value = '';
};
const scrollToBottom = () => {
    const chatContent = document.getElementById('chat-content');
    if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
    }
};
watch(chatHistory, scrollToBottom);
</script>
<style scoped>
#chat-content {
    max-height: 400px;
    /* Hoặc điều chỉnh chiều cao tối đa */
}
</style>