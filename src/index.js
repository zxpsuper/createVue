import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import router from './router'
import store from './store'
import api from '@/apis/index.js'
import Throttle from '@/base/throttle/index.js'
import EvenBus from '@/base/evenBus/index.js'
import './index.scss'

// 注册路由
Vue.use(VueRouter)
Vue.use(EvenBus)
Vue.component('Throttle', Throttle)
// 将ajax请求方法赋给$ajax
Vue.prototype.$ajax = api

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
