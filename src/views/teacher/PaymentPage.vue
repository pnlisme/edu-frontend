<template>
    <div class="p-5 bg-gray-50 min-h-screen">
        <div class="flex justify-between items-center flex-wrap gap-3">
            <h1 class="text-2xl font-bold">Lịch sử rút tiền</h1>
            <el-button type="primary" class="!py-2 !px-4 rounded-lg" @click="handleWithdrawClick">
                + Yêu cầu rút tiền
            </el-button>
        </div>

        <!-- Tổng quan -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            <div class="bg-white p-5 shadow rounded-lg flex flex-col items-center justify-center">
                <h2 class="text-2xl font-bold text-indigo-500">{{ formatPrice(state.dataReportPayment.moneyReceived) }}
                </h2>
                <p class="text-gray-600">Tiền đã nhận</p>
            </div>
            <div class="bg-white p-5 shadow rounded-lg flex flex-col items-center justify-center">
                <h2 class="text-2xl font-bold text-indigo-500">{{ formatPrice(state.dataReportPayment.totalRevenue) }}
                </h2>
                <p class="text-gray-600">Tổng thu nhập</p>
            </div>
            <div class="bg-white p-5 shadow rounded-lg flex flex-col items-center justify-center">
                <h2 class="text-2xl font-bold text-indigo-500">{{ formatPrice(state.dataReportPayment.pendingPayouts) }}
                </h2>
                <p class="text-gray-600">Tiền đang yêu cầu</p>
            </div>
            <div class="bg-white p-5 shadow rounded-lg flex flex-col items-center justify-center">
                <h2 class="text-2xl font-bold text-indigo-500">{{ formatPrice(state.dataReportPayment.availablePayout)
                    }}</h2>
                <p class="text-gray-600">Số tiền có thể rút</p>
            </div>
        </div>

        <!-- Bộ lọc và bảng -->
        <div class="mt-8 bg-white p-5 rounded-lg shadow">
            <!-- Bộ lọc -->
            <div class="flex flex-wrap justify-between gap-3 items-center">
                <el-date-picker v-model="filterDate" type="daterange" placeholder="Chọn khoảng thời gian"
                    class="w-full sm:w-1/2 md:w-1/3" />
                <el-button type="primary" class="!py-2 !px-4" @click="handleFilter">
                    Lọc
                </el-button>
            </div>

            <!-- Bảng -->
            <el-table :data="state.listPayout" stripe class="mt-5" style="width: 100%">
                <el-table-column prop="id" label="#" width="50" />
                <el-table-column prop="amount" label="Số tiền rút">
                    <template #default="{ row }">
                        {{ formatPrice(row.amount) }}
                    </template>
                </el-table-column>
                <el-table-column label="Ngày yêu cầu">
                    <template #default="{ row }">
                        {{ formatDate(row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Trạng thái">
                    <template #default="{ row }">
                        <span v-if="row.status === 'pending'" class="bg-red-100 text-red-600 px-3 py-1 rounded-md">
                            Chưa giải quyết
                        </span>
                        <span v-else-if="row.status === 'processing'"
                            class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-md">

                            Xử lý
                        </span>
                        <span v-else-if="row.status === 'rejected'"
                            class="bg-pink-100  text-pink-600 px-3 py-1 rounded-md">

                            Từ chối
                        </span>
                        <span v-else class="bg-green-100 text-green-600 px-3 py-1 rounded-md">
                            Đã thanh toán
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="reason" label="Ghi chú" />


            </el-table>

        </div>


        <el-dialog v-model="isWithdrawModalVisible" title="Yêu cầu Rút Tiền" width="500px">
            <form @submit.prevent="submitWithdrawForm">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Số tiền muốn rút</label>
                    <el-input v-model="withdrawForm.amount" type="number" placeholder="Nhập số tiền muốn rút" min="1"
                        clearable />
                </div>
                <div class="flex justify-end mt-4">
                    <el-button @click="isWithdrawModalVisible = false">Hủy</el-button>
                    <el-button type="primary" native-type="submit">Xác nhận</el-button>
                </div>
            </form>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { useTeacherStore } from "@/store/teacher";
import { formatPrice } from "@/utils/formatPrice";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

// Modal và Form
const isWithdrawModalVisible = ref(false);
const withdrawForm = ref({
    amount: '', // Số tiền cần rút
});
const rules = {
    amount: [{ required: true, message: 'Vui lòng nhập số tiền muốn rút', trigger: 'blur' }],
};
const formatDate = (date: string): string => {
    if (!date) return "Không xác định";
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("vi-VN", options);
};
// Bộ lọc và dữ liệu bảng
const filterDate = ref<[Date, Date] | null>(null);

// Store
const teacherStore = useTeacherStore();
const { state } = storeToRefs(teacherStore);
const {
    fetchReportTeacherPayment,
    fetchListTeacherPayout,
    requestPayout,
} = teacherStore;

// Hiển thị Modal Rút Tiền
const handleWithdrawClick = () => {
    isWithdrawModalVisible.value = true;
};

// Gửi Form Rút Tiền
const submitWithdrawForm = async () => {
    const amount = parseFloat(withdrawForm.value.amount);
    if (amount < 13000) {
        ElMessage.error("Số tiền không đạt mức tối thiểu ₫13,000!")
        return;
    }

    if (!amount || amount <= 0) {
        console.error("Số tiền không hợp lệ!");
        return;
    }

    try {
        const data = {
            amount,
            currency: "vnd",
        };
        await requestPayout(data);
        isWithdrawModalVisible.value = false;
        withdrawForm.value.amount = '';
    } catch (error: any) {
        if (error?.response?.data?.error) {
            const errorDetails = error.response.data.error;
            if (errorDetails.amount) {
                console.error(`Lỗi số tiền: ${errorDetails.amount[0]}`);
            }
            if (errorDetails.currency) {
                console.error(`Lỗi tiền tệ: ${errorDetails.currency[0]}`);
            }
        } else {
            console.error("Lỗi không xác định:", error);
        }
    }
};

const handleFilter = async () => {
    const [startDate, endDate] = filterDate.value || [];
    const params = {
        start_date: startDate ? startDate.toISOString().split("T")[0] : undefined,
        end_date: endDate ? endDate.toISOString().split("T")[0] : undefined,
    };
    await fetchListTeacherPayout(params);
};
onMounted(async () => {
    await fetchReportTeacherPayment();
    await fetchListTeacherPayout();
});
</script>
