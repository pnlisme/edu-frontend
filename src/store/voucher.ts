import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '@/services/axiosConfig'
import type { TAuthState, TUserAuth } from '@/interfaces/user.interface'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { TVoucher, TVoucherStoreState } from '@/interfaces/voucher'
export const useVoucherStore = defineStore('voucher', () => {
  const state = ref<TVoucherStoreState>({
    vouchers: [],
    deletedVouchers: [],
    voucherDetails: null,
    appliedVoucher: '',
    error: null,
    total_price: undefined,
    discount: undefined,
    total_price_after_discount: undefined,
    total: 0
  })
  //  Get toàn bộ Voucher
  const fetchVouchers = async (params: any = {}) => {
    try {
      // const response = await api.get('/auth/vouchers')
      const response = await api.get('/vouchers/list-vouchers-admin', { params })
      state.value.vouchers = response.data.data.data

      state.value.total = response.data.data.total
    } catch (error) {
      state.value.error = 'Không thể tải danh sách vouchers'
    }
  }

  // Get chi tiết Voucher (Không get Voucher đã xóa mềm)
  const fetchVoucherDetails = async (code: string) => {
    try {
      const response = await api.get(`/auth/vouchers/${code}`)
      state.value.voucherDetails = response.data.data
    } catch (error) {
      state.value.error = 'Không thể tải thông tin voucher'
    }
  }
  //   Get Voucher đã xóa mềm
  const fetchDeletedVouchers = async () => {
    try {
      const response = await api.get('/auth/vouchers/deleted')
      state.value.deletedVouchers = response.data.data
    } catch (error) {
      state.value.error = 'Không thể tải danh sách vouchers đã xóa'
    }
  }
  //   Tạo voucher (Kiểm lỗi khi tạo voucher trùng lặp)
  const createVoucher = async (voucherData: TVoucher) => {
    try {
      await api.post('/auth/vouchers/create', voucherData)
      await fetchVouchers()
    } catch (error) {
      state.value.error = 'Không thể tạo voucher mới'
    }
  }
  // edit
  const updateVoucher = async (voucherData: TVoucher) => {
    try {
      await api.put(`/auth/vouchers/${voucherData.id}`, voucherData)
      await fetchVouchers()
    } catch (error) {
      state.value.error = 'Không thể cập nhật voucher'
    }
  }
  //   Xóa mềm Voucher
  const deleteVoucher = async (code: string | number) => {
    try {
      await api.post('/auth/vouchers/delete', { code })
      await fetchVouchers()
    } catch (error) {
      state.value.error = 'Không thể xóa voucher'
    }
  }
  //   Khôi phục Voucher đã xóa
  const restoreVoucher = async (code: string | number) => {
    try {
      await api.post('/auth/vouchers/restore', { code })
      await fetchDeletedVouchers()
      await fetchVouchers()
    } catch (error) {
      state.value.error = 'Không thể khôi phục voucher'
    }
  }
  const applyVoucher = async (voucherCode: string | number) => {
    try {
      const response = await api.post('/auth/cart/apply-voucher', { voucher_code: voucherCode })
      state.value.appliedVoucher = voucherCode
      console.log(state.value.appliedVoucher)
      state.value.total_price = response.data.data.total_price
      state.value.discount = response.data.data.discount
      state.value.total_price_after_discount = response.data.data.total_price_after_discount

      if (response.data.status === 'FAIL') {
        ElNotification({
          title: 'Thất bại',
          message: 'Đăng nhập để sử dụng voucher',
          type: 'error'
        })
      }
      if (response.data.status === 'success') {
        ElNotification({
          title: 'Thành công',
          message: `Voucher "${voucherCode}" đã được áp dụng.`,
          type: 'success'
        })
      }

      return response.data // Trả về dữ liệu nếu cần sử dụng
    } catch (error) {
      state.value.error = 'Không thể áp dụng voucher'

      ElNotification({
        title: 'Thất bại',
        message: 'Voucher không hợp lệ hoặc không tồn tại.',
        type: 'error'
      })
    }
  }
  const firstActiveVoucher = computed(() => {
    const currentDate = new Date() // Lấy ngày hiện tại
    return state.value.vouchers.find((voucher) => {
      const expiryDate = new Date(voucher.expires_at!) // Chuyển ngày hết hạn thành đối tượng Date
      return voucher.status === 'active' && expiryDate > currentDate // Kiểm tra trạng thái và ngày hết hạn
    })
  })
  return {
    state,
    fetchVouchers,
    fetchVoucherDetails,
    fetchDeletedVouchers,
    createVoucher,
    deleteVoucher,
    restoreVoucher,
    applyVoucher,
    updateVoucher,
    firstActiveVoucher,
    voucher: computed(() => state.value.appliedVoucher),
    discount: computed(() => state.value.discount),
    total_price_after_discount: computed(() => state.value.total_price_after_discount)
  }
})
