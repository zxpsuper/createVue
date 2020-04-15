/* eslint-disable */
import VueRouter from 'vue-router'
// import HelloWorld from "@/components/HelloWorld.vue";
// import Me from "@/components/Me.vue";
// 路由懒加载, 得结合 babel-plugin-syntax-dynamic-import 插件使用
const HelloWorld = () => import('@/components/HelloWorld.vue')
const Me = () => import('@/components/Me.vue')
const LoadMore = () => import('@/components/LoadMoreTest.vue')
const router = new VueRouter({
    mode: 'hash',
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
        {
            path: '/loadmore',
            name: 'loadmore',
            component: LoadMore,
        },
        {
            path: '/chatroom',
            name: 'chatroom',
            component: () => import('@/views/chatroom/Index.vue'),
        },
    ],
})

export default router
