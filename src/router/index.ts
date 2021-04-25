/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
// 路由懒加载
const HelloWorld = () => import('@/components/HelloWorld.vue')
const Me = () => import('@/components/Me.vue')
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: { name: 'introduce' } },
    {
      path: '/introduce',
      name: 'introduce',
      component: HelloWorld,
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
    },
  ],
})

export default router
