import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import api from '@/services/axiosConfig'
import { ElMessage } from 'element-plus'

interface TchartDataTotal {
  date: string
  revenue: number
  total_sales: number
}
interface TchartDataUserOrder {
  period: string
  registrations: number
}
interface TchartDataOrder {
  period: string
  orders: number
}
interface TListAuthPayout {
  id: number
  user_id: number
  amount: number
  currency: string
  status: 'peding' | 'paid'
  reason: string
  created_at: string
  updated_at: string
}

export const useReportStore = defineStore('report', () => {
  const total_revenue = ref<number>(0)
  const total_sales = ref<number>(0)
  const total_payouts = ref<number>(0)
  const net_revenue = ref<number>(0)
  const total_users = ref<number>(0)
  const total_courses = ref<number>(0)
  const total_categories = ref<number>(0)
  const total_payout_requests = ref<number>(0)
  const completed_payout_requests = ref<number>(0)
  const processing_payout_requests = ref<number>(0)
  const failed_payout_requests = ref<number>(0)
  const chartDataTotal = ref<TchartDataTotal[]>([])
  const chartDataTotalTeacher = ref<TchartDataTotal[]>([])
  const chartDataUser = ref<TchartDataUserOrder[]>([])
  const chartDataOrder = ref<TchartDataOrder[]>([])
  const listAuthPayout = ref<TListAuthPayout[]>([])

  const total_students = ref<number>(0)
  const fetchReport = async () => {
    try {
      const res = await api.get('auth/admin/get-report')
      total_revenue.value = res.data.data.total_revenue
      net_revenue.value = res.data.data.net_revenue
      total_payouts.value = res.data.data.total_payouts
      total_users.value = res.data.data.total_users
      total_courses.value = res.data.data.total_courses
      total_categories.value = res.data.data.total_categories
      total_payout_requests.value = res.data.data.total_payout_requests
      completed_payout_requests.value = res.data.data.completed_payout_requests
      processing_payout_requests.value = res.data.data.processing_payout_requests
      failed_payout_requests.value = res.data.data.failed_payout_requests
    } catch (error) {
      console.error('Error fetching report:', error)
    }
  }
  const fetchReportTeacher = async () => {
    try {
      const res = await api.get('auth/instructor/report')
      total_courses.value = res.data.data.total_courses
      total_categories.value = res.data.data.total_categories
      total_revenue.value = res.data.data.total_revenue
      total_students.value = res.data.data.total_students
    } catch (error) {
      console.error('Error fetching report:', error)
    }
  }

  const fetchLineChartTotal = async (startDate: string, endDate: string, filter: string) => {
    try {
      const res = await api.get('/auth/admin/get-line-chart/revenue', {
        params: {
          start_date: startDate,
          end_date: endDate,
          filter: filter
        }
      })
      chartDataTotal.value = res.data.data || []
    } catch (error) {
      console.error('Error fetching line chart:', error)
    }
  }
  const fetchLineChartTotalTeacher = async (startDate: string, endDate: string, filter: string) => {
    try {
      const res = await api.get('/auth/instructor/line-chart', {
        params: {
          start_date: startDate,
          end_date: endDate,
          filter: filter
        }
      })
      chartDataTotal.value = res.data.data || []
      total_revenue.value = res.data.total_revenue
      total_sales.value = res.data.total_sales

      chartDataTotalTeacher.value = res.data.data
    } catch (error) {
      console.error('Error fetching line chart:', error)
    }
  }
  const fetchLineChartUser = async (startDate: string, endDate: string, filter: string) => {
    try {
      const res = await api.get('/auth/admin/get-line-chart/user', {
        params: {
          start_date: startDate,
          end_date: endDate,
          filter: filter
        }
      })
      chartDataUser.value = res.data.data || []
    } catch (error) {
      console.error('Error fetching line chart:', error)
    }
  }
  const fetchLineChartOrder = async (startDate: string, endDate: string, filter: string) => {
    try {
      const res = await api.get('/auth/admin/get-line-chart/order', {
        params: {
          start_date: startDate,
          end_date: endDate,
          filter: filter
        }
      })
      chartDataOrder.value = res.data.data || []
    } catch (error) {
      console.error('Error fetching line chart:', error)
    }
  }

  const fetchRequestPayment = async (params: any = {}) => {
    try {
      const res = await api.get('/auth/admin', { params })
      listAuthPayout.value = res.data.data
    } catch (error) {
      console.log(error)
    }
  }
  const payoutProcess = async (id: number, data: any) => {
    try {
      const res = await api.post(`/auth/payout/process/${id}`, data)
      if (res.data.status === 'SUCCESS') {
        window.location.href = res.data.data.transaction_link
      } else {
        ElMessage.error('Thanh toán thất bại. Vui lòng thử lại.')
      }
    } catch (error) {
      ElMessage.error('Thanh toán thất bại. Vui lòng thử lại.')
      // console.log(error)
    }
  }
  const payoutRejected = async (id: number, data: any) => {
    try {
      const res = await api.post(`/auth/payout/rejected/${id}`, data)
      if (res.data.status === 'SUCCESS') {
        ElMessage.success('Xóa thanh toán thành công')
      } else {
        ElMessage.error('Xóa thanh toán thất bại. Vui lòng thử lại.')
      }
    } catch (error) {
      ElMessage.error('Xóa thanh toán thất bại. Vui lòng thử lại.')
      // console.log(error)
    }
  }
  return {
    total_sales,
    listAuthPayout,
    total_revenue,
    total_payouts,
    net_revenue,
    total_users,
    total_courses,
    total_students,
    total_categories,
    total_payout_requests,
    completed_payout_requests,
    processing_payout_requests,
    failed_payout_requests,
    chartDataTotal,
    chartDataUser,
    chartDataOrder,
    chartDataTotalTeacher,
    fetchReport,
    fetchLineChartTotal,
    fetchLineChartUser,
    fetchLineChartOrder,
    fetchReportTeacher,
    fetchLineChartTotalTeacher,
    fetchRequestPayment,
    payoutProcess,
    payoutRejected
  }
})
