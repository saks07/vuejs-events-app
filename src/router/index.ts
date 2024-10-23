import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import EditView from '../views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/add',
      name: 'AddView',
      component: AddView,
    },
    {
      path: '/edit/:id',
      name: 'EditView',
      component: EditView,
    },
  ],
})

export default router
