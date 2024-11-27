<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">Quản lý Voucher</h1>
        <!-- Nút thêm voucher mới -->
        <div class="flex items-center gap-1">

            <el-button type="primary" class="flex items-center gap-1" @click="openDrawer">
                <PlusIcon class="h-5 w-5 text-white cursor-pointer" />
                Thêm Voucher
            </el-button>

            <el-button type="success" class="flex items-center gap-1 ml-2" @click="openDeletedVouchersDialog">
                <ArrowPathIcon class="h-5 w-5 text-white cursor-pointer" />
                Xem Voucher Đã Xóa
            </el-button>
        </div>


        <!-- Bảng hiển thị danh sách voucher -->
        <el-table :data="voucherStore.state.vouchers" class="mt-4 rounded-md">
            <el-table-column prop="code" label="Mã" />
            <el-table-column prop="description" label="Mô tả" />
            <el-table-column prop="discount_value" label="Giá trị giảm" />
            <el-table-column prop="discount_type" label="Loại giảm" />
            <el-table-column prop="usage_limit" label="Số lượng" />
            <el-table-column prop="min_order_value" label="Giá trị tối thiếu" />
            <el-table-column prop="max_discount_value" label="Giá trị tối đa" />
            <el-table-column prop="status" label="Trạng thái" />
            <el-table-column prop="expires_at" label="Ngày hết hạn">
                <template #default="{ row }">
                    {{ dayjs(row.expires_at).format('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column label="Hành động">
                <template #default="{ row }">
                    <div class="flex justify-center gap-1">

                        <PencilSquareIcon class="h-5 w-5 text-indigo-500 cursor-pointer" @click="editVoucher(row)" />


                        <TrashIcon class="h-5 w-5 text-red-500 cursor-pointer" @click="handleDeleteVoucher(row.code)" />
                        <!-- <ArrowPathIcon class="h-5 w-5 text-green-500 cursor-pointer"
                            @click="restoreVoucher(row.code)" /> -->
                    </div>


                </template>
            </el-table-column>
        </el-table>

        <!-- Drawer tạo và chỉnh sửa voucher -->
        <el-dialog align-center title="Tạo Voucher" class="z-20" v-model="drawerVisible" width="60%">
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Mã Voucher</label>
                    <el-input v-model="voucherForm.code" placeholder="Nhập mã voucher" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Mô tả</label>
                    <el-input v-model="voucherForm.description" placeholder="Nhập mô tả" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Loại giảm giá</label>
                    <el-select v-model="voucherForm.discount_type" placeholder="Chọn loại giảm giá">
                        <el-option label="Phần trăm" value="percent" />
                        <el-option label="Giá trị cố định" value="fixed" />
                    </el-select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giá trị giảm</label>
                    <el-input-number v-model="voucherForm.discount_value" placeholder="Nhập giá trị giảm" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giới hạn sử dụng</label>
                    <el-input-number v-model="voucherForm.usage_limit" placeholder="Nhập giới hạn sử dụng" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Ngày hết hạn</label>
                    <el-date-picker v-model="voucherForm.expires_at" placeholder="Chọn ngày hết hạn" type="date" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giá trị đơn hàng tối thiểu</label>
                    <el-input-number v-model="voucherForm.min_order_value"
                        placeholder="Nhập giá trị đơn hàng tối thiểu" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giá trị giảm tối đa</label>
                    <el-input-number v-model="voucherForm.max_discount_value" placeholder="Nhập giá trị giảm tối đa" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng thái</label>
                    <el-select v-model="voucherForm.status" placeholder="Chọn trạng thái">
                        <el-option label="Hoạt động" value="active" />
                        <el-option label="Không hoạt động" value="inactive" />
                    </el-select>
                </div>
                <div class="flex justify-end">
                    <el-button @click="drawerVisible = false">Hủy</el-button>
                    <el-button type="primary" native-type="submit">Lưu</el-button>
                </div>
            </form>
        </el-dialog>
        <!-- Dialog hiển thị danh sách voucher đã xóa mềm -->
        <el-dialog align-center class="z-20" title="Danh sách Voucher Đã Xóa" v-model="deletedVouchersDialogVisible"
            width="50%">
            <el-table :data="voucherStore.state.deletedVouchers" class="rounded-md">
                <el-table-column prop="code" label="Mã" />
                <el-table-column prop="description" label="Mô tả" />
                <el-table-column prop="discount_value" label="Giá trị giảm" />
                <el-table-column prop="status" label="Trạng thái" />
                <el-table-column label="Hành động">
                    <template #default="{ row }">
                        <div class="flex justify-center gap-1">
                            <ArrowPathIcon class="h-5 w-5 text-green-500 cursor-pointer"
                                @click="restoreVoucher(row.code)" />
                        </div>
                    </template>
                </el-table-column>
            </el-table>

        </el-dialog>
        <!--  -->
        <el-dialog align-center title="Update Voucher" class="z-20" v-model="updatedrawerVisible" width="60%">
            <form @submit.prevent="handleUpdate">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Mã Voucher</label>
                    <el-input v-model="voucherForm.code" placeholder="Nhập mã voucher" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Mô tả</label>
                    <el-input v-model="voucherForm.description" placeholder="Nhập mô tả" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Loại giảm giá</label>
                    <el-select v-model="voucherForm.discount_type" placeholder="Chọn loại giảm giá">
                        <el-option label="Phần trăm" value="percent" />
                        <el-option label="Giá trị cố định" value="fixed" />
                    </el-select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giá trị giảm</label>
                    <el-input-number v-model="voucherForm.discount_value" placeholder="Nhập giá trị giảm" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giới hạn sử dụng</label>
                    <el-input-number v-model="voucherForm.usage_limit" placeholder="Nhập giới hạn sử dụng" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Ngày hết hạn</label>
                    <el-date-picker v-model="voucherForm.expires_at" placeholder="Chọn ngày hết hạn" type="date" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giá trị đơn hàng tối thiểu</label>
                    <el-input-number v-model="voucherForm.min_order_value"
                        placeholder="Nhập giá trị đơn hàng tối thiểu" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Giá trị giảm tối đa</label>
                    <el-input-number v-model="voucherForm.max_discount_value" placeholder="Nhập giá trị giảm tối đa" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Trạng thái</label>
                    <el-select v-model="voucherForm.status" placeholder="Chọn trạng thái">
                        <el-option label="Hoạt động" value="active" />
                        <el-option label="Không hoạt động" value="inactive" />
                    </el-select>
                </div>
                <div class="flex justify-end">
                    <el-button @click="drawerVisible = false">Hủy</el-button>
                    <el-button type="primary" native-type="submit">Lưu</el-button>
                </div>
            </form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useVoucherStore } from '@/store/voucher'
import type { TVoucher } from '@/interfaces/voucher';
import { PencilSquareIcon, TrashIcon, ArrowPathIcon, PlusIcon } from "@heroicons/vue/24/outline";
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useVoucher } from '@/composables/admin/useVoucher';

const {
    voucherStore,
    drawerVisible,
    deletedVouchersDialogVisible,
    updatedrawerVisible,
    voucherForm,
    openDrawer,
    openDeletedVouchersDialog,
    handleSubmit,
    handleUpdate,
    editVoucher,
    handleDeleteVoucher,
    restoreVoucher,
} = useVoucher();
</script>
