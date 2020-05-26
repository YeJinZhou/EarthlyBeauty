import Vue from 'vue'
import App from './App'

// 接收api.js下的myRequst方法
import { myRequest } from './components/my-request/api.js'
// 挂载到全局，让所有的页面都能调用myRequest方法
Vue.prototype.$myRequest = myRequest

import home from './pages/home/country.vue'
Vue.component('home',home)

import discover from './pages/discover/discover.vue'
Vue.component('discover',discover)

import post from './pages/post/create.vue'
Vue.component('post',post)

import oneDay from './pages/oneDay/oneDay.vue'
Vue.component('oneDay',oneDay)

import me from './pages/me/me.vue'
Vue.component('me',me)

import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'


const app = new Vue({
	store,
	...App
})
app.$mount()
