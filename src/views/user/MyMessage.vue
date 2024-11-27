<!-- src/views/user/mymessage.vue -->

<template>
    <div class="min-h-[70%] flex flex-col gap-2 md:flex-row items-start md:items-center justify-center">
        <!-- User List -->
        <div class="w-full md:w-[30%] border-2 border-indigo-200 rounded-lg p-4 mb-4 md:mb-0">
            <div class="flex flex-col gap-5">
                <!-- Search -->
                <div>
                    <div class="w-full border border-indigo-600 rounded-full py-1 px-2">
                        <input type="text" v-model="searchQuery" class="focus-visible:outline-none w-full"
                            placeholder="Tìm kiếm " />
                    </div>
                </div>
                <!-- Item List -->
                <div class="flex flex-col gap-2 h-[60vh] md:h-[70vh] overflow-y-auto scrollable-container">
                    <div v-for="user in filteredUsers" :key="user.id" @click="selectUser(user)"
                        class="flex cursor-pointer gap-2 p-2 rounded-md bg-indigo-50 hover:bg-indigo-100">
                        <img class="w-12 h-12 rounded-md object-cover" :src="user.avatar || defaultAvatar" alt="" />
                        <div class="gap-2 w-full">
                            <div class="flex justify-between items-center">
                                <h3 class="text-sm font-medium">{{ user.first_name }} {{ user.last_name }}</h3>
                                <span class="text-[10px] text-gray-600">{{ user.latest_message_time }}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <p class="text-sm truncate w-24 text-gray-600">
                                    {{ (selectedUser?.id == user?.id && latest_message ? latest_message :
                                        user.latest_message) || 'No messages yet' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chat Window -->
        <div class="w-full md:w-[70%] bg-white rounded-lg p-4">
            <header v-if="selectedUser" class="flex gap-3 items-center mb-4 ">
                <img :src="selectedUser.avatar || defaultAvatar" class="w-12 h-12 rounded-full object-contain" alt="" />
                <div>
                    <h3 class="text-2xl leading-5 font-semibold text-gray-900">
                        {{ selectedUser.first_name }} {{ selectedUser.last_name }}
                    </h3>
                    <span class="text-sm text-gray-600">{{ selectedUser.email }}</span>
                </div>
            </header>

            <div v-if="selectedUser" class="bg-indigo-50 h-[60vh] md:h-[70vh] p-2 rounded-lg relative overflow-hidden">
                <div class="h-full overflow-y-auto flex flex-col p-4 space-y-4 pb-[80px]" id="message-box">
                    <div v-for="message in messages" :key="message.id" :class="messageClass(message.sender_id)">
                        <div v-if="message.sender_id === user?.id"
                            class="bg-blue-500 text-white rounded-lg p-3 max-w-xs self-end">
                            <p>{{ message.message }}</p>
                            <span class="text-xs text-gray-200">{{ formatDate(message.created_at) }}</span>
                        </div>
                        <div v-else class="bg-white rounded-lg p-3 max-w-xs">
                            <p>{{ message.message }}</p>
                            <span class="text-xs text-gray-600">{{ formatDate(message.created_at) }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center mt-4 rounded-xl bg-gray-50 p-2 shadow-inner sticky bottom-0">
                    <input type="file" ref="fileInput" class="hidden" @change="handleImageUpload" />
                    <button @click="triggerFileUpload" class="bg-transparent hover:bg-gray-200 p-2 rounded-full">
                        <DocumentIcon class="h-6 w-6 text-gray-500" />
                    </button>
                    <input v-model="newMessage" @keyup.enter="sendMessage"
                        class="flex-1 border-none outline-none bg-transparent resize-none p-2 max-h-32 overflow-y-auto"
                        rows="1" placeholder="Type a message..." @input="autoResize"></input>
                    <button @click="sendMessage" class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-2">
                        <PaperAirplaneIcon class="w-5 h-5 transform rotate-45" />
                    </button>
                </div>
            </div>

            <div v-else class="flex items-center justify-center h-full">
                <p class="text-gray-500">Select a user to start chatting</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick, onUnmounted } from 'vue';
import { useAuthStore } from '@/store/auth'; // Đường dẫn đúng đến store
import api from '@/services/axiosConfig'; // Đường dẫn đến file cấu hình axios
import echo from '@/composables/user/userChatEcho'; // Đường dẫn đến file cấu hình echo
import { PaperAirplaneIcon, DocumentIcon } from '@heroicons/vue/20/solid';
import { useMessageStore } from '@/store/message';
import { InfoFilled } from '@element-plus/icons-vue';

const messageStore = useMessageStore()

// Sử dụng composable auth
const authStore = useAuthStore();

// Biến avatar mặc định
const defaultAvatar = 'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid';

// Danh sách người dùng
const users = ref<any[]>([]);

// Tìm kiếm
const searchQuery = ref('');

// Người dùng được chọn để chat
const selectedUser = ref<any | null>(null);

// Tin nhắn
const messages = ref<any[]>([]);

// Tin nhắn mới
const newMessage = ref('');

// File input ref
const fileInput = ref<HTMLInputElement | null>(null);

const latest_message = ref('');
const channel = ref<any>(null);
const waitingUser = ref<any>(null);

// Lấy danh sách người dùng
const fetchUsers = async () => {
    try {
        const response = await api.get('/auth/chat/users');
        users.value = response.data.data;


        if (waitingUser.value && users.value.find((user: any) => user.id == waitingUser.value?.id) == undefined) {
            users.value.push(waitingUser.value);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const currentUser = computed(() => authStore.state.user)

const messageClass = (senderId: number) => {
    return senderId === user.value?.id ? 'flex justify-end' : 'flex';
};

// Lọc danh sách người dùng theo tìm kiếm
const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    return users.value.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Chọn người dùng để chat
const selectUser = async (userItem: any) => {
    selectedUser.value = userItem;
    // console.log(`Selected user: ${userItem.id}`); // Kiểm tra ID người nhận
    await fetchUsers();
    await fetchMessages(userItem.id);
    latest_message.value = '';
};


const setupBroadcasting = () => {

    // if (!selectedUser.value || !authStore.state.user) return;
    if (!authStore.state.user) return;

    console.log('current user ' + authStore.state.user.id);

    const channelName = `chat.${authStore.state.user.id}`;
    channel.value = echo.private(channelName);

    console.log(`Subscribed to channel: ${channelName}`);


    channel.value?.listen('.MessageSent', (e: any) => { // Sử dụng tên sự kiện đúng với backend
        console.log('Received MessageSent event:', e.message);
        if (e.message.sender_id === selectedUser.value?.id) {
            messages.value.push(e.message);
            latest_message.value = e.message?.message
            scrollToBottom();
        } else {
            fetchUsers();
        }
    });

    console.log(`Đã chạy qua listen`);

    // Cleanup khi component bị hủy hoặc khi người dùng đổi cuộc trò chuyện
    return () => {
        echo.leave(channelName);
    };
};

// Lấy tin nhắn giữa người dùng hiện tại và người dùng được chọn
const fetchMessages = async (receiverId: number) => {
    try {
        const response = await api.get(`/auth/message/private/${receiverId}`);
        messages.value = response.data.data;
        scrollToBottom();
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

// Gửi tin nhắn
const sendMessage = async () => {
    if (newMessage.value.trim() === '' || !selectedUser.value) return;

    try {
        const payload = { message: newMessage.value };
        latest_message.value = newMessage.value
        // const exMessage = { id: 'ex', message: newMessage.value, sender_id: currentUser.value?.id  };
        // messages.value.push(exMessage)
        const response = await api.post(`/auth/messages/${selectedUser.value.id}`, payload);
        // const index = messages.value.findIndex((ite: any) => ite.id == 'ex')
        // messages.value[index] = response.data.data
        messages.value.push(response.data.data);

        // console.log(response.data.data);

        newMessage.value = '';
        scrollToBottom();
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

const getWaitingUser = async () => {
    try {
        const hasWaitingUser = users.value.find((user: any) => user.id == messageStore.waitingUserChat)

        //CHECK HAS USER
        if (hasWaitingUser) {
            selectUser(hasWaitingUser)
            messageStore.waitingUserChat = null;
            return
        }

        const response = await api.get(`/auth/get-user-id/${messageStore.waitingUserChat}`);
        waitingUser.value = response.data.data;
        // users.value.push(waitingUser.value);
        selectUser(waitingUser.value)
        messageStore.waitingUserChat = null;
    } catch (e) {
        console.error('Error:', e);
    }
}


// Khởi tạo
onMounted(async () => {
    console.log('start listen');

    setupBroadcasting();

    if (authStore.state.token) {
        // await authStore.fetchCurrentUser();
        latest_message.value = '';
        console.log('refresh last_message');
        await fetchUsers();

        //CHECK HAS WAITING USER CHAT
        if (messageStore.waitingUserChat != null) {
            getWaitingUser()
        }
    } else {
        // Nếu không có token, redirect đến trang login
        window.location.href = '/login';
    }
});

onUnmounted(() => {
    channel.value.unLIO
})



















// Gửi hình ảnh
const sendImage = async (imageData: string) => {
    if (!selectedUser.value) return;

    try {
        const payload = { message: 'Image', image: imageData };
        const response = await api.post(`/messages/${selectedUser.value.id}`, payload);
        messages.value.push(response.data.data);
        scrollToBottom();
    } catch (error) {
        console.error('Error sending image:', error);
    }
};


// Cuộn xuống cuối cùng của khung tin nhắn
const scrollToBottom = () => {
    nextTick(() => {
        const container = document.querySelector('#message-box');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    });
};

// Xử lý tự động thay đổi kích thước textarea
const autoResize = (event: any) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};

// Xử lý upload hình ảnh
const handleImageUpload = () => {
    if (fileInput.value && fileInput.value.files && fileInput.value.files[0]) {
        const file = fileInput.value.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // Gửi hình ảnh lên server hoặc xử lý theo nhu cầu
            // Ví dụ: gửi dưới dạng base64
            sendImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        fileInput.value.value = ''; // Reset input
    }
};

// Kích hoạt upload file
const triggerFileUpload = () => {
    fileInput.value?.click();
};

// Định dạng ngày giờ
const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Gán người dùng hiện tại từ store
const user = computed(() => authStore.state.user);


// Watch selectedUser để setup broadcasting khi người dùng chọn thay đổi
watch(selectedUser, () => {
    // Có thể thêm logic để cleanup các kênh trước nếu cần
});
</script>

<style scoped>
.scrollable-container {
    scrollbar-width: thin;
    scrollbar-color: #a0aec0 transparent;
}

.scrollable-container::-webkit-scrollbar {
    width: 6px;
}

.scrollable-container::-webkit-scrollbar-track {
    background: transparent;
}

.scrollable-container::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 3px;
}
</style>