import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        },
    },
    actions: {
        countUp(ctx) {
            ctx.commit('increment')
        },
        countDown(ctx) {
            ctx.commit('decrement')
        },
    },
})

export default store
