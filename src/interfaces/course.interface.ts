export interface TCardCourse {
  creator?: string
  current_price: number
  id: number
  lectures_count?: number
  level: string
  old_price?: number
  average_rating?: number
  reviews_count?: number
  status?: 'active' | 'inactive'
  tag?: string
  thumbnail?: string
  title: string
  total_duration?: number
}
// edit
export interface TCourseAdmin {
  id: number
  title: string
  description: string
  short_description: string
  thumbnail: string
  price: number
  type_sale: string
  sale_value: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface TCardMyCourse {
  id: number
  thumbnail?: string
  title: string
  creator: string
  total_lectures: number
  completed_lectures: number
  progress_percent: number
}
export interface TCartCourseViewItem {
  id: number
  thumbnail: string
  title: string
  current_price: number
  old_price: number
  category: string
}
export interface TCourseFilters {
  category_ids?: number[]
  duration_range?: number
  min_rating?: number
  max_rating?: number
  level_ids?: number[]
  keyword?: string
  sort_by?: string
  sort_order?: string
  language_ids?: number[]
}
export interface TSection {
  id?: number | string
  course_id?: number[]
  name?: string
  sort?: number | string
  lectures?: TLectures[]
}

export interface TLectures {
  id?: number | string
  title?: string
}
