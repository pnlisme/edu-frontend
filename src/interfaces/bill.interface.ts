export interface OrderItem {
  id: number
  order_id: number // Tham chiếu đến id của hóa đơn
  course_id: number // ID của khóa học
  price: number // Giá của sản phẩm
  deleted_at?: string | null // Trường để theo dõi xóa mềm (soft delete)
  status: 'active' | 'inactive' // Trạng thái của item
  created_by?: number | null // ID người tạo
  updated_by?: number | null // ID người cập nhật
  deleted_by?: number | null // ID người xóa
  created_at?: string // Thời gian tạo
  updated_at?: string // Thời gian cập nhật
}
export interface TBill {
  id: number
  user_id?: number
  voucher_id?: string
  order_code: string
  total_price: number
  currency: 'usd' | 'vnd'
  payment_method?: string
  payment_status: 'pending' | 'paid' | 'cancelled'
  payment_code: string
  status: 'active' | 'inactive'
  created_at?: string
  order_items?: OrderItem[]
}
