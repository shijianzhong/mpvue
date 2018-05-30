import Vue from 'vue'
import Vuex from 'vuex'
import wechat from './module/wechat'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        wechat
    },
})