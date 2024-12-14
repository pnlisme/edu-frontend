<template>
    <div class="p-5 bg-gray-50 min-h-screen">
        <div class="flex justify-between items-center flex-wrap gap-3">
            <h1 class="text-2xl font-bold">Quản lý yêu cầu rút tiền</h1>
        </div>

        <!-- Bộ lọc và bảng -->
        <div class="mt-8 bg-white p-5 rounded-lg shadow">
            <!-- Bộ lọc -->
            <div class="mt-8 bg-white p-5 rounded-lg shadow">
                <div class="flex flex-wrap justify-between gap-3 items-center">
                    <!-- Bộ lọc dải ngày -->
                    <el-date-picker v-model="filterDate" type="daterange" range-separator="Đến"
                        start-placeholder="Ngày bắt đầu" end-placeholder="Ngày kết thúc"
                        class="w-full sm:w-1/2 md:w-1/3" />
                    <!-- Bộ lọc trạng thái -->
                    <el-select v-model="filterStatus" placeholder="Chọn trạng thái" class="w-full sm:w-1/4 md:w-1/5">
                        <el-option label="Tất cả" value="" />
                        <el-option label="Đang xử lý" value="pending" />
                        <el-option label="Đã thanh toán" value="paid" />
                    </el-select>
                    <!-- Nút lọc -->
                    <el-button type="primary" class="!py-2 !px-4" @click="handleFilter">
                        Lọc
                    </el-button>
                </div>

                <!-- Bảng -->
                <el-table :data="listAuthPayout" stripe class="mt-5" style="width: 100%">
                    <el-table-column prop="id" label="#" width="50" />
                    <el-table-column prop="user.email" label="Tên giáo viên" />
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
                    <el-table-column label="Hành động" width="200">
                        <template #default="scope">
                            <div class="flex ">
                                <el-button v-if="scope.row.status === 'pending'" type="success" size="small"
                                    @click=" handleApprove(scope.row)">
                                    Xác nhận
                                </el-button>
                                <el-button v-if="scope.row.status === 'pending'" type="danger" size="small"
                                    @click="openRejectModal(scope.row)">
                                    Từ chối
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>


    </div>
    <el-dialog v-model="isRejectModalVisible" title="Nhập lý do từ chối" width="500px">
        <el-input type="textarea" v-model="rejectReason" placeholder="Nhập lý do từ chối" rows="4" />
        <template #footer>
            <el-button @click="isRejectModalVisible = false">Hủy</el-button>
            <el-button type="danger" @click="confirmReject">Xác nhận</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { useReportStore } from '@/store/report';
import { useTeacherStore } from '@/store/teacher';
import { formatPrice } from '@/utils/formatPrice';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

// Bộ lọc và bảng
const filterDate = ref<[Date, Date] | null>(null); // Dải ngày
const filterStatus = ref(''); // Trạng thái
const useReport = useReportStore()
const { listAuthPayout } = storeToRefs(useReport)
const { fetchRequestPayment, payoutProcess, payoutRejected } = useReport
const { fetchReportTeacherPayment,
    getListPaymentByUser,
    fetchListTeacherPayout, } = useTeacherStore()
// Modal Từ Chối
const isRejectModalVisible = ref(false);
const rejectReason = ref('');
const selectedRequest = ref<any>(null);
// Modal Xác nhận
const isApproveModalVisible = ref(false);
const formatDate = (date: string): string => {
    if (!date) return "Không xác định";
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("vi-VN", options);
};
// Xử lý lọc
const handleFilter = async () => {
    const [startDate, endDate] = filterDate.value || [];
    const params = {
        status: filterStatus.value || undefined, // Gửi status nếu có
        start_date: startDate ? startDate.toISOString().split('T')[0] : undefined, // Ngày bắt đầu
        end_date: endDate ? endDate.toISOString().split('T')[0] : undefined, // Ngày kết thúc
    };
    await fetchRequestPayment(params); // Gọi API lấy danh sách mới
};
// Xử lý thanh toán
const handleApprove = async (row: any) => {
    // selectedRequest.value = row;
    // isApproveModalVisible.value = true;
    const data = {
        amount: row.amount,
        currency: "vnd"
    }
    await payoutProcess(row.id, data)
    await fetchReportTeacherPayment()
    await getListPaymentByUser()
    await fetchListTeacherPayout()
    await fetchRequestPayment()
}
// Xử lý từ chối yêu cầu
const openRejectModal = (row: any) => {
    selectedRequest.value = row;
    isRejectModalVisible.value = true;
};

// Xác nhận Từ Chối
const confirmReject = async () => {

    const data = {
        reason: rejectReason.value
    }
    await payoutRejected(selectedRequest.value.id, data);
    isRejectModalVisible.value = false; // Đóng modal
    rejectReason.value = ''; // Reset lý do
    await fetchRequestPayment(); // Cập nhật lại danh sách
};

onMounted(async () => {
    await fetchRequestPayment()
})
</script>