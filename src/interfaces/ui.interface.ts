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
export interface CourseContentItem {
  content: string
}
export interface CourseComment {
  image?: string
  name: string
  rate: number | string
  content: string
}
export interface Input {
  modelValue: string
  label: string
  type: string
  errorMessages: string | null
  placeholder: string
}
export interface MenuItem {
  path: string
  label: string
  icon: any
}
