// src/store/order.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axiosConfig'

interface TOrder {
  id: number
  order_code: string
  total_price: number
  payment_status: string
  payment_code: string
  // Add other necessary fields
}

export const useOrderStore = defineStore('order', () => {
  const order = ref<TOrder | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createOrder = async (token: string) => {
    loading.value = true
    try {
      const response = await api.post('auth/orders', { param: { token: token } })
      order.value = response.data.order
      return response.data.client_secret
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchOrderDetails = async (orderId: number) => {
    loading.value = true
    try {
      const response = await api.get(`/orders/${orderId}`)
      order.value = response.data.order
      console.log('Order Details:', order.value)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch order details'
      throw err
    } finally {
      loading.value = false
    }
  }

  const confirmPayment = async (orderId: number, payment_method_id: string) => {
    loading.value = true
    try {
      const response = await api.post(`/orders/${orderId}/confirm-payment`, {
        payment_method_id
      })
      order.value = response.data.order
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to confirm payment'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    order,
    loading,
    error,
    createOrder,
    fetchOrderDetails,
    confirmPayment
  }
})
