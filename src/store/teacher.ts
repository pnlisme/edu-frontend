import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import type { Tlevel } from '@/interfaces'
import { ElMessage, ElMessageBox } from 'element-plus'

export interface TReportTeacherPayment {
  pendingPayouts: number
  totalRevenue: number
  moneyReceived: number
  availablePayout: number
}
export interface TListPaymentUser {
  id?: number
  user_id?: number
  type?: string
  details: {
    stripe_account_id?: string
    scope?: string
    token_type?: string
    refresh_token?: string
  }
  account_info_number?: string
  status?: 'active' | 'inactive'
  created_at?: string
  updated_at?: string
}
interface TReportState {
  dataReportPayment: TReportTeacherPayment
  urlCallBackStripe: string
  listPaymentUser: TListPaymentUser
  listPayout: any[]
}

export const useTeacherStore = defineStore('teacher', () => {
  const state = ref<TReportState>({
    dataReportPayment: {
      pendingPayouts: 0,
      totalRevenue: 0,
      moneyReceived: 0,
      availablePayout: 0
    },
    urlCallBackStripe: '',
    listPaymentUser: {
      id: 0,
      user_id: 0,
      type: '',
      details: {
        stripe_account_id: '',
        scope: '',
        token_type: '',
        refresh_token: ''
      },
      account_info_number: '',
      status: 'active',
      created_at: '',
      updated_at: ''
    },
    listPayout: []
  })

  const fetchReportTeacherPayment = async (params: any = {}) => {
    try {
      const res = await api.get('auth/payout/report-payment', { params })
      state.value.dataReportPayment = res.data.data
    } catch (error) {
      console.log(error)
    }
  }

  // Update Stripe Payment

  const getCallBackStripe = async () => {
    try {
      const res = await api.get('auth/payment-methods/stripe/link')
      state.value.urlCallBackStripe = res.data.data.url
    } catch (error) {
      console.log(error)
    }
  }

  const getListPaymentByUser = async () => {
    try {
      const res = await api.get('auth/payment-methods')
      state.value.listPaymentUser = res.data.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  const fetchListTeacherPayout = async (params: any = {}) => {
    try {
      const res = await api.get('/auth/payout', { params })
      state.value.listPayout = res.data.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const requestPayout = async (data: any) => {
    try {
      const res = await api.post('/auth/payout/request', data)
      if (res.data.status === 'OK') {
        ElMessage.success('Yêu cầu rút tiền thành công!')
        await fetchReportTeacherPayment()
        await getListPaymentByUser()
        await fetchListTeacherPayout()
      } else {
        if (res.data.message === 'messages.payment_method_not_found') {
          ElMessage.error('Bạn phải cập nhật phương thức thanh toán.')
        } else if (res.data.message === 'messages.amount_exceeds_balance') {
          ElMessage.error('Bạn đã vượt quá số dư cho phép ')
        } else {
          ElMessage.error('Yêu cầu rút tiền thất bại. Vui lòng thử lại.')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {
    state,
    fetchReportTeacherPayment,
    getCallBackStripe,
    getListPaymentByUser,
    fetchListTeacherPayout,
    requestPayout
  }
})
