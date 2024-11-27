export interface TCategory {
  id?: number
  image?: string | File
  name: string
  icon?: string
  courses_count?: number
  keyword?: string
  parent_id?: number
  description?: string
  status?: 'active' | 'inactive'
  children?: TCategory[]
}
export interface TCategoryCRUD {
  id: number
  image?: string | File
  name: string
  icon?: string
  courses_count?: number
  keyword?: string
  parent_id?: number
  description?: string
  status?: 'active' | 'inactive'
  children?: TCategory[]
}
export interface TCategoryFrom {
  id?: number
  image?: string | File
  name: string
  parent_id: number
  icon?: string
  courses_count?: number
  keyword?: string
  originalImage?: string
  description?: string
  status?: 'active' | 'inactive'
  children?: TCategory[]
}

// ====== ADMIN CATEGORY ======

export interface TListCategories {
  id?: number
  image?: string | File
  name: string
  parent_id: number
  icon?: string
  courses_count?: number
  keyword?: string
  originalImage?: string
  description?: string
  status?: 'active' | 'inactive'
  children?: TListCategories[]
}
export interface CurrentCategoryType {
  id?: number
  name?: string
  parentCategoryId?: number
  parentCategoryName?: string
}
export interface TUpdateCate {
  id?: number
  name?: string
  parent_id?: number
  status?: 'active' | 'inactive'
  description?: string
  image?: string
}
