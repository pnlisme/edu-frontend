// Composable: useVoucher.ts
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useVoucherStore } from '@/store/voucher'
import dayjs from 'dayjs'
import type { TVoucher } from '@/interfaces/voucher'

export function useVoucher() {
  const voucherStore = useVoucherStore()
  const drawerVisible = ref(false)
  const deletedVouchersDialogVisible = ref(false)
  const updatedrawerVisible = ref(false)
  const voucherForm = ref<TVoucher>({
    code: '',
    description: '',
    discount_type: 'percent',
    discount_value: 0,
    usage_limit: 0,
    expires_at: '',
    min_order_value: 0,
    max_discount_value: 0,
    status: 'active'
  })

  onMounted(async () => {
    await voucherStore.fetchVouchers()
  })

  const openDrawer = () => {
    voucherForm.value = {
      code: '',
      description: '',
      discount_type: 'percent',
      discount_value: 0,
      usage_limit: 0,
      expires_at: '',
      min_order_value: 0,
      max_discount_value: 0,
      status: 'active'
    }
    drawerVisible.value = true
  }

  const openDeletedVouchersDialog = async () => {
    await voucherStore.fetchDeletedVouchers()
    deletedVouchersDialogVisible.value = true
  }

  const handleSubmit = async () => {
    try {
      const today = dayjs().startOf('day')
      const expiryDate = dayjs(voucherForm.value.expires_at)
      if (expiryDate.isBefore(today)) {
        ElMessage({
          type: 'error',
          message: 'Ngày hết hạn phải sau ngày hiện tại!'
        })
        return
      }
      voucherForm.value.expires_at = expiryDate.format('YYYY-MM-DD')
      await voucherStore.createVoucher(voucherForm.value)
      ElMessage({
        type: 'success',
        message: 'Tạo voucher thành công!'
      })
      drawerVisible.value = false
      await voucherStore.fetchVouchers()
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'Tạo voucher không thành công!'
      })
    }
  }

  const handleUpdate = async () => {
    try {
      const today = dayjs().startOf('day')
      const expiryDate = dayjs(voucherForm.value.expires_at)
      if (expiryDate.isBefore(today)) {
        ElMessage({
          type: 'error',
          message: 'Ngày hết hạn phải sau ngày hiện tại!'
        })
        return
      }
      voucherForm.value.expires_at = expiryDate.format('YYYY-MM-DD')
      await voucherStore.updateVoucher(voucherForm.value)
      ElMessage({
        type: 'success',
        message: 'Cập nhật voucher thành công!'
      })
      updatedrawerVisible.value = false
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'Cập nhật voucher không thành công!'
      })
    }
  }

  const editVoucher = (voucher: TVoucher) => {
    voucherForm.value = { ...voucher }
    updatedrawerVisible.value = true
  }

  const handleDeleteVoucher = async (code: number | string) => {
    try {
      await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa voucher này không?', 'Xác nhận xóa', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning'
      })
      await voucherStore.deleteVoucher(code)
      ElMessage({
        type: 'success',
        message: 'Xóa voucher thành công!'
      })
    } catch {
      ElMessage({
        type: 'info',
        message: 'Hủy xóa voucher'
      })
    }
  }

  const restoreVoucher = async (code: number | string) => {
    try {
      await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn khôi phục voucher này không?',
        'Xác nhận khôi phục',
        {
          confirmButtonText: 'Khôi phục',
          cancelButtonText: 'Hủy',
          type: 'info'
        }
      )
      await voucherStore.restoreVoucher(code)
      ElMessage({
        type: 'success',
        message: 'Khôi phục voucher thành công!'
      })
    } catch {
      ElMessage({
        type: 'info',
        message: 'Hủy khôi phục voucher'
      })
    }
  }

  return {
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
    restoreVoucher
  }
}
