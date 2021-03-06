import Vue from 'vue'
import App from './App'
import store from './vuex'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)


app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['pages/logs/main', '^pages/index/main', 'pages/index2/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '北京跨城顺风车',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            list: [{
                "pagePath": "pages/index/main",
                "text": "车寻人"
            }, {
                "pagePath": "pages/index2/main",
                "text": "人寻车"
            }, {
                "pagePath": "pages/logs/main",
                "text": "发布"
            }]
        },

    }
}