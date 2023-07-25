import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DescriptionTest from '@/components/DescriptionTest.vue'
import AboutQuest from '../views/AboutQuest.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/description/:id', name: 'DescriptionTest', component: DescriptionTest, props: true
  },
  {
    path: '/questions', name: 'Questions', component: AboutQuest
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
