export interface TUserAuth {
  id: number;
  first_name: string
  last_name: string
  email: string
  password: string
  avatar?: string
  role: 'student' | 'admin' | 'teacher'
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
}

export interface TAuthState {
  user: TUserAuth | null
  token: string | null
  loading: boolean | null
  error: string | null
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
