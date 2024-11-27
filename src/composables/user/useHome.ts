import { computed, onMounted, ref } from 'vue'
import api from '@/services/axiosConfig'
import type { TCardCourse, TCategory } from '@/interfaces'
import { apisStore } from '@/store/apis'

const apiStore = apisStore()
export function useHome() {
  return {}
}
