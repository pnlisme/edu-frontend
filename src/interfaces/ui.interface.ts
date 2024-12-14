export interface CardService {
  image: string
  heading: string
  description: string
}

export interface Button {
  variant?: 'primary' | 'default'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export interface PlayerOptions {
  autoplay: boolean
  playbackRates: number[]
  controls: boolean
  controlBar: {
    volumePanel: {
      inline: boolean
    }
    fullscreenToggle: boolean
  }
  sources: Array<{ src: string; type: string }>
}
export interface VideoFreeItem {
  image: string
  title: string
  duration: string
  isActive?: boolean
}
export interface TLesson {
  // id: number
  // learned: number
  // current_content_type?: string
  // content_section_type: string
  // type?: string
  // content_link?: string
  id?: number
  course_id: number
  content_type?: string
  content_id: number
  learned?: number
  current_content_type?: string
  content_section_type?: string
  content_old_type: string
  content_old_id?: number
}
export interface TChangeContent {
  course_id: number
  content_type: string
  content_id: number
  learned?: number
  content_old_type?: string
  content_old_id?: number
}
export interface TVideo {
  src: string
  lesson: TLesson
  onUpdateLearned: (data: { id: number; learned: number }) => void
}
export interface CourseContentItem {
  content: string
}
export interface CourseComment {
  id: number
  image?: string
  name: string
  created_at: string
  course_id: number
  rate: number | string
  content: string
}
export interface Input {
  modelValue?: string
  label?: string
  type?: string
  errorMessages?: string | null
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
}
export interface MenuItem {
  path: string
  label: string
  icon: any
}
