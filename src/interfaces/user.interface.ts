export interface TUserAuth {
  first_name: string
  last_name: string
  email: string
  password: string
  avatar?: string
  role: 'student' | 'admin' | 'teacher'
}
export interface AuthState {
  user: TUserAuth | null
  token: string | null
  loading: boolean | null
  error: string | null
}

export interface CourseDetailUser {
  image?: string
  name: string
  job: string
  rate: string | number
  review: string | number
  students: string | number
  course: string | number
  introduce: string
}
