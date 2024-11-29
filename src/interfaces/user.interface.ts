export interface TUserAuth {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  avatar?: string
  role: 'student' | 'admin' | 'instructor'
  biography?: string
  contact_info: {
    website?: string
    linked?: string
  }
  gender?: string
  date_of_birth?: string
}

export interface TUpdateUser {
  email?: string
  first_name?: string
  last_name?: string
  password?: string
  biography?: string
  contact_info: {
    website?: string
    linked?: string
  }
  gender?: string
  date_of_birth?: string
  role?: string
}
export interface TUpdateUserAdmin {
  id?: number
  email?: string
  first_name?: string
  last_name?: string
  password?: string
  gender?: string
  role?: string
  status?: string
  date_of_birth?: string
  email_verified?: number
}

export interface TAuthState {
  user: TUserAuth | null
  allUser: TUserAuth[]
  deletedUser: TUserAuth[]
  token: string | null
  loading: boolean | null
  error: string | null
  total: number
}

export interface TCourseDetailUser {
  image?: string
  name: string
  job: string
  rate: string | number
  review: string | number
  students: string | number
  course: string | number
  introduce: string
}
