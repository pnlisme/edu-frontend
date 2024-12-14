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

// admin
export interface TContentOfSection {
  id?: number
  section_id?: number
  type?: 'video' | 'file'
  title?: string
  content_link?: string
  duration?: number
  preview?: string | null
  status?: 'active' | 'inactive'
  order?: number
  deleted_at?: string | null
  deleted_by?: number | null
  created_at?: string
  updated_at?: string
  created_by?: number
  updated_by?: number | null
  content_type?: string
}
export interface TSortLecture {
  id?: number
  section_id?: number
  type?: string
  title?: string
  content_link?: string
  duration?: number
  preview?: string
  status?: string
  order?: number
  deleted_at?: string
  deleted_by?: string
  created_at?: string
  updated_at?: string
  created_by?: number
  updated_by?: string
  content_type?: string
}
export interface TLecture {
  id?: number
  section_id?: number
  type?: 'video' | 'file'
  title?: string
  content?: File | string
  content_type?: string
  duration?: number
  preview?: 'cant' | 'can'
  status?: 'active' | 'inactive'
  order?: number
}

// course

export interface TCourseCURD {
  category_id: string
  level_id: string
  title: string
  description: string
  short_description: string
  price: string
  type_sale: 'price' | 'percent'
  sale_value: string
  status: 'active' | 'inactive'
  language_id: string
  thumbnail: File | string
}

// section
export interface TSectionOfCourse {
  id: number
  course_id: number
  title: string
  description: string
  status: 'inactive' | 'active'
  order: number
  created_by: number
  total_contents?: number
}

export interface TSection {
  id?: number
  course_id?: number
  title?: string
  description?: string
  status?: 'active' | 'inactive'
  order?: number
}
// quiz

export interface TQuiz {
  id?: number
  section_id?: number
  title?: string
  status?: 'active' | 'inactive'
}

// question

export interface TQuestionList {
  id: number
  quiz_id: number
  question: string
  options: string[]
  answer: string
  status: 'active' | 'inactive'
  order: number
  deleted_at: string | null
  deleted_by: number | null
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number | null
}
