import { ref, onMounted } from 'vue'
import { apisStore } from '@/store/apis'
import { ElNotification } from 'element-plus'
import api from '@/services/axiosConfig'

export function useBill() {
  const apiStore = apisStore()
  const noBill = ref(true)
  const isStatus = ref(true)
  // Logic tải dữ liệu hóa đơn
  const fetchBillData = async () => {
    await apiStore.fetchBill()
    // Kiểm tra nếu không có hóa đơn
    noBill.value = apiStore.billHistory.length === 0
  }
  // Logic hủy đơn hàng
  const cancelOrder = async (orderId: number) => {
    try {
      await api.patch(`auth/orders/${orderId}`)
      await fetchBillData()
      ElNotification({
        title: 'Thành công',
        message: 'Đơn hàng đã được hủy thành công.',
        type: 'success'
      })
    } catch (error: any) {
      ElNotification({
        title: 'Lỗi',
        message: 'Không thể hủy đơn hàng. Vui lòng thử lại.',
        type: 'error'
      })
    }
  }
  onMounted(() => {
    fetchBillData()
  })

  return { noBill, apiStore, cancelOrder }
}
