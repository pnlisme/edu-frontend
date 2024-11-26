import { createRouter, createWebHistory } from 'vue-router'

import user from './user'
const routes = [...user]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
