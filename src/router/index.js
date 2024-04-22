import { createRouter, createWebHistory } from 'vue-router'
import MontagemView from '@/views/MontagemView.vue'
import PedidosView from '@/views/PedidosView.vue'
import ConcluidosView from '@/views/ConcluidosView.vue'

const routes = [
  {
    path: '/',
    name: 'montagem',
    component: MontagemView
  },
  {
    path: '/pedidos',
    name: 'pedidos',
   component: PedidosView
  },
  {
          path: '/concluidos',
          name: 'concluidos',
          component: ConcluidosView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
